import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { getCustomizeSettings, setCustomizeSettings, type CustomizeSettings } from '@/lib/customizeSettings';

type Trip = {
  id: string;
  title: string;
  city: string;
  packages: { id: string; name: string; basePrice: number }[];
};

type Booking = {
  id: string;
  totalPrice: number;
  paymentStatus: string;
  user?: { name: string; email: string };
  trip?: { title: string };
  package?: { name: string };
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'customizer' | 'destinations' | 'departures' | 'packages' | 'flights' | 'hotels' | 'activities' | 'bookings'
  >('dashboard');

  const [metrics, setMetrics] = useState<any>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<CustomizeSettings>(getCustomizeSettings());

  const destinationNames = useMemo(() => Array.from(new Set(trips.map(t => t.city))), [trips]);
  const featuredPackages = useMemo(() => new Set(settings.featuredPackages), [settings.featuredPackages]);

  useEffect(() => {
    api.get('/admin/metrics').then(r => setMetrics(r.data));
    api.get('/admin/bookings').then(r => setBookings(r.data));
    api.get('/trips').then(r => setTrips(r.data));
  }, []);

  const toggleDestination = (name: string, nextChecked: boolean) => {
    const next = nextChecked
      ? Array.from(new Set([...settings.visibleDestinations, name]))
      : settings.visibleDestinations.filter(n => n !== name);
    setCustomizeSettings({ visibleDestinations: next });
    setSettings(prev => ({ ...prev, visibleDestinations: next }));
  };

  const toggleActivity = (name: string, nextChecked: boolean) => {
    const next = nextChecked
      ? Array.from(new Set([...settings.visibleActivities, name]))
      : settings.visibleActivities.filter(n => n !== name);
    setCustomizeSettings({ visibleActivities: next });
    setSettings(prev => ({ ...prev, visibleActivities: next }));
  };

  const toggleFeaturedPackage = (pkgId: string, nextChecked: boolean) => {
    const next = nextChecked
      ? Array.from(new Set([...settings.featuredPackages, pkgId]))
      : settings.featuredPackages.filter(n => n !== pkgId);
    setCustomizeSettings({ featuredPackages: next });
    setSettings(prev => ({ ...prev, featuredPackages: next }));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3">
          <div className="glass p-4">
            <div className="text-xl font-bold mb-3">HacheViajes Admin</div>
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'customizer', label: 'Trip Customizer Manager' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'departures', label: 'Departure Cities' },
              { id: 'packages', label: 'Packages' },
              { id: 'flights', label: 'Flights' },
              { id: 'hotels', label: 'Hotels' },
              { id: 'activities', label: 'Activities' },
              { id: 'bookings', label: 'Bookings' },
            ].map(({ id, label }) => (
              <button
                key={id}
                className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                  activeTab === (id as any) ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
                }`}
                onClick={() => setActiveTab(id as any)}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button className="btn" onClick={() => alert('Sync started...')}>Sync Providers</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass p-4">Trips: {metrics.trips ?? '-'}</div>
                <div className="glass p-4">Bookings: {metrics.bookings ?? '-'}</div>
                <div className="glass p-4">Seats Left: {metrics.activeSeats ?? '-'}</div>
                <div className="glass p-4">Custom Trips: {metrics.customTrips ?? '-'}</div>
              </div>
              <div className="glass p-4">
                <div className="font-semibold mb-3">Recent Bookings</div>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-white/70">
                        <th className="text-left p-2">Booking</th>
                        <th className="text-left p-2">Customer</th>
                        <th className="text-left p-2">Trip</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} className="border-t border-white/10">
                          <td className="p-2 font-mono text-xs">{b.id.slice(0, 8)}…</td>
                          <td className="p-2">{b.user?.name ?? '—'}</td>
                          <td className="p-2">{b.trip?.title ?? '—'}</td>
                          <td className="p-2">€{Number(b.totalPrice ?? 0).toFixed(2)}</td>
                          <td className="p-2 capitalize">{b.paymentStatus}</td>
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
                <div className="grid md:grid-cols-2 gap-2">
                  {destinationNames.map(name => {
                    const checked = settings.visibleDestinations.includes(name);
                    return (
                      <label key={name} className={`flex items-center justify-between p-3 rounded border ${checked ? 'border-white/40 bg-white/10' : 'border-white/10'}`}>
                        <span>{name}</span>
                        <input type="checkbox" checked={checked} onChange={e => toggleDestination(name, e.target.checked)} />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="glass p-4">
                <div className="font-semibold mb-2">Activity Visibility</div>
                <div className="grid md:grid-cols-2 gap-2">
                  {settings.visibleActivities.map(name => {
                    const checked = settings.visibleActivities.includes(name);
                    return (
                      <label key={name} className={`flex items-center justify-between p-3 rounded border ${checked ? 'border-white/40 bg-white/10' : 'border-white/10'}`}>
                        <span>{name}</span>
                        <input type="checkbox" checked={checked} onChange={e => toggleActivity(name, e.target.checked)} />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="glass p-4">
                <div className="font-semibold mb-2">Featured Packages</div>
                <div className="grid gap-2">
                  {trips.flatMap(t => t.packages.map(p => ({ trip: t, pkg: p }))).map(({ trip, pkg }) => {
                    const checked = featuredPackages.has(pkg.id);
                    return (
                      <label key={pkg.id} className={`flex items-center justify-between p-3 rounded border ${checked ? 'border-white/40 bg-white/10' : 'border-white/10'}`}>
                        <span>{trip.title} — {pkg.name}</span>
                        <input type="checkbox" checked={checked} onChange={e => toggleFeaturedPackage(pkg.id, e.target.checked)} />
                      </label>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-2">
                  <a className="btn" href="/customize" target="_blank" rel="noreferrer">Preview Customizer</a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="glass p-4">
              <div className="font-semibold mb-3">Destinations</div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/70">
                      <th className="text-left p-2">City</th>
                      <th className="text-left p-2">Visible in Customizer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinationNames.map(name => (
                      <tr key={name} className="border-t border-white/10">
                        <td className="p-2">{name}</td>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={settings.visibleDestinations.includes(name)}
                            onChange={e => toggleDestination(name, e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="glass p-4">
              <div className="font-semibold mb-3">Packages</div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/70">
                      <th className="text-left p-2">Trip</th>
                      <th className="text-left p-2">Package</th>
                      <th className="text-left p-2">Base Price</th>
                      <th className="text-left p-2">Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.flatMap(trip => trip.packages.map(pkg => (
                      <tr key={pkg.id} className="border-t border-white/10">
                        <td className="p-2">{trip.title}</td>
                        <td className="p-2">{pkg.name}</td>
                        <td className="p-2">€{Number(pkg.basePrice).toFixed(2)}</td>
                        <td className="p-2">
                          <input type="checkbox" checked={featuredPackages.has(pkg.id)} onChange={e => toggleFeaturedPackage(pkg.id, e.target.checked)} />
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="glass p-4">
              <div className="font-semibold mb-3">Bookings</div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/70">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Trip</th>
                      <th className="text-left p-2">Package</th>
                      <th className="text-left p-2">Total</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-t border-white/10">
                        <td className="p-2 font-mono text-xs">{b.id.slice(0, 8)}…</td>
                        <td className="p-2">{b.user?.name ?? '—'}</td>
                        <td className="p-2">{b.trip?.title ?? '—'}</td>
                        <td className="p-2">{b.package?.name ?? '—'}</td>
                        <td className="p-2">€{Number(b.totalPrice ?? 0).toFixed(2)}</td>
                        <td className="p-2 capitalize">{b.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['departures', 'flights', 'hotels', 'activities'].includes(activeTab) && (
            <div className="glass p-4">
              <div className="font-semibold mb-2 capitalize">{activeTab}</div>
              <div className="text-white/70">Not yet connected to backend. Coming soon.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
