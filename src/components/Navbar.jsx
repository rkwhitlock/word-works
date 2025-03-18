import { FaHome } from "react-icons/fa"; // Importing the Home icon from react-icons
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Home Icon */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaHome className="text-3xl cursor-pointer hover:text-blue-300 transition duration-200 text-white" />
        </Link>
        <span className="ml-2 text-2xl font-bold">Word Works by Reese!</span>
      </div>
      <div>
        {/* Other navbar links/buttons */}
        <Link
          to="/how-to-play"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <button className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition duration-200">
            How To Play?
          </button>
        </Link>
      </div>
    </nav>
  );
}
