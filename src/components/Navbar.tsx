type NavbarProps = {
  onLogout: () => void;
};

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-10">
      <div className="text-2xl font-bold" style={{ color: "#5086FF" }}>
        Estatísticas Avant
        </div>

      <div className="flex items-center space-x-4">

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:text-red-600 transition"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
