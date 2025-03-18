import { Link } from "react-router-dom";
import ReeseImg from "../assets/reese.png";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Home Icon */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={ReeseImg} className="h-16 pr-2" />
        </Link>
        <span className="ml-2 text-2xl font-bold">
          Word Works by Ms. Reese!
        </span>
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
