import { useMemo, useState } from 'react';
import { ChartBarIcon, Cog8ToothIcon, MapPinIcon, PlaneUpIcon, RectangleStackIcon, Squares2X2Icon, BuildingOffice2Icon, TicketIcon } from '@heroicons/react/24/outline';

type Destination = { id: number; name: string; country: string; packages: number; visibleInCustomizer: boolean; status: 'active' | 'inactive' };
type Activity = { id: number; name: string; type: string; duration: string; price: number; visibleInCustomizer: boolean; status: 'active' | 'inactive' };
type Package = { id: number; name: string; destination: string; economy: number; premium: number; luxury: number; featured: boolean };
type Booking = { id: string; customer: string; destination: string; amount: number; status: 'confirmed' | 'pending' };

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard'|'customizer'|'destinations'|'departures'|'packages'|'flights'|'hotels'|'activities'|'bookings'>('dashboard');

  const [destinations, setDestinations] = useState<Destination[]>([
    { id: 1, name: 'Dakhla, Morocco', country: 'Morocco', packages: 3, visibleInCustomizer: true, status: 'active' },
    { id: 2, name: 'Marrakesh, Morocco', country: 'Morocco', packages: 3, visibleInCustomizer: true, status: 'active' },
    { id: 3, name: 'Agadir, Morocco', country: 'Morocco', packages: 3, visibleInCustomizer: true, status: 'active' },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, name: 'City Tour', type: 'Cultural', duration: '4h', price: 75, visibleInCustomizer: true, status: 'active' },
    { id: 2, name: 'Cooking Class', type: 'Cultural', duration: '3h', price: 120, visibleInCustomizer: true, status: 'active' },
    { id: 3, name: 'Surf Lesson', type: 'Adventure', duration: '3h', price: 95, visibleInCustomizer: true, status: 'active' },
  ]);

  const [packages, setPackages] = useState<Package[]>([
    { id: 1, name: 'Dakhla Adventure', destination: 'Dakhla, Morocco', economy: 600, premium: 950, luxury: 1500, featured: true },
    { id: 2, name: 'Marrakesh Retreat', destination: 'Marrakesh, Morocco', economy: 500, premium: 800, luxury: 1300, featured: false },
  ]);

  const [bookings] = useState<Booking[]>([
    { id: 'HV-2025-0001', customer: 'Sarah Johnson', destination: 'Dakhla, Morocco', amount: 2499, status: 'confirmed' },
    { id: 'HV-2025-0002', customer: 'Michael Chen', destination: 'Marrakesh, Morocco', amount: 1899, status: 'confirmed' },
  ]);

  const stats = useMemo(() => ({
    destinations: destinations.length,
    activities: activities.length,
    packages: packages.length,
    bookings: bookings.length,
  }), [destinations.length, activities.length, packages.length, bookings.length]);

  function toggleDestinationVisibility(id: number) {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, visibleInCustomizer: !d.visibleInCustomizer } : d));
  }
  function toggleActivityVisibility(id: number) {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, visibleInCustomizer: !a.visibleInCustomizer } : a));
  }
  function toggleFeaturedPackage(id: number) {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-[220px,1fr] gap-6">
        {/* Sidebar */}
        <aside className="glass p-4 h-fit md:sticky md:top-6">
          <div className="font-bold text-lg mb-4">Hache<span className="text-aqua">Viajes</span> Admin</div>
          <nav className="space-y-1 text-sm">
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='dashboard'?'bg-white/10':''}`} onClick={()=>setActiveTab('dashboard')}><span className="inline-flex items-center gap-2"><ChartBarIcon className="w-4 h-4"/>Dashboard</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='customizer'?'bg-white/10':''}`} onClick={()=>setActiveTab('customizer')}><span className="inline-flex items-center gap-2"><Cog8ToothIcon className="w-4 h-4"/>Customizer Manager</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='destinations'?'bg-white/10':''}`} onClick={()=>setActiveTab('destinations')}><span className="inline-flex items-center gap-2"><MapPinIcon className="w-4 h-4"/>Destinations</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='departures'?'bg-white/10':''}`} onClick={()=>setActiveTab('departures')}><span className="inline-flex items-center gap-2"><PlaneUpIcon className="w-4 h-4"/>Departure Cities</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='packages'?'bg-white/10':''}`} onClick={()=>setActiveTab('packages')}><span className="inline-flex items-center gap-2"><RectangleStackIcon className="w-4 h-4"/>Packages</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='flights'?'bg-white/10':''}`} onClick={()=>setActiveTab('flights')}><span className="inline-flex items-center gap-2"><Squares2X2Icon className="w-4 h-4"/>Flights</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='hotels'?'bg-white/10':''}`} onClick={()=>setActiveTab('hotels')}><span className="inline-flex items-center gap-2"><BuildingOffice2Icon className="w-4 h-4"/>Hotels</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='activities'?'bg-white/10':''}`} onClick={()=>setActiveTab('activities')}><span className="inline-flex items-center gap-2"><TicketIcon className="w-4 h-4"/>Activities</span></button>
            <button className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 ${activeTab==='bookings'?'bg-white/10':''}`} onClick={()=>setActiveTab('bookings')}><span className="inline-flex items-center gap-2"><ChartBarIcon className="w-4 h-4"/>Bookings</span></button>
          </nav>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="glass p-4"><div className="text-2xl font-bold">{stats.destinations}</div><div className="text-white/70">Destinations</div></div>
                <div className="glass p-4"><div className="text-2xl font-bold">{stats.packages}</div><div className="text-white/70">Packages</div></div>
                <div className="glass p-4"><div className="text-2xl font-bold">{stats.activities}</div><div className="text-white/70">Activities</div></div>
                <div className="glass p-4"><div className="text-2xl font-bold">{stats.bookings}</div><div className="text-white/70">Bookings</div></div>
              </div>
              <div className="glass">
                <div className="p-4 border-b border-white/10 font-semibold">Recent Bookings</div>
                <div className="p-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-white/70">
                      <tr>
                        <th className="text-left py-2 pr-4">Booking ID</th>
                        <th className="text-left py-2 pr-4">Customer</th>
                        <th className="text-left py-2 pr-4">Destination</th>
                        <th className="text-left py-2 pr-4">Amount</th>
                        <th className="text-left py-2 pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-t border-white/10">
                          <td className="py-2 pr-4">{b.id}</td>
                          <td className="py-2 pr-4">{b.customer}</td>
                          <td className="py-2 pr-4">{b.destination}</td>
                          <td className="py-2 pr-4">€{b.amount}</td>
                          <td className="py-2 pr-4 text-green-400">{b.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customizer' && (
            <div className="space-y-6">
              <div className="glass p-4">
                <div className="font-semibold mb-2">Destination Visibility</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {destinations.map(d => (
                    <div key={d.id} className={`p-3 rounded-lg border ${d.visibleInCustomizer?'border-aqua bg-white/10':'border-white/20'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{d.name}</div>
                          <div className="text-white/60 text-sm">{d.country} • {d.packages} packages</div>
                        </div>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={d.visibleInCustomizer} onChange={()=>toggleDestinationVisibility(d.id)} />
                          <span>{d.visibleInCustomizer?'Visible':'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-4">
                <div className="font-semibold mb-2">Activity Visibility</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {activities.map(a => (
                    <div key={a.id} className={`p-3 rounded-lg border ${a.visibleInCustomizer?'border-aqua bg-white/10':'border-white/20'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{a.name}</div>
                          <div className="text-white/60 text-sm">{a.type} • {a.duration} • €{a.price}</div>
                        </div>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={a.visibleInCustomizer} onChange={()=>toggleActivityVisibility(a.id)} />
                          <span>{a.visibleInCustomizer?'Visible':'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-4">
                <div className="font-semibold mb-2">Featured Packages</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {packages.map(p => (
                    <div key={p.id} className={`p-3 rounded-lg border ${p.featured?'border-aqua bg-white/10':'border-white/20'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-white/60 text-sm">{p.destination} • €{p.economy} - €{p.luxury}</div>
                        </div>
                        <label className="inline-flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={p.featured} onChange={()=>toggleFeaturedPackage(p.id)} />
                          <span>{p.featured?'Featured':'Not Featured'}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="glass">
              <div className="p-4 border-b border-white/10 flex items-center justify-between"><div className="font-semibold">Destinations</div><button className="btn">Add Destination</button></div>
              <div className="p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-white/70">
                    <tr><th className="text-left py-2 pr-4">Name</th><th className="text-left py-2 pr-4">Country</th><th className="text-left py-2 pr-4">Visible</th><th className="text-left py-2 pr-4">Status</th><th className="text-left py-2 pr-4">Packages</th></tr>
                  </thead>
                  <tbody>
                    {destinations.map(d => (
                      <tr key={d.id} className="border-t border-white/10">
                        <td className="py-2 pr-4">{d.name}</td>
                        <td className="py-2 pr-4">{d.country}</td>
                        <td className="py-2 pr-4">{d.visibleInCustomizer? 'Yes':'No'}</td>
                        <td className="py-2 pr-4">{d.status}</td>
                        <td className="py-2 pr-4">{d.packages}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="glass">
              <div className="p-4 border-b border-white/10 font-semibold">Packages</div>
              <div className="p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-white/70">
                    <tr><th className="text-left py-2 pr-4">Package</th><th className="text-left py-2 pr-4">Destination</th><th className="text-left py-2 pr-4">Featured</th><th className="text-left py-2 pr-4">Economy</th><th className="text-left py-2 pr-4">Premium</th><th className="text-left py-2 pr-4">Luxury</th></tr>
                  </thead>
                  <tbody>
                    {packages.map(p => (
                      <tr key={p.id} className="border-t border-white/10">
                        <td className="py-2 pr-4">{p.name}</td>
                        <td className="py-2 pr-4">{p.destination}</td>
                        <td className="py-2 pr-4">{p.featured? 'Yes':'No'}</td>
                        <td className="py-2 pr-4">€{p.economy}</td>
                        <td className="py-2 pr-4">€{p.premium}</td>
                        <td className="py-2 pr-4">€{p.luxury}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="glass p-4">
              <div className="font-semibold mb-3">Activities</div>
              <div className="grid md:grid-cols-2 gap-3">
                {activities.map(a => (
                  <div key={a.id} className="p-3 rounded-lg border border-white/20">
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-white/60 text-sm">{a.type} • {a.duration} • €{a.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="glass">
              <div className="p-4 border-b border-white/10 font-semibold">Bookings</div>
              <div className="p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-white/70">
                    <tr><th className="text-left py-2 pr-4">ID</th><th className="text-left py-2 pr-4">Customer</th><th className="text-left py-2 pr-4">Destination</th><th className="text-left py-2 pr-4">Amount</th><th className="text-left py-2 pr-4">Status</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-t border-white/10">
                        <td className="py-2 pr-4">{b.id}</td>
                        <td className="py-2 pr-4">{b.customer}</td>
                        <td className="py-2 pr-4">{b.destination}</td>
                        <td className="py-2 pr-4">€{b.amount}</td>
                        <td className="py-2 pr-4 text-green-400">{b.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
