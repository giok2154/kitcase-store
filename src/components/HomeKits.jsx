import Link from "next/link";

export default function HomeKits() {
  return (
    <section className="py-16 border-t">
      <h2 className="text-2xl font-semibold mb-6">
        Kits diseñados para tu iPhone
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="border p-6 rounded">
          <h3 className="font-medium">Kit Protección Total</h3>
          <p className="text-sm text-gray-600 mt-2">
            Todo lo esencial para proteger tu iPhone.
          </p>
          <Link href="/kits/proteccion-total" className="inline-block mt-4 text-sm underline">
            Configurar
          </Link>
        </div>

        <div className="border p-6 rounded">
          <h3 className="font-medium">Kit MagSafe Pro</h3>
          <p className="text-sm text-gray-600 mt-2">
            Protección y accesorios MagSafe.
          </p>
          <Link href="/kits/magsafe-pro" className="inline-block mt-4 text-sm underline">
            Configurar
          </Link>
        </div>

        <div className="border p-6 rounded">
          <h3 className="font-medium">Kit Básico</h3>
          <p className="text-sm text-gray-600 mt-2">
            Protección esencial al mejor precio.
          </p>
          <Link href="/kits/basico" className="inline-block mt-4 text-sm underline">
            Configurar
          </Link>
        </div>
      </div>
    </section>
  );
}
