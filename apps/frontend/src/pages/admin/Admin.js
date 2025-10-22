import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { socket } from '@/sockets/io';
export default function Admin() {
    const [metrics, setMetrics] = useState({});
    const [vars, setVars] = useState(null);
    useEffect(() => {
        api.get('/admin/metrics').then(r => setMetrics(r.data));
        api.get('/admin/pricing').then(r => setVars(r.data));
    }, []);
    useEffect(() => {
        const onMetrics = (m) => setMetrics(m);
        socket.on('metrics_update', onMetrics);
        return () => { socket.off('metrics_update', onMetrics); };
    }, []);
    return (_jsxs("div", { className: "max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "glass p-4", children: ["Active Trips: ", metrics.trips ?? '-'] }), _jsxs("div", { className: "glass p-4", children: ["Bookings: ", metrics.bookings ?? '-'] }), _jsxs("div", { className: "glass p-4", children: ["Seats Left: ", metrics.activeSeats ?? '-'] }), _jsxs("div", { className: "md:col-span-3 glass p-4", children: [_jsx("div", { className: "font-semibold mb-3", children: "Pricing Variables" }), vars && (_jsxs("form", { className: "grid md:grid-cols-5 gap-3", onSubmit: async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const payload = {
                                serviceFee: parseFloat(String(formData.get('serviceFee'))),
                                taxRate: parseFloat(String(formData.get('taxRate'))),
                                markupPercent: parseFloat(String(formData.get('markupPercent'))),
                                currency: String(formData.get('currency')),
                                seasonalMultipliers: vars.seasonalMultipliers
                            };
                            const r = await api.post('/admin/pricing', payload);
                            setVars(r.data);
                        }, children: [_jsxs("label", { className: "flex flex-col", children: ["Service Fee %", _jsx("input", { name: "serviceFee", className: "glass p-2 mt-1", defaultValue: vars.serviceFee })] }), _jsxs("label", { className: "flex flex-col", children: ["Tax %", _jsx("input", { name: "taxRate", className: "glass p-2 mt-1", defaultValue: vars.taxRate })] }), _jsxs("label", { className: "flex flex-col", children: ["Markup %", _jsx("input", { name: "markupPercent", className: "glass p-2 mt-1", defaultValue: vars.markupPercent })] }), _jsxs("label", { className: "flex flex-col", children: ["Currency", _jsx("input", { name: "currency", className: "glass p-2 mt-1", defaultValue: vars.currency })] }), _jsx("button", { className: "btn self-end", children: "Save" })] }))] })] }));
}
