import Link from "next/link";

export default function KitCard({ title, description, href }) {
  return (
    <div className="border rounded p-6">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      <Link
        href={href}
        className="inline-block mt-4 text-sm underline"
      >
        Configurar
      </Link>
    </div>
  );
}
