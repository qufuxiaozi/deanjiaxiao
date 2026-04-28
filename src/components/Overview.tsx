/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Store, stores } from '../data';

interface OverviewProps {
  onSelectBase: (base: Store) => void;
  searchQuery: string;
}

export default function Overview({ onSelectBase, searchQuery }: OverviewProps) {
  const [resolvedPoint, setResolvedPoint] = useState<[number, number]>([121.4737, 31.2304]);

  useEffect(() => {
    // If no search query, use default center
    if (!searchQuery) {
      setResolvedPoint([121.4737, 31.2304]);
      return;
    }

    // 1. First, attempt fuzzy simulation for instant feedback
    const query = searchQuery.toLowerCase();
    let simulationPoint: [number, number] | null = null;
    
    if (query.includes('川环南路') || query.includes('川沙')) simulationPoint = [121.697, 31.188];
    else if (query.includes('张杨路') || query.includes('陆家嘴')) simulationPoint = [121.52, 31.23];
    else if (query.includes('徐汇') || query.includes('龙华')) simulationPoint = [121.455, 31.175];
    else if (query.includes('嘉定') || query.includes('安亭') || query.includes('马陆')) simulationPoint = [121.24, 31.34];
    else if (query.includes('闵行') || query.includes('莘庄') || query.includes('梅陇')) simulationPoint = [121.36, 31.11];
    else if (query.includes('宝山') || query.includes('顾村')) simulationPoint = [121.41, 31.37];
    else if (query.includes('青浦')) simulationPoint = [121.11, 31.15];
    else if (query.includes('松江')) simulationPoint = [121.22, 31.03];
    else if (query.includes('浦东') || query.includes('曹路') || query.includes('周浦')) simulationPoint = [121.60, 31.15];

    if (simulationPoint) {
      setResolvedPoint(simulationPoint);
    }

    // 2. Then, attempt real geocoding using AMap (which handles things like "金园一路235号" correctly)
    const AMap = (window as any).AMap;
    if (AMap && AMap.Geocoder) {
      const geocoder = new AMap.Geocoder({ city: '上海' });
      // Address autocomplete/correction: If the query is short or missing district, AMap Geocoder will still try to find it in SH
      geocoder.getLocation(searchQuery, (status: string, result: any) => {
        if (status === 'complete' && result.geocodes.length > 0) {
          const loc = result.geocodes[0].location;
          setResolvedPoint([loc.lng, loc.lat]);
        }
      });
    }
  }, [searchQuery]);

  // Use the resolved point for distance calculations
  const startingPoint = resolvedPoint;

  // Simplified distance calculation (KM) using Haversine-like distance
  const getDistance = (p1: [number, number], p2: [number, number]) => {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)) * 111;
  };

  const storesWithDistance = stores.map(store => ({
    ...store,
    distance: getDistance(startingPoint, store.lnglat)
  }));

  // Logic: Always sort by distance from the reference point
  const sortedByProximity = [...storesWithDistance].sort((a, b) => a.distance - b.distance);

  // Filtering Logic
  const query = searchQuery.toLowerCase();
  const isAddressSearch = searchQuery && (
    query.includes('路') || query.includes('弄') || query.includes('号') || query.includes('街道') || query.includes('村')
  );

  const filteredStores = (searchQuery && !isAddressSearch)
    ? sortedByProximity.filter(store => 
        store.name.toLowerCase().includes(query) || 
        store.address.toLowerCase().includes(query)
      )
    : sortedByProximity;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 bg-gray-50/50">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display">
              {searchQuery ? '为您推荐的最近场地' : '选择您的训练场地'}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {searchQuery 
                ? `根据您的起点 "${searchQuery}"，为您智能匹配并推荐了最近的 ${Math.min(2, filteredStores.length)} 个场地` 
                : `共为您找到 ${filteredStores.length} 个优质场地`}
            </p>
          </div>
          <div className="flex">
            <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              支持即约即练
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredStores.map((store, index) => {
            const isRecommended = searchQuery && index < 2;
            return (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectBase(store)}
                className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer group relative overflow-hidden flex items-center gap-6 ${
                  isRecommended 
                    ? 'border-brand-primary shadow-lg shadow-yellow-100/50 ring-1 ring-brand-primary' 
                    : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
                }`}
              >
                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${
                  isRecommended ? 'bg-brand-primary/20' : 'bg-gray-50 group-hover:bg-brand-primary/10'
                }`}>
                  <MapPin className={`w-8 h-8 transition-colors ${
                    isRecommended ? 'text-brand-primary' : 'text-gray-300 group-hover:text-brand-primary'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition-colors leading-tight">{store.name}</h3>
                    <div className="flex gap-2 shrink-0">
                      {isRecommended && (
                        <span className="text-[10px] font-bold py-0.5 px-2 rounded-lg bg-brand-primary text-brand-dark flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          推荐
                        </span>
                      )}
                      {store.status === 'open' ? (
                        <span className="text-[10px] font-bold py-0.5 px-2 rounded-lg bg-green-50 text-green-600 border border-green-100">门店</span>
                      ) : (
                        <span className="text-[10px] font-bold py-0.5 px-2 rounded-lg bg-red-50 text-red-600 border border-red-100">基地</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{store.address}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1.5 text-yellow-500 shrink-0">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">4.9 星级</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm shrink-0">
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="font-medium">距离起点约 {store.distance.toFixed(1)}km</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 pl-4 border-l border-gray-50">
                   <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                   <span className="text-[10px] font-medium text-gray-400 group-hover:text-brand-primary transition-colors">详情</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
