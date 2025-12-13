import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          KitCase
        </Link>

        <div className="flex gap-6 text-sm text-gray-700">
          <Link href="/kits">Kits</Link>
          <Link href="/packs">Packs</Link>
          <Link href="/cart">Carrito</Link>
        </div>
      </nav>
    </header>
  );
}
