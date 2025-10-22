import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const cities = ['Dakhla','Marrakesh','Agadir','Casablanca','Fes','Rabat','Tangier','Essaouira','Chefchaouen','Ouarzazate','Meknes'];

export default function Customize() {
  const [query, setQuery] = useState('Marrakesh · 2025-11-15 · 2 guests');
  const [selected, setSelected] = useState<string[]>(['Marrakesh']);
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState<string>('2025-11-15');
  const [days, setDays] = useState<number>(5);

  const route = useMemo(() => selected.join(' → '), [selected]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Customize Your Trip</h1>
      <div className="glass p-2 flex items-center gap-2 mb-6">
        <MagnifyingGlassIcon className="w-6 h-6 text-white/70" />
        <input
          className="flex-1 bg-transparent outline-none placeholder-white/50"
          placeholder="Search: city · date · guests"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          onBlur={()=>{
            // naive parse: City · YYYY-MM-DD · N guests
            const parts = query.split('·').map(p=>p.trim());
            const city = parts[0];
            const date = parts[1];
            const guestsStr = parts[2]?.match(/\d+/)?.[0];
            if (city && cities.includes(city)) setSelected([city]);
            if (date) setStartDate(date);
            if (guestsStr) setGuests(parseInt(guestsStr));
          }}
        />
        <button className="btn">Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass p-4 grid grid-cols-2 gap-4">
            <label className="flex flex-col">City
              <select className="glass p-2 mt-1" value={selected[0]} onChange={(e)=>setSelected([e.target.value])}>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex flex-col">Start Date
              <input className="glass p-2 mt-1" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
            </label>
            <label className="flex flex-col">Guests
              <input className="glass p-2 mt-1" type="number" min={1} value={guests} onChange={e=>setGuests(parseInt(e.target.value||'1'))}/>
            </label>
            <label className="flex flex-col">Days
              <input className="glass p-2 mt-1" type="number" min={1} value={days} onChange={e=>setDays(parseInt(e.target.value||'1'))}/>
            </label>
          </div>
        </div>
        <div className="glass p-4">
          <div className="font-semibold mb-2">Route</div>
          <motion.div className="h-64 bg-black/20 rounded-lg flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {route || 'Select cities to build route'}
          </motion.div>
          <div className="mt-4 flex gap-3">
            <button className="btn">Save Draft</button>
            <button className="btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
