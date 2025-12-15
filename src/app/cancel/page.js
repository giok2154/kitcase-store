export default function CancelPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Pago cancelado</h1>
      <p className="mt-4 text-gray-600">
        No se ha realizado ningún cargo. Puedes intentarlo de nuevo cuando quieras.
      </p>

      <a
        href="/"
        className="mt-8 inline-block rounded-xl bg-black px-6 py-3 text-white"
      >
        Volver a la tienda
      </a>
    </main>
  );
}
