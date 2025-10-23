import { jsx as _jsx } from "react/jsx-runtime";
export default function Admin() {
    const src = `${import.meta.env.BASE_URL}admin.html`;
    return (_jsx("div", { className: "min-h-screen", children: _jsx("iframe", { title: "Admin", src: src, className: "w-full", style: { minHeight: '100vh', border: 'none' } }) }));
}
