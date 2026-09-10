import { useEffect, useState } from "react";

const TOPICS_URL =
  "https://raw.githubusercontent.com/CharlesMich/bible_study_app/main/topics.json";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await fetch(TOPICS_URL);

        if (!response.ok) {
          throw new Error("Unable to load topics.");
        }

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTopics();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">
        <header className="bg-blue-700 px-6 py-5">
          <h1 className="text-3xl font-bold text-white">Topics</h1>
        </header>

        {isLoading && (
          <p className="px-6 py-8 text-center text-gray-600">
            Loading topics...
          </p>
        )}

        {errorMessage && (
          <p className="px-6 py-8 text-center text-red-600">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && topics.length === 0 && (
          <p className="px-6 py-8 text-center text-gray-600">
            No topics found.
          </p>
        )}

        {!isLoading && !errorMessage && topics.length > 0 && (
          <ul>
            {topics.map((topic, index) => (
              <li
                key={topic.id}
                className={`border-b border-gray-200 px-6 py-4 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {topic.topic}
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

export default Topics;