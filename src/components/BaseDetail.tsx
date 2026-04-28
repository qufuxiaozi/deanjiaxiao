/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Navigation, MapPin, Bus, LayoutTemplate, Coffee, Zap, Stethoscope, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Store } from '../data';

interface BaseDetailProps {
  base: Store;
  originQuery?: string;
  transitInfo?: { duration: number; type: 'bus' | 'subway' } | null;
}

export default function BaseDetail({ base, originQuery, transitInfo }: BaseDetailProps) {
  const handleStartNavigation = () => {
    const destName = encodeURIComponent(base.name);
    const originName = encodeURIComponent(originQuery || '我的位置');
    const [lng, lat] = base.lnglat;
    
    // Construct Amap navigation URL
    const amapUrl = `https://www.amap.com/dir/?from%5Bname%5D=${originName}&to%5Bname%5D=${destName}&to%5Blnglat%5D=${lng},${lat}&policy=1`;
    
    window.open(amapUrl, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 font-display">{base.name}</h2>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4 text-brand-primary" />
              <span className="text-sm">{base.address}</span>
            </div>
          </div>

          {transitInfo && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center">
                  {transitInfo.type === 'subway' ? (
                    <Zap className="w-5 h-5 text-brand-primary" />
                  ) : (
                    <Bus className="w-5 h-5 text-brand-primary" />
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">预计用时</p>
                  <p className="text-lg font-bold text-brand-dark">约 {transitInfo.duration} 分钟</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-medium">适合 {transitInfo.type === 'subway' ? '地铁' : '公交'} 出行</p>
              </div>
            </motion.div>
          )}

          <button 
            onClick={handleStartNavigation}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-dark text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg active:scale-95 w-full"
          >
            <Navigation className="w-4 h-4 fill-white" />
            开始导航
          </button>
        </div>

        {/* Content Section - Linear flow */}
        <div className="flex flex-col gap-8">
          {/* Section Coaches */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">星级教练员</h3>
              <button 
                onClick={() => window.open('https://dh.qutuya.com', '_blank')}
                className="text-sm font-medium text-brand-primary hover:underline"
              >
                全部
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { name: '张德顺', role: '教练', rating: 4.9, exp: '教龄 15 年', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
                { name: '李雪', role: '教练', rating: 4.8, exp: '教龄 8 年', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' }
              ].map((coach, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100 relative">
                  <div className="flex items-center gap-3">
                    <img src={coach.img} alt={coach.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-gray-900 leading-tight block">{coach.name}</span>
                      <div className="flex items-center gap-1 text-brand-primary">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-sm font-bold">{coach.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold px-2 py-1 bg-white rounded-lg border border-gray-100">
                    {coach.exp}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Pricing */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">车型费用</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900 font-display">C1 手动挡</h4>
                </div>
                <p className="text-xl font-bold text-brand-primary font-display">¥5,800</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900 font-display">C2 自动挡</h4>
                </div>
                <p className="text-xl font-bold text-brand-primary font-display">¥6,200</p>
              </div>
            </div>
          </section>

          {/* Time Schedule Section */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-6">练车安排</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">日间</p>
                <span className="text-lg font-bold text-gray-900 font-display">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">夜间</p>
                <span className="text-lg font-bold text-gray-900 font-display">至 21:30</span>
              </div>
            </div>
            
            <div className="mt-8 h-1.5 bg-gray-50 rounded-full relative overflow-hidden">
              <div className="absolute left-[0%] w-[60%] h-full bg-brand-primary rounded-full"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
