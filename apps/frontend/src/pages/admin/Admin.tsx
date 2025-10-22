import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { socket } from '@/sockets/io';
import Customize from '@/pages/Customize';
import TripsPage from '@/pages/Trips';

type CustomTrip = {
  id: string;
  userId: string;
  user?: { name: string; email: string };
  cities: string; // stored as JSON string
  days: number;
  totalPrice: number;
  status: string;
};

export default function Admin() {
  const [metrics, setMetrics] = useState<any>({});
  const [vars, setVars] = useState<any>(null);
  const [customTrips, setCustomTrips] = useState<CustomTrip[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [tab, setTab] = useState<'dashboard' | 'pricing' | 'trips' | 'bookings' | 'customTrips' | 'customize'>('dashboard');
  const [editing, setEditing] = useState<null | { id: string; citiesText: string; days: number }>(null);

  useEffect(() => {
    api.get('/admin/metrics').then(r => setMetrics(r.data));
    api.get('/admin/pricing').then(r => setVars(r.data));
    api.get('/admin/custom-trips').then(r => setCustomTrips(r.data));
    api.get('/admin/bookings').then(r => setBookings(r.data));
  }, []);

  async function handleConfirmCustomTrip(id: string) {
    await api.post(`/custom-trip/${id}/confirm`);
    const r = await api.get('/admin/custom-trips');
    setCustomTrips(r.data);
  }

  function openEdit(ct: CustomTrip) {
    const citiesArray = safeParseArray(ct.cities);
    setEditing({ id: ct.id, citiesText: citiesArray.join(', '), days: ct.days });
  }

  async function saveEdit() {
    if (!editing) return;
    const cities = editing.citiesText.split(',').map(s => s.trim()).filter(Boolean);
    const days = Number(editing.days || 1);
    await api.post(`/custom-trip/${editing.id}`, { cities, days });
    const r = await api.get('/admin/custom-trips');
    setCustomTrips(r.data);
    setEditing(null);
  }

  useEffect(() => {
    const onMetrics = (m: any) => setMetrics(m);
    socket.on('metrics_update', onMetrics);
    return () => { socket.off('metrics_update', onMetrics); };
  }, []);

  const parsedCustomTrips = useMemo(() => customTrips.map(ct => ({
    ...ct,
    citiesArray: safeParseArray(ct.cities)
  })), [customTrips]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="glass p-2 mb-6 flex flex-wrap items-center gap-2">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'trips', label: 'Trips' },
          { id: 'bookings', label: 'Bookings' },
          { id: 'customTrips', label: 'Custom Trips' },
          { id: 'customize', label: 'Customize Editor' },
        ].map((t) => (
          <button key={t.id}
            className={`px-4 py-2 rounded-lg ${tab === (t.id as any) ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20`}
            onClick={() => setTab(t.id as any)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div className="grid gap-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass p-4">Active Trips: {metrics.trips ?? '-'}</div>
            <div className="glass p-4">Bookings: {metrics.bookings ?? '-'}</div>
            <div className="glass p-4">Seats Left: {metrics.activeSeats ?? '-'}</div>
            <div className="glass p-4">Custom Trips: {metrics.customTrips ?? '-'}</div>
          </div>
        </div>
      )}

      {tab === 'pricing' && (
        <div className="glass p-4">
          <div className="font-semibold mb-3">Pricing Variables</div>
          {vars && (
            <form className="grid md:grid-cols-5 gap-3" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              const payload = {
                serviceFee: parseFloat(String(formData.get('serviceFee'))),
                taxRate: parseFloat(String(formData.get('taxRate'))),
                markupPercent: parseFloat(String(formData.get('markupPercent'))),
                currency: String(formData.get('currency')),
                seasonalMultipliers: vars.seasonalMultipliers
              };
              const r = await api.post('/admin/pricing', payload);
              setVars(r.data);
            }}>
              <label className="flex flex-col">Service Fee %<input name="serviceFee" className="glass p-2 mt-1" defaultValue={vars.serviceFee} /></label>
              <label className="flex flex-col">Tax %<input name="taxRate" className="glass p-2 mt-1" defaultValue={vars.taxRate} /></label>
              <label className="flex flex-col">Markup %<input name="markupPercent" className="glass p-2 mt-1" defaultValue={vars.markupPercent} /></label>
              <label className="flex flex-col">Currency<input name="currency" className="glass p-2 mt-1" defaultValue={vars.currency} /></label>
              <button className="btn self-end">Save</button>
            </form>
          )}
        </div>
      )}

      {tab === 'bookings' && (
        <div className="glass p-4">
          <div className="font-semibold mb-4">Bookings</div>
          <div className="overflow-x-auto">
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
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-white/10">
                    <td className="p-2 font-mono text-xs">{b.id.slice(0,8)}…</td>
                    <td className="p-2">{b.user?.name ?? '—'}<div className="text-white/50 text-xs">{b.user?.email ?? '—'}</div></td>
                    <td className="p-2">{b.trip?.title ?? '—'}</td>
                    <td className="p-2">{b.package?.name ?? '—'}</td>
                    <td className="p-2">€{Number(b.totalPrice ?? 0).toFixed(2)}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded bg-white/10 capitalize">{b.paymentStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'customTrips' && (
        <div className="glass p-4">
          <div className="font-semibold mb-4">Custom Trip Requests</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/70">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Cities</th>
                  <th className="text-left p-2">Days</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parsedCustomTrips.map(ct => (
                  <tr key={ct.id} className="border-t border-white/10">
                    <td className="p-2 font-mono text-xs">{ct.id.slice(0,8)}…</td>
                    <td className="p-2">{ct.user?.name ?? '—'}<div className="text-white/50 text-xs">{ct.user?.email ?? '—'}</div></td>
                    <td className="p-2">{ct.citiesArray.join(' → ')}</td>
                    <td className="p-2">{ct.days}</td>
                    <td className="p-2">€{ct.totalPrice.toFixed(2)}</td>
                    <td className="p-2"><span className="px-2 py-1 rounded bg-white/10 capitalize">{ct.status}</span></td>
                    <td className="p-2 flex gap-2">
                      <button className="btn btn-sm" onClick={() => openEdit(ct as any)}>
                        Edit
                      </button>
                      <button className="btn btn-sm" onClick={() => handleConfirmCustomTrip(ct.id)} disabled={ct.status === 'confirmed'}>
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'trips' && (
        <div className="glass p-4">
          <div className="font-semibold mb-4">Trips</div>
          <TripsPage />
        </div>
      )}

      {tab === 'customize' && (
        <div className="glass p-4">
          <div className="font-semibold mb-4">Customize Your Trip (Editor)</div>
          <Customize />
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass w-full max-w-lg p-4">
            <div className="font-semibold mb-3">Edit Custom Trip</div>
            <div className="grid gap-3">
              <label className="flex flex-col">Cities (comma separated)
                <input className="glass p-2 mt-1 bg-white/10 border border-white/20 rounded"
                  value={editing.citiesText}
                  onChange={(e)=> setEditing({ ...editing, citiesText: e.target.value })}
                />
              </label>
              <label className="flex flex-col">Days
                <input className="glass p-2 mt-1 bg-white/10 border border-white/20 rounded" type="number" min={1}
                  value={editing.days}
                  onChange={(e)=> setEditing({ ...editing, days: Number(e.target.value || 1) })}
                />
              </label>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button className="btn" onClick={()=> setEditing(null)}>Cancel</button>
              <button className="btn" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function safeParseArray(jsonLike: string): string[] {
  try {
    const v = JSON.parse(jsonLike);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
