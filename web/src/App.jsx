import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Topics from "./components/Topics";
import Subtopics from "./components/Subtopics";
import Subtopics2 from "./components/Subtopics2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topics />} />

        <Route
          path="/topics/:topicId/subtopics"
          element={<Subtopics />}
        />

        <Route
          path="/topics/:topicId/subtopics/:subtopicId"
          element={<Subtopics2 />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;