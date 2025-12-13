export default function HomeHero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-semibold">
        Protección premium para tu iPhone
      </h1>
      <p className="mt-4 text-gray-600">
        Kits inteligentes y accesorios diseñados para proteger mejor y ahorrar más.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/kits"
          className="rounded-md bg-black px-6 py-3 text-white text-sm"
        >
          Elegir mi Kit
        </a>
        <a
          href="/products/funda"
          className="rounded-md border px-6 py-3 text-sm"
        >
          Ver accesorios
        </a>
      </div>
    </section>
  );
}
