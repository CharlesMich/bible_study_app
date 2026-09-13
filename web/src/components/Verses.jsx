import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const VERSES_URL =
  "https://raw.githubusercontent.com/CharlesMich/bible_study_app/main/verses.json";

function Verses() {
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { subtopics2Id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const subtopics2Name =
    location.state?.subtopics2Name || "Verses";

  useEffect(() => {
    async function loadVerses() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(VERSES_URL);

        if (!response.ok) {
          throw new Error("Unable to load verses.");
        }

        const data = await response.json();

        const matchingVerses = data.filter((verse) =>
          verse.subtopics2_id?.some(
            (id) => Number(id) === Number(subtopics2Id),
          ),
        );

        setVerses(matchingVerses);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load verses.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadVerses();
  }, [subtopics2Id]);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">
        <header className="bg-blue-700 px-6 py-5 text-white">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 rounded-md bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            {subtopics2Name}
          </h1>
        </header>

        {isLoading && (
          <p className="px-6 py-8 text-center text-gray-600">
            Loading verses...
          </p>
        )}

        {errorMessage && (
          <p className="px-6 py-8 text-center text-red-600">
            {errorMessage}
          </p>
        )}

        {!isLoading &&
          !errorMessage &&
          verses.length === 0 && (
            <p className="px-6 py-8 text-center text-gray-600">
              No verses found.
            </p>
          )}

        {!isLoading &&
          !errorMessage &&
          verses.length > 0 && (
            <div>
              {verses.map((verse, index) => (
                <article
                  key={verse.id}
                  className={`px-6 py-5 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="leading-7 text-gray-800">
                    {verse.verse}
                  </p>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default Verses;