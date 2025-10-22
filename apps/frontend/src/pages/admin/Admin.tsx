import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { socket } from '@/sockets/io';

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

  useEffect(() => {
    api.get('/admin/metrics').then(r => setMetrics(r.data));
    api.get('/admin/pricing').then(r => setVars(r.data));
    api.get('/admin/custom-trips').then(r => setCustomTrips(r.data));
  }, []);

  async function handleConfirmCustomTrip(id: string) {
    await api.post(`/custom-trip/${id}/confirm`);
    const r = await api.get('/admin/custom-trips');
    setCustomTrips(r.data);
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
    <div className="max-w-6xl mx-auto px-6 py-10 grid gap-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass p-4">Active Trips: {metrics.trips ?? '-'}</div>
        <div className="glass p-4">Bookings: {metrics.bookings ?? '-'}</div>
        <div className="glass p-4">Seats Left: {metrics.activeSeats ?? '-'}</div>
        <div className="glass p-4">Custom Trips: {metrics.customTrips ?? '-'}</div>
      </div>

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
