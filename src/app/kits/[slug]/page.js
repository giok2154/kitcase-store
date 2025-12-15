import { kits } from "../../../data/kits";
import KitConfigurator from "@/components/KitConfigurator";

export default async function KitConfiguratorPage({ params }) {
  const { slug } = await params;

  const kit = kits.find(
    (k) => String(k.slug) === String(slug)
  );

  if (!kit) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Kit no encontrado</h1>
        <pre>Slug recibido: {slug}</pre>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{kit.name}</h1>
      <p className="mt-2 text-gray-600">{kit.description}</p>

      <KitConfigurator kit={kit} />
    </main>
  );
}
