import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuestionSubmit from "./components/QuestionSubmit";
import QuestionViewer from "./components/QuestionViewer";
import CategoryView from "./components/CategoryView";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>✅ Submit Question</Link>
        <Link to="/category" style={{ marginRight: "15px" }}>📚 Category</Link>
        <Link to="/all" style={{ marginRight: "15px" }}>📋 All Questions</Link>
      </nav>

      <Routes>
        <Route path="/" element={<QuestionSubmit />} />
        <Route path="/category" element={<CategoryView />} />
        <Route path="/all" element={<QuestionViewer />} />
      </Routes>
    </Router>
  );
}

export default App;