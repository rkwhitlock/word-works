import { Link } from "react-router-dom";

const nav = [
  { text: "Start Learning" },
  { text: "View Lessons", path: "/lessons" },
];

export default function HomeScreen() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-pink-400 to-blue-500">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl text-white font-bold mb-8">Word Works!</h1>
        <h2 className="text-white text-2xl pb-10">From Ms. Reese</h2>
        {nav.map((item, index) => (
          <Link
            key={index}
            className="bg-yellow-800 text-white text-lg py-3 px-8 rounded-full mb-4 hover:bg-yellow-500 transition duration-200"
            to={item.path || "/"}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
