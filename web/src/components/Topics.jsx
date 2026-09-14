import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TOPICS_URL =
  "https://raw.githubusercontent.com/CharlesMich/bible_study_app/main/topics.json";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

  function openSubtopics(topic) {
    navigate(`/topics/${topic.id}/subtopics`, {
      state: {
        topicName: topic.topic,
      },
    });
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">

        <header className="bg-blue-700 px-6 py-5">
          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg px-3 py-2 text-lg font-medium text-white transition hover:bg-blue-600"
            >
              ‹ Back
            </button>

            <h1 className="text-3xl font-bold text-white">
              Topics
            </h1>

          </div>
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
                className={`border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openSubtopics(topic)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-blue-50"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {topic.topic}
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

export default Topics;