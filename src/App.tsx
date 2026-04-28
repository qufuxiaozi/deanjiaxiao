/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BaseDetail from './components/BaseDetail';
import MapView from './components/MapView';
import Overview from './components/Overview';
import { stores, Store } from './data';

export default function App() {
  const [selectedBase, setSelectedBase] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [transitInfo, setTransitInfo] = useState<{ duration: number; type: 'bus' | 'subway' } | null>(null);

  const handleSelectBase = (base: Store) => {
    setSelectedBase(base);
    setTransitInfo(null); // Reset when selecting new base
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Header onHome={() => {
        setSelectedBase(null);
        setSearchQuery('');
        setTransitInfo(null);
      }} />
      
      <main className="flex flex-1 overflow-hidden">
        {/* Left Control Panel - 18% */}
        <div className="w-[18%] border-r border-gray-100 shrink-0">
          <Sidebar 
            onSearch={(query) => {
              setSearchQuery(query);
              setSelectedBase(null); // Return to list view to show results
              setTransitInfo(null);
            }} 
            onClear={() => {
              setSelectedBase(null);
              setSearchQuery('');
              setTransitInfo(null);
            }}
          />
        </div>

        {/* Center Content: Overview or Detail - 28% */}
        <div className="w-[28%] shrink-0 flex flex-col bg-gray-50/50 border-r border-gray-100">
          {selectedBase ? (
            <BaseDetail 
              base={selectedBase} 
              originQuery={searchQuery} 
              transitInfo={transitInfo} 
            />
          ) : (
            <Overview 
              searchQuery={searchQuery}
              onSelectBase={handleSelectBase} 
            />
          )}
        </div>

        {/* Right Map Navigation Visualization - 54% */}
        <div className="w-[54%] shrink-0">
          <MapView 
            base={selectedBase || stores[0]} 
            isOverview={!selectedBase} 
            originQuery={searchQuery}
            onTransitInfo={setTransitInfo}
          />
        </div>
      </main>
    </div>
  );
}

