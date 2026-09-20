import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Topics from "./components/Topics";
import Subtopics from "./components/Subtopics";
import Subtopics2 from "./components/Subtopics2";
import Verses from "./components/Verses";

function App() {
  return (
    <BrowserRouter basename="/bible_study_app">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/topics" element={<Topics />} />

        <Route
          path="/topics/:topicId/subtopics"
          element={<Subtopics />}
        />

        <Route
          path="/topics/:topicId/subtopics/:subtopicId"
          element={<Subtopics2 />}
        />

        <Route
          path="/topics/:topicId/subtopics/:subtopicId/:subtopics2Id/verses"
          element={<Verses />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;