import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const SUBTOPICS2_URL =
  "https://raw.githubusercontent.com/CharlesMich/bible_study_app/main/subtopics2.json";

function Subtopics2() {
  const [subtopics2, setSubtopics2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { subtopicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const subtopicName =
    location.state?.subtopicName || "Additional Subtopics";

  useEffect(() => {
    async function loadSubtopics2() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(SUBTOPICS2_URL);

        if (!response.ok) {
          throw new Error("Unable to load additional subtopics.");
        }

        const data = await response.json();

        const matchingSubtopics2 = data.filter(
          (item) =>
            Number(item.subtopic_id) === Number(subtopicId),
        );

        setSubtopics2(matchingSubtopics2);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load additional subtopics.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSubtopics2();
  }, [subtopicId]);

  function openSubtopics2Item(item) {
    // We will connect this to the Verses page next.
    console.log("Selected additional subtopic:", item);
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
            ← Back to Subtopics
          </button>

          <h1 className="text-3xl font-bold text-white">
            {subtopicName}
          </h1>

          <p className="mt-1 text-blue-100">
            Additional Subtopics
          </p>
        </header>

        {isLoading && (
          <p className="px-6 py-8 text-center text-gray-600">
            Loading additional subtopics...
          </p>
        )}

        {errorMessage && (
          <p className="px-6 py-8 text-center text-red-600">
            {errorMessage}
          </p>
        )}

        {!isLoading &&
          !errorMessage &&
          subtopics2.length === 0 && (
            <p className="px-6 py-8 text-center text-gray-600">
              No additional subtopics found.
            </p>
          )}

        {!isLoading &&
          !errorMessage &&
          subtopics2.length > 0 && (
            <ul>
              {subtopics2.map((item, index) => (
                <li
                  key={item.id}
                  className={`border-b border-gray-200 last:border-b-0 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openSubtopics2Item(item)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-blue-50"
                  >
                    <span className="text-lg font-medium text-gray-900">
                      {item.name}
                    </span>

                    <span className="text-2xl text-gray-400">
                      ›
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
      </section>
    </main>
  );
}

export default Subtopics2;