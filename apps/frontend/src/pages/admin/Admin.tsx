import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { socket } from '@/sockets/io';

export default function Admin() {
  const [metrics, setMetrics] = useState<any>({});
  const [vars, setVars] = useState<any>(null);

  useEffect(() => {
    api.get('/admin/metrics').then(r => setMetrics(r.data));
    api.get('/admin/pricing').then(r => setVars(r.data));
  }, []);

  useEffect(() => {
    const onMetrics = (m: any) => setMetrics(m);
    socket.on('metrics_update', onMetrics);
    return () => { socket.off('metrics_update', onMetrics); };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
      <div className="glass p-4">Active Trips: {metrics.trips ?? '-'}</div>
      <div className="glass p-4">Bookings: {metrics.bookings ?? '-'}</div>
      <div className="glass p-4">Seats Left: {metrics.activeSeats ?? '-'}</div>

      <div className="md:col-span-3 glass p-4">
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
    </div>
  );
}
