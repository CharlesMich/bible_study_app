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
      url: "https://www.biblegateway.com/versions/New-Revised-Standard-Version-Catholic-Edition-NRSVCE-Bible/",
    },
    {
      name: "DRA",
      type: "external",
      url: "https://www.biblegateway.com/versions/Douay-Rheims-1899-American-Edition-DRA-Bible/",
    },
    {
      name: "CPDV",
      type: "external",
      url: "YOUR_CPDV_URL",
    },
    {
      name: "Catechism",
      type: "external",
      url: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
    },
    {
      name: "Catechism Search",
      type: "external",
      url: "https://scborromeo2.org/catechism-of-the-catholic-church",
    },
    {
      name: "Book Store",
      type: "external",
      url: "https://giftedbookstore.com",
    },
    {
      name: "Author central",
      type: "external",
      url: "https://www.amazon.com/stores/Charles-Michael/author/B07SMB94PD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=2c7436cb-fa0b-4d4d-a9c1-85b5152d75c6",
    },
    {
      name: "Call on HIM - Youtube",
      type: "external",
      url: "https://www.youtube.com/@Callonhim",
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