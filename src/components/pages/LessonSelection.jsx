import { Link } from "react-router-dom";

const lessons = [{ name: "Words", path: "/lessons/words" }];

export default function LessonSelection() {
  return (
    <div className="min-h-screen min-w-screen bg-blue-200">
      <div className="flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl text-blue-700 font-bold mb-8">
          Choose Your Lesson
        </h2>

        <div className="grid grid-cols-1 gap-6 text-center">
          {lessons.map((item, index) => (
            <Link
              key={index}
              className="bg-yellow-300 text-xl text-blue-700 p-6 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-200"
              to={item.path || "/"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
