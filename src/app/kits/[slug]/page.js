import { kits } from "@/data/kits";
import KitConfigurator from "@/components/KitConfigurator";
import ValuePoints from "@/components/ValuePoints";

export default async function KitConfiguratorPage({ params }) {
  // Next.js 16: params es una Promise
  const { slug } = await params;

  const cleanSlug = decodeURIComponent(slug).replace(":", "");
  const kit = kits.find((k) => k.slug === cleanSlug);

  if (!kit) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold">Kit no encontrado</h1>
        <p className="mt-2 text-sm text-gray-600">
          Slug recibido: {cleanSlug}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* HEADER */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">{kit.name}</h1>
        <p className="mt-2 text-gray-600">{kit.description}</p>

        {/* MENSAJES DE VALOR */}
        <ValuePoints kit={kit} />
      </header>

      {/* CONFIGURADOR */}
      <KitConfigurator kit={kit} />
    </main>
  );
}
