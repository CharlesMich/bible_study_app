import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Topics",
      type: "internal",
      path: "/topics",
    },
    {
      name: "NRSVCE",
      type: "external",
      url: "YOUR_NRSVCE_URL",
    },
    {
      name: "DRA",
      type: "external",
      url: "YOUR_DRA_URL",
    },
    {
      name: "CPDV",
      type: "external",
      url: "YOUR_CPDV_URL",
    },
    {
      name: "Catechism",
      type: "external",
      url: "YOUR_CATECHISM_URL",
    },
  ];

  function handleClick(item) {
    if (item.type === "internal") {
      navigate(item.path);
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">
        
        <header className="bg-blue-700 px-6 py-5">
          <h1 className="text-3xl font-bold text-white">
            Bible Study
          </h1>
        </header>

        <div>
          {menuItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium hover:bg-blue-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <span>{item.name}</span>

              <span className="text-gray-400">›</span>
            </button>
          ))}
        </div>

      </section>
    </main>
  );
}

export default Home;