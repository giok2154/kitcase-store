export default function HomeProducts() {
  return (
    <section className="py-16 border-t">
      <h2 className="text-2xl font-semibold mb-6">
        Accesorios individuales
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="border p-4 rounded text-sm">Funda</div>
        <div className="border p-4 rounded text-sm">Protector de pantalla</div>
        <div className="border p-4 rounded text-sm">Protector de cámaras</div>
        <div className="border p-4 rounded text-sm">Accesorios MagSafe</div>
      </div>
    </section>
  );
}
