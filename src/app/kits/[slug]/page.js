export default function KitConfiguratorPage({ params }) {
  const { slug } = params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">
        Configurador de Kit
      </h1>

      <p className="mt-2 text-gray-600">
        Kit seleccionado: <strong>{slug}</strong>
      </p>

      <section className="mt-10 border-t pt-6">
        <p className="text-sm text-gray-500">
          Aquí irá el configurador paso a paso.
        </p>
      </section>
    </main>
  );
}
