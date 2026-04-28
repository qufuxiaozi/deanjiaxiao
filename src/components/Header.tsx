/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home } from 'lucide-react';

interface HeaderProps {
  onHome: () => void;
}

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <button 
          onClick={onHome}
          className="flex items-center gap-3 group transition-transform active:scale-95 cursor-pointer text-left"
        >
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-yellow-100 group-hover:bg-yellow-500 transition-colors">
            <Home className="w-5 h-5 text-brand-dark" />
          </div>
          <h1 className="text-xl font-bold font-display text-brand-dark tracking-tight">
            ApiaryDrive <span className="text-brand-primary">Shanghai</span>
          </h1>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={onHome} className="text-sm font-medium border-b-2 border-brand-primary pb-1 text-gray-900 cursor-pointer">查找场地</button>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">我的路线</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">教练团队</a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* User controls removed */}
      </div>
    </header>
  );
}
