/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Car } from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { stores, Store } from '../data';

interface MapViewProps {
  base: Store;
  isOverview?: boolean;
  originQuery?: string;
  onTransitInfo?: (info: { duration: number; type: 'bus' | 'subway' }) => void;
}

// Global AMap security config
(window as any)._AMapSecurityConfig = {
  securityJsCode: 'd7255656692c136dc9ad971b97541576',
};

export default function MapView({ base, isOverview = false, originQuery, onTransitInfo }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const transferRef = useRef<any>(null);

  useEffect(() => {
    AMapLoader.load({
      key: 'f830853c35ca2651e0643325e8fe2194',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geocoder', 'AMap.Transfer'],
    })
      .then((AMap) => {
        if (mapRef.current && !mapInstance.current) {
          mapInstance.current = new AMap.Map(mapRef.current, {
            viewMode: '2D',
            zoom: 12,
            center: base.lnglat,
            mapStyle: 'amap://styles/darkblue', // Dark theme to match UI
          });
          mapInstance.current.addControl(new AMap.Scale());
          mapInstance.current.addControl(new AMap.ToolBar());
        }
      })
      .catch((e) => {
        console.error('Map loading failed:', e);
      });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update map center and markers
  useEffect(() => {
    if (mapInstance.current) {
      const AMap = (window as any).AMap;
      
      // Clear all existing markers and routes
      markersRef.current.forEach(m => mapInstance.current.remove(m));
      markersRef.current = [];
      if (transferRef.current) {
        transferRef.current.clear();
      }

      if (!isOverview) {
        // Detail View: Show one focused marker
        mapInstance.current.setCenter(base.lnglat);
        mapInstance.current.setZoom(15);

        const marker = new AMap.Marker({
          position: base.lnglat,
          title: base.name,
          map: mapInstance.current,
        });
        markersRef.current.push(marker);

        // Calculate Route if originQuery exists
        if (originQuery && AMap.Transfer) {
          if (!transferRef.current) {
            transferRef.current = new AMap.Transfer({
              map: mapInstance.current,
              city: '上海',
              policy: AMap.TransferPolicy.LEAST_TIME,
              autoFitView: true
            });
          }

          const geocoder = new AMap.Geocoder({ city: '上海' });
          geocoder.getLocation(originQuery, (status: string, result: any) => {
            if (status === 'complete' && result.geocodes.length > 0) {
              const startPos = result.geocodes[0].location;
              transferRef.current.search(
                [startPos.lng, startPos.lat],
                base.lnglat,
                (status: string, result: any) => {
                  if (status === 'complete' && result.plans && result.plans.length > 0) {
                    const plan = result.plans[0];
                    const durationInMinutes = Math.ceil(plan.time / 60);
                    // Detect if it uses subway
                    const hasSubway = plan.segments.some((s: any) => s.transit_mode === 'SUBWAY');
                    onTransitInfo?.({
                      duration: durationInMinutes,
                      type: hasSubway ? 'subway' : 'bus'
                    });
                  }
                }
              );
            }
          });
        }
      } else {
        // Overview Mode: Show all venues with color-coded markers
        mapInstance.current.setCenter([121.4737, 31.2304]); // Center of Shanghai
        mapInstance.current.setZoom(10);

        stores.forEach(item => {
          let mainColor = '#f5222d'; // Red for base
          let lightColor = '#cf1322';
          let glowColor = 'rgba(245, 34, 45, 0.3)';
          let icon = '🚗';

          if (item.status === 'open') {
            mainColor = '#52c41a'; // Green for store
            lightColor = '#389e0d';
            glowColor = 'rgba(82, 196, 26, 0.3)';
          } else if (item.status === 'planned') {
            mainColor = '#1890ff'; // Blue for planned
            lightColor = '#096dd9';
            glowColor = 'rgba(24, 144, 255, 0.3)';
            icon = '📍';
          }

          const markerContent = `
            <div class="custom-marker-container" style="position: relative;">
              <div class="map-marker-glow" style="position: absolute; top: -4px; left: -4px; width: 48px; height: 48px; background: ${glowColor}; border-radius: 50%;"></div>
              
              <div style="position: relative; width: 40px; height: 40px; background: linear-gradient(135deg, ${mainColor} 0%, ${lightColor} 100%); border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 12px ${glowColor}; display: flex; align-items: center; justify-content: center;">
                <div style="transform: rotate(45deg); font-size: 18px;">${icon}</div>
                <div style="position: absolute; top: -6px; right: -6px; width: 18px; height: 18px; background: #fff; border: 2px solid ${mainColor}; border-radius: 50%; font-size: 10px; font-weight: bold; color: ${mainColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                  ${item.id}
                </div>
              </div>

              <div class="custom-marker-label" style="position: absolute; top: 100%; left: 50%; white-space: nowrap; font-size: 11px; font-weight: 600; color: white; background: #1a1a1a; padding: 4px 8px; border-radius: 6px; margin-top: 8px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.5); pointer-events: none;">
                ${item.name}
              </div>
            </div>
          `;

          const marker = new AMap.Marker({
            position: item.lnglat,
            content: markerContent,
            offset: new AMap.Pixel(-20, -40),
            map: mapInstance.current,
          });

          markersRef.current.push(marker);
        });
      }
    }
  }, [base, isOverview]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#12141a] relative overflow-hidden flex flex-col">
      {/* Real Map Container */}
      <div 
        ref={mapRef} 
        className={`flex-1 transition-all duration-700 ${isOverview ? 'opacity-80 grayscale-[0.3]' : ''}`}
      />

      {/* Floating Route Card (Only visible in detail view) */}
      {!isOverview && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-8 right-8 z-10"
        >
          <div className="bg-[#1c212b]/90 rounded-2xl border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">路线已优化</span>
            </div>

            <div className="space-y-8 relative">
              <div className="absolute left-[13px] top-4 bottom-4 w-px bg-dashed border-l border-white/10"></div>
              
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full border-2 border-brand-primary flex items-center justify-center bg-[#1c212b] relative z-10 shrink-0">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500">起点</p>
                  <p className="text-sm font-bold text-white leading-tight">我的位置 ({originQuery || "上海中心大厦"})</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center relative z-10 shrink-0 shadow-lg shadow-green-500/20">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500">终点</p>
                  <p className="text-sm font-bold text-white leading-tight">{base.name}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Legend (Only in Overview) */}
      {isOverview && (
        <div className="absolute top-8 right-8 z-10 bg-[#1c212b]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#f5222d] border border-white/20"></div>
            <span className="text-xs text-gray-300 font-medium">基地</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#52c41a] border border-white/20"></div>
            <span className="text-xs text-gray-300 font-medium">门店</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#1890ff] border border-white/20"></div>
            <span className="text-xs text-gray-300 font-medium">待租赁</span>
          </div>
        </div>
      )}

      {/* Simulation Info Overlay */}
      {isOverview && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl z-20">
           <span className="text-[10px] font-bold text-white flex items-center gap-2">
             <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
             当前视野内有 {isOverview ? '多个' : '1个'} 训练基地
           </span>
        </div>
      )}
    </div>
  );
}
