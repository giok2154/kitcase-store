export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} KitCase. Todos los derechos reservados.
      </div>
    </footer>
  );
}
