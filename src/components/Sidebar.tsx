/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Search, Bus, Bike, Car, CarFront, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SidebarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export default function Sidebar({ onSearch, onClear }: SidebarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <aside className="w-full bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button onClick={onClear} className="text-lg font-bold text-gray-900 mb-1 hover:text-brand-primary transition-colors text-left">训练门户</button>
            <p className="text-xs text-gray-400">上海辖区</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">您的起点</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary" />
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="请输入出发地(如:XX路XX号)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border-transparent focus:border-brand-primary focus:ring-0 transition-all outline-none"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-brand-dark font-semibold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              查找附近场地
            </button>
          </div>

          <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              输入您的起点地址，系统将为您匹配最近的实地训练场
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">交通路线</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Bus, label: '公交地铁', active: true },
                { icon: Bike, label: '骑行' },
                { icon: Car, label: '自驾' },
                { icon: CarFront, label: '打车' }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    item.active 
                      ? 'border-brand-primary bg-yellow-50 text-brand-primary shadow-sm ring-1 ring-brand-primary' 
                      : 'border-gray-100 hover:border-gray-300 text-gray-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400">校长电话</p>
            <p className="text-sm font-bold text-gray-900">15618112789</p>
          </div>
        </div>
        <button className="w-full py-4 bg-brand-primary hover:bg-yellow-500 text-brand-dark font-bold rounded-xl shadow-lg shadow-yellow-100 transition-all">
          预约练车
        </button>
      </div>
    </aside>
  );
}
