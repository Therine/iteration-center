import React from 'react';

interface CapacityMeterProps {
  name: string;
  points: number;
  max?: number; // Optional: defaults to 21
}

export default function CapacityMeter({ name, points, max = 60 }: CapacityMeterProps) {
  const percentage = Math.min((points / max) * 100, 100);
  
  const getBarColor = () => {
    if (points >= max) return 'bg-red-500';
    if (points >= max * 0.6) return 'bg-amber-500'; // Dynamic warning at 60% load
    return 'bg-blue-600';
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
            Resource Load
          </span>
          <span className="text-sm font-bold text-slate-800">{name}</span>
        </div>
        <div className="text-right">
          <span className={`text-sm font-black ${points > max ? 'text-red-600' : 'text-slate-700'}`}>
            {points}
          </span>
          <span className="text-[10px] font-bold text-slate-400"> / {max} PTS</span>
        </div>
      </div>
      
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {points > max && (
        <p className="text-[9px] font-bold text-red-500 uppercase mt-2 animate-pulse">
          ⚠️ Critical Overload
        </p>
      )}
    </div>
  );
}