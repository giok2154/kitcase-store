import KitCard from "@/components/KitCard";

export default function KitsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">
        Elige tu Kit
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <KitCard
          title="Kit Protección Total"
          description="Protección completa para tu iPhone."
          href="/kits/proteccion-total"
        />

        <KitCard
          title="Kit MagSafe Pro"
          description="Accesorios MagSafe con máxima compatibilidad."
          href="/kits/magsafe-pro"
        />

        <KitCard
          title="Kit Básico"
          description="Protección esencial al mejor precio."
          href="/kits/basico"
        />
      </div>
    </main>
  );
}
