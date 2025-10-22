export default function Admin() {
  const src = `${import.meta.env.BASE_URL}admin.html`;
  return (
    <div className="min-h-screen">
      <iframe title="Admin" src={src} className="w-full" style={{ minHeight: '100vh', border: 'none' }} />
    </div>
  );
}
