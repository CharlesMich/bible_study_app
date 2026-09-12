import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const SUBTOPICS_URL =
  "https://raw.githubusercontent.com/CharlesMich/bible_study_app/main/subtopics.json";

function Subtopics() {
  const [subtopics, setSubtopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { topicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const topicName = location.state?.topicName || "Subtopics";

  useEffect(() => {
    async function loadSubtopics() {
      try {
        const response = await fetch(SUBTOPICS_URL);

        if (!response.ok) {
          throw new Error("Unable to load subtopics.");
        }

        const data = await response.json();

        const matchingSubtopics = data.filter(
          (subtopic) => Number(subtopic.topic_id) === Number(topicId),
        );

        setSubtopics(matchingSubtopics);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadSubtopics();
  }, [topicId]);

function openSubtopic(subtopic) {
  navigate(
    `/topics/${topicId}/subtopics/${subtopic.id}`,
    {
      state: {
        subtopicName: subtopic.subtopic,
      },
    },
  );
}

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">
        <header className="bg-blue-700 px-6 py-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 text-sm font-medium text-blue-100 hover:text-white"
          >
            ← Back to Topics
          </button>

          <h1 className="text-3xl font-bold text-white">
            {topicName}
          </h1>

          <p className="mt-1 text-blue-100">Subtopics</p>
        </header>

        {isLoading && (
          <p className="px-6 py-8 text-center text-gray-600">
            Loading subtopics...
          </p>
        )}

        {errorMessage && (
          <p className="px-6 py-8 text-center text-red-600">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && subtopics.length === 0 && (
          <p className="px-6 py-8 text-center text-gray-600">
            No subtopics found.
          </p>
        )}

        {!isLoading && !errorMessage && subtopics.length > 0 && (
          <ul>
            {subtopics.map((subtopic, index) => (
              <li
                key={subtopic.id}
                className={`border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openSubtopic(subtopic)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-blue-50"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {subtopic.subtopic}
                  </span>

                  <span className="text-2xl text-gray-400">›</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Subtopics;