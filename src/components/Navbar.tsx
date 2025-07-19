export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white sticky top-0 z-10">
      <div className="text-2xl font-bold text-purple-700">LOGOIPSUM</div>
      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-purple-600 cursor-pointer">Home</li>
        <li className="hover:text-purple-600 cursor-pointer">Features</li>
        <li className="hover:text-purple-600 cursor-pointer">Integrations</li>
        <li className="hover:text-purple-600 cursor-pointer">About</li>
      </ul>
      <button className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition">
        Contact Us
      </button>
    </nav>
  );
}
