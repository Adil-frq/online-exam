import { useState } from "react";

function QuestionSubmit() {
  const [formData, setFormData] = useState({
    question: { question: "" },
    option: { a: "", b: "", c: "", d: "", e: "" },
    answer: { correctOption: "", description: "" },
    category: { category: "", subcategory: "" }    // ← keep category object separate
  });

  const categoryOptions = {
    Physics: ["Mechanics", "Optics", "Thermodynamics"],
    Chemistry: ["Organic", "Inorganic", "Physical"],
    Biology: ["Botany", "Zoology", "Genetics"],
    Math: ["Algebra", "Geometry", "Calculus"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["a", "b", "c", "d", "e"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        option: { ...prev.option, [name]: value }
      }));
    } else if (name === "correctOption" || name === "description") {
      setFormData((prev) => ({
        ...prev,
        answer: { ...prev.answer, [name]: value }
      }));
    } else if (name === "question") {
      setFormData((prev) => ({
        ...prev,
        question: { question: value }
      }));
    } else if (name === "category" || name === "subcategory") {
      setFormData((prev) => ({
        ...prev,
        category: { ...prev.category, [name]: value }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v1/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to submit question");

      alert("✅ Question submitted successfully!");
      // reset ALL fields, including category
      setFormData({
        question: { question: "" },
        option: { a: "", b: "", c: "", d: "", e: "" },
        answer: { correctOption: "", description: "" },
        category: { category: "", subcategory: "" }
      });
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>📝 Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        {/* Question */}
        <div style={{ marginBottom: "15px" }}>
          <label><strong>Question</strong></label>
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={formData.question.question}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        {/* Options */}
        {["a","b","c","d","e"].map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label><strong>Option {key.toUpperCase()}</strong></label>
            <input
              type="text"
              name={key}
              placeholder={`Option ${key.toUpperCase()}`}
              value={formData.option[key]}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
        ))}

        {/* Category */}
        <div style={{ marginBottom: "15px" }}>
          <label><strong>Category</strong></label>
          <select
            name="category"
            value={formData.category.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {formData.category.category && (
          <div style={{ marginBottom: "15px" }}>
            <label><strong>Subcategory</strong></label>
            <select
              name="subcategory"
              value={formData.category.subcategory}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            >
              <option value="">Select Subcategory</option>
              {categoryOptions[formData.category.category].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        {/* Correct Answer */}
        <div style={{ marginBottom: "15px" }}>
          <label><strong>Correct Answer (a/b/c/d/e)</strong></label>
          <div style={{ marginTop: "5px" }}>
            {["a","b","c","d","e"].map((opt) => (
              <label key={opt} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="correctOption"
                  value={opt}
                  checked={formData.answer.correctOption === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label><strong>Description</strong></label>
          <input
            type="text"
            name="description"
            placeholder="Enter explanation for the correct answer"
            value={formData.answer.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", fontWeight: "bold" }}>
          ✅ Submit Question
        </button>
      </form>
    </div>
  );
}

export default QuestionSubmit;