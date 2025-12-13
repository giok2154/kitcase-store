import { kits } from "../../../data/kits";

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

      <section className="mt-10 space-y-6">
        {kit.steps.map((step) => (
          <div key={step.id} className="border p-4 rounded">
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-gray-500">
              Tipo: {step.type}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
