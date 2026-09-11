import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Topics from "./components/Topics";
import Subtopics from "./components/Subtopics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topics />} />

        <Route
          path="/topics/:topicId/subtopics"
          element={<Subtopics />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;