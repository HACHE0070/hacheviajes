import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, ClockIcon, UserIcon, BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';

const cities = ['Dakhla','Marrakesh','Agadir','Casablanca','Fes','Rabat','Tangier','Essaouira','Chefchaouen','Ouarzazate','Meknes'];
type FlightOption = { title: string; price: number; details: string };
type HotelOption = { title: string; pricePerNight: number; details: string };
type ActivityOption = { title: string; price: number; details: string };

const flightOptions: FlightOption[] = [
  { title: 'Economy Class', price: 650, details: '14h 30m · Standard legroom · Meal · 1 bag' },
  { title: 'Premium Economy', price: 950, details: '14h 30m · Extra legroom · Premium meals · 2 bags' },
  { title: 'Business Class', price: 1450, details: '14h 30m · Lie‑flat seats · Gourmet dining · 3 bags' }
];

const hotelOptions: HotelOption[] = [
  { title: 'Comfort Inn', pricePerNight: 120, details: '3★ · Free WiFi · Pool · Breakfast' },
  { title: 'Boutique Hotel', pricePerNight: 180, details: '4★ · Free WiFi · Concierge · Breakfast' },
  { title: 'Luxury Resort', pricePerNight: 220, details: '5★ · Spa · All meals included' }
];

const activityOptions: ActivityOption[] = [
  { title: 'City Tour', price: 75, details: '4h · Guided · Historical sites' },
  { title: 'Cooking Class', price: 120, details: '3h · Market visit · Local cuisine' },
  { title: 'Boat Excursion', price: 95, details: '5h · Private boat · Lunch included' }
];

function formatCurrency(value: number): string {
  return `€${value.toFixed(0)}`;
}

export default function Customize() {
  const [step, setStep] = useState<number>(1);
  const [destination, setDestination] = useState<string>('Marrakesh');
  const [checkin, setCheckin] = useState<string>('');
  const [checkout, setCheckout] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelOption | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<ActivityOption[]>([]);

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const a = new Date(checkin).getTime();
    const b = new Date(checkout).getTime();
    const diff = Math.max(0, b - a);
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }, [checkin, checkout]);

  const activitiesTotal = useMemo(() => selectedActivities.reduce((sum, a) => sum + a.price, 0) * guests, [selectedActivities, guests]);
  const flightsTotal = useMemo(() => (selectedFlight ? selectedFlight.price * guests : 0), [selectedFlight, guests]);
  const hotelsTotal = useMemo(() => (selectedHotel ? selectedHotel.pricePerNight * Math.max(1, nights) * guests : 0), [selectedHotel, nights, guests]);
  const grandTotal = useMemo(() => flightsTotal + hotelsTotal + activitiesTotal, [flightsTotal, hotelsTotal, activitiesTotal]);
  function toggleActivity(activity: ActivityOption) {
    setSelectedActivities(prev => prev.some(a => a.title === activity.title)
      ? prev.filter(a => a.title !== activity.title)
      : [...prev, activity]
    );
  }

  function validateStep1(): boolean {
    if (!destination) return false;
    if (!checkin || !checkout) return false;
    if (nights <= 0) return false;
    return true;
  }

  function next() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !selectedFlight) return;
    if (step === 3 && !selectedHotel) return;
    setStep(prev => Math.min(6, prev + 1));
  }

  function back() {
    setStep(prev => Math.max(1, prev - 1));
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Customize Your Perfect Trip</h1>
        <p className="text-white/80">Design your journey with flights, hotels, and activities</p>
      </div>

      {/* Step indicator */}
      <div className="glass p-4 mb-6">
        <div className="relative flex items-center justify-between">
          {[{n:1,l:'Destination'},{n:2,l:'Flights'},{n:3,l:'Hotels'},{n:4,l:'Activities'},{n:5,l:'Checkout'}].map(s => (
            <div key={s.n} className={`flex flex-col items-center ${step===s.n? 'text-aqua' : step>s.n? 'text-white' : 'text-white/60' }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border ${step>=s.n? 'bg-white text-black' : 'bg-transparent'} border-white/30`}>{s.n}</div>
              <div className="text-xs mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Where and when would you like to go?</h2>
            <p className="text-white/70 mb-4">Select destination and travel dates</p>
            <div className="grid md:grid-cols-4 gap-4">
              <label className="flex flex-col">
                <span className="mb-1 text-white/80 flex items-center gap-2"><MapPinIcon className="w-4 h-4"/>Destination</span>
                <select className="glass p-2" value={destination} onChange={(e)=>setDestination(e.target.value)}>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="flex flex-col">
                <span className="mb-1 text-white/80 flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4"/>Check in</span>
                <input className="glass p-2" type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 text-white/80 flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4"/>Check out</span>
                <input className="glass p-2" type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 text-white/80 flex items-center gap-2"><UserIcon className="w-4 h-4"/>Guests</span>
                <input className="glass p-2" type="number" min={1} value={guests} onChange={e=>setGuests(parseInt(e.target.value||'1'))} />
              </label>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-primary" onClick={next}>Continue to Flights</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Select Your Flight</h2>
            <p className="text-white/70 mb-4">Choose the flight that fits your schedule and budget</p>
            <div className="grid md:grid-cols-3 gap-4">
              {flightOptions.map(opt => (
                <div key={opt.title} className={`p-4 rounded-xl border ${selectedFlight?.title===opt.title? 'border-aqua bg-white/10' : 'border-white/20'} hover:border-white/40 transition`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold">{opt.title}</div>
                    <div className="text-aqua font-semibold">{formatCurrency(opt.price)}</div>
                  </div>
                  <div className="text-white/70 text-sm mb-3 flex items-center gap-2"><ClockIcon className="w-4 h-4"/>{opt.details}</div>
                  <button className={`btn ${selectedFlight?.title===opt.title? '' : 'btn-primary'}`} onClick={()=>setSelectedFlight(opt)}>
                    {selectedFlight?.title===opt.title? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button className="btn-secondary" onClick={back}>Back</button>
              <button className="btn-primary" onClick={next}>Continue to Hotels</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Select Your Hotel</h2>
            <p className="text-white/70 mb-4">Choose accommodation for a comfortable stay</p>
            <div className="grid md:grid-cols-3 gap-4">
              {hotelOptions.map(opt => (
                <div key={opt.title} className={`p-4 rounded-xl border ${selectedHotel?.title===opt.title? 'border-aqua bg-white/10' : 'border-white/20'} hover:border-white/40 transition`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold">{opt.title}</div>
                    <div className="text-aqua font-semibold">{formatCurrency(opt.pricePerNight)}/night</div>
                  </div>
                  <div className="text-white/70 text-sm mb-3 flex items-center gap-2"><BuildingOffice2Icon className="w-4 h-4"/>{opt.details}</div>
                  <button className={`btn ${selectedHotel?.title===opt.title? '' : 'btn-primary'}`} onClick={()=>setSelectedHotel(opt)}>
                    {selectedHotel?.title===opt.title? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button className="btn-secondary" onClick={back}>Back</button>
              <button className="btn-primary" onClick={next}>Continue to Activities</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Select Activities</h2>
            <p className="text-white/70 mb-4">Choose experiences to make your trip unforgettable</p>
            <div className="grid md:grid-cols-3 gap-4">
              {activityOptions.map(opt => {
                const selected = selectedActivities.some(a => a.title === opt.title);
                return (
                  <div key={opt.title} className={`p-4 rounded-xl border ${selected? 'border-aqua bg-white/10' : 'border-white/20'} hover:border-white/40 transition`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-semibold">{opt.title}</div>
                      <div className="text-aqua font-semibold">{formatCurrency(opt.price)}</div>
                    </div>
                    <div className="text-white/70 text-sm mb-3">{opt.details}</div>
                    <button className={`btn ${selected? '' : 'btn-primary'}`} onClick={()=>toggleActivity(opt)}>
                      {selected? 'Added' : 'Add to Trip'}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <button className="btn-secondary" onClick={back}>Back</button>
              <button className="btn-primary" onClick={next}>Continue to Checkout</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">Review & Checkout</h2>
            <p className="text-white/70 mb-4">Review selections and complete booking</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <div className="font-semibold mb-2">Trip Summary</div>
                  <div className="text-sm text-white/80">Destination: {destination}</div>
                  <div className="text-sm text-white/80">Dates: {checkin || '—'} → {checkout || '—'} ({nights} nights)</div>
                  <div className="text-sm text-white/80">Guests: {guests}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <div className="font-semibold mb-2">Selected Flight</div>
                  <div className="text-sm text-white/80">{selectedFlight?.title || 'Not selected'}</div>
                  <div className="text-sm text-white/60">{selectedFlight?.details || ''}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <div className="font-semibold mb-2">Selected Hotel</div>
                  <div className="text-sm text-white/80">{selectedHotel?.title || 'Not selected'}</div>
                  {selectedHotel && <div className="text-sm text-white/60">{selectedHotel.details} · {Math.max(1,nights)} nights</div>}
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <div className="font-semibold mb-2">Activities</div>
                  <div className="text-sm text-white/80">{selectedActivities.length? selectedActivities.map(a => a.title).join(', ') : 'None selected'}</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 h-fit">
                <div className="font-semibold mb-3">Price Breakdown</div>
                <div className="flex justify-between text-sm text-white/80 py-1"><span>Flights</span><span>{formatCurrency(flightsTotal)}</span></div>
                <div className="flex justify-between text-sm text-white/80 py-1"><span>Hotel</span><span>{formatCurrency(hotelsTotal)}</span></div>
                <div className="flex justify-between text-sm text-white/80 py-1"><span>Activities</span><span>{formatCurrency(activitiesTotal)}</span></div>
                <div className="border-t border-white/15 my-3" />
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
                <div className="mt-4 flex gap-3">
                  <button className="btn-secondary" onClick={back}>Back</button>
                  <button className="btn-primary" onClick={()=>setStep(6)}>Complete Booking & Pay</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
            <p className="text-white/80 mb-6">We sent a confirmation email with your trip details.</p>
            <button className="btn-primary" onClick={()=>{ setStep(1); setSelectedFlight(null); setSelectedHotel(null); setSelectedActivities([]); }}>Plan Another Trip</button>
          </div>
        )}
      </div>

      {/* Right rail summary on wide screens */}
      <div className="max-w-6xl mx-auto mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2" />
        <div className="glass p-4">
          <div className="font-semibold mb-2">Live Summary</div>
          <div className="text-sm text-white/80">Route: {destination}</div>
          <div className="text-sm text-white/80">Dates: {checkin || '—'} → {checkout || '—'} ({nights} nights)</div>
          <div className="text-sm text-white/80">Guests: {guests}</div>
          <div className="border-t border-white/10 my-3" />
          <div className="text-sm text-white/80">Flights: {selectedFlight?.title || '—'} {selectedFlight && `· ${formatCurrency(flightsTotal)}`}</div>
          <div className="text-sm text-white/80">Hotel: {selectedHotel?.title || '—'} {selectedHotel && `· ${formatCurrency(hotelsTotal)}`}</div>
          <div className="text-sm text-white/80">Activities: {selectedActivities.length ? `${selectedActivities.length} · ${formatCurrency(activitiesTotal)}` : '—'}</div>
          <div className="border-t border-white/10 my-3" />
          <div className="flex justify-between font-semibold"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
        </div>
      </div>
    </div>
  );
}
