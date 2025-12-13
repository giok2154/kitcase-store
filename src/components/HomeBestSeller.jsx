import Link from "next/link";

export default function HomeBestSeller() {
  return (
    <section className="py-16 border-t">
      <span className="inline-block mb-3 text-xs uppercase tracking-wide text-gray-500">
        Más vendido
      </span>

      <h2 className="text-2xl font-semibold">
        Cuantos más accesorios llevas, más ahorras
      </h2>

      <p className="mt-2 text-gray-600">
        3 artículos –30% · 4 artículos –40% · 5 o más –50%
      </p>

      <Link
        href="/packs"
        className="inline-block mt-6 rounded-md bg-black px-6 py-3 text-white text-sm"
      >
        Crear mi pack
      </Link>
    </section>
  );
}
