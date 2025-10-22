import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const cities = ['Dakhla','Marrakesh','Agadir','Casablanca','Fes','Rabat','Tangier','Essaouira','Chefchaouen','Ouarzazate','Meknes'];

export default function Customize() {
  const [selected, setSelected] = useState<string[]>(['Marrakesh']);
  const [guests, setGuests] = useState(2);
  const [days, setDays] = useState(5);

  const route = useMemo(() => selected.join(' → '), [selected]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Customize Your Trip</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass p-4">
            <div className="font-semibold mb-2">Select Cities</div>
            <div className="flex flex-wrap gap-2">
              {cities.map(c => (
                <button key={c} className={`glass px-3 py-1 ${selected.includes(c) ? 'bg-white/20' : ''}`} onClick={() => setSelected(prev => prev.includes(c) ? prev.filter(x => x!==c) : [...prev, c])}>{c}</button>
              ))}
            </div>
          </div>
          <div className="glass p-4 grid grid-cols-2 gap-4">
            <label className="flex flex-col">Guests<input className="glass p-2 mt-1" type="number" min={1} value={guests} onChange={e=>setGuests(parseInt(e.target.value||'1'))}/></label>
            <label className="flex flex-col">Days<input className="glass p-2 mt-1" type="number" min={1} value={days} onChange={e=>setDays(parseInt(e.target.value||'1'))}/></label>
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
