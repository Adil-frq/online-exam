import { useState } from "react";

function CategoryDropdown() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const categories = [
    {
      name: "Physics",
      color: "#d32f2f",
      subcategories: ["Mechanics", "Optics", "Thermodynamics"]
    },
    {
      name: "Chemistry",
      color: "#388e3c",
      subcategories: ["Organic", "Inorganic", "Physical"]
    },
    {
      name: "Biology",
      color: "#1976d2",
      subcategories: ["Botany", "Zoology", "Genetics"]
    },
    {
      name: "Math",
      color: "#f57c00",
      subcategories: ["Algebra", "Geometry", "Calculus"]
    },
    {
      name: "STET",
      color: "#7b1fa2",
      subcategories: [
        {
          name: "Year",
          items: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
        },
        {
          name: "Special",
          items: ["TRE", "Mock Test", "Syllabus"]
        }
      ]
    }
  ];

  const handleCategoryClick = (name) => {
    setOpenCategory(openCategory === name ? null : name);
    setOpenSubcategory(null);
    setQuestions([]);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSubmittedAnswers({});
    setScore(0);
    setShowResult(false);
  };

  const handleSubcategoryClick = (name) => {
    setOpenSubcategory(openSubcategory === name ? null : name);
    setQuestions([]);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSubmittedAnswers({});
    setScore(0);
    setShowResult(false);
  };

  const fetchQuestions = async (category, subcategory) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/exam/${category}/${subcategory}`);
      const data = await response.json();
      setQuestions(data);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setSubmittedAnswers({});
      setScore(0);
      setShowResult(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📂 Choose a Category</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        {categories.map((cat) => (
          <div key={cat.name}>
            <div
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                padding: "15px",
                background: "#f0f0f0",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                color: cat.color,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              {cat.name}
            </div>

            {openCategory === cat.name && (
              <div style={{ marginLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.name === "STET" ? (
                  cat.subcategories.map((group) => (
                    <div key={group.name}>
                      <div
                        onClick={() => handleSubcategoryClick(group.name)}
                        style={{
                          padding: "10px",
                          background: "#e1bee7",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          color: "#4a148c"
                        }}
                      >
                        {group.name}
                      </div>
                      {openSubcategory === group.name && (
                        <div style={{ marginLeft: "20px", marginTop: "5px", display: "flex", flexDirection: "column", gap: "5px" }}>
                          {group.items.map((item) => (
                            <div
                              key={item}
                              onClick={() => fetchQuestions("STET", item)}
                              style={{
                                padding: "8px",
                                background: "#f3e5f5",
                                borderRadius: "4px",
                                cursor: "pointer",
                                color: "#6a1b9a"
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  cat.subcategories.map((sub) => (
                    <div
                      key={sub}
                      onClick={() => fetchQuestions(cat.name, sub)}
                      style={{
                        padding: "10px",
                        background: "#e0f2f1",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: cat.color
                      }}
                    >
                      {sub}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Online Quiz Logic */}
      {questions.length > 0 && !showResult && (
        <div style={{ marginTop: "30px" }}>
          <h3>📝 Question {currentQuestionIndex + 1} of {questions.length}</h3>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            {questions[currentQuestionIndex].question.question}
          </div>

          {["a", "b", "c", "d", "e"].map((optKey) => {
            const userAnswer = userAnswers[currentQuestionIndex];
            const correctOption = questions[currentQuestionIndex].answer.correctOption;
            const isSubmitted = submittedAnswers[currentQuestionIndex];

            let background = "#f0f0f0";
            if (isSubmitted) {
              if (userAnswer === optKey && optKey === correctOption) background = "#c8e6c9"; // green
              else if (userAnswer === optKey && optKey !== correctOption) background = "#ffcdd2"; // red
              else if (optKey === correctOption) background = "#c8e6c9"; // show correct
            }

            return (
              <label
                key={optKey}
                style={{
                  display: "block",
                  padding: "10px",
                  marginBottom: "8px",
                  background,
                  borderRadius: "6px",
                  border: userAnswer === optKey ? "2px solid #1976d2" : "1px solid #ccc",
                  cursor: isSubmitted ? "default" : "pointer"
                }}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={optKey}
                  disabled={isSubmitted}
                  checked={userAnswer === optKey}
                  onChange={() =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [currentQuestionIndex]: optKey
                    }))
                  }
                />{" "}
                {questions[currentQuestionIndex].option[optKey]}
              </label>
            );
          })}

          {!submittedAnswers[currentQuestionIndex] ? (
            <button
              onClick={() => {
                const current = questions[currentQuestionIndex];
                const correct = current.answer.correctOption;
                const userAnswer = userAnswers[currentQuestionIndex];
                if (!userAnswer) return;

                setSubmittedAnswers((prev) => ({
                  ...prev,
                  [currentQuestionIndex]: true
                }));

                if (userAnswer === correct) {
                  setScore((prev) => prev + 1);
                }
              }}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Submit Answer
            </button>
          ) : (
            <div style={{ marginTop: "10px" }}>
              <strong>Description:</strong> {questions[currentQuestionIndex].answer.description}
            </div>
          )}

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentQuestionIndex === 0}
              style={{ padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}
            >
              ⬅ Previous
            </button>

            <button
              onClick={() => {
                if (currentQuestionIndex === questions.length - 1) {
                  setShowResult(true);
                } else {
                  setCurrentQuestionIndex((prev) => prev + 1);
                }
              }}
              disabled={!submittedAnswers[currentQuestionIndex]}
              style={{ padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next ➡"}
            </button>
          </div>
        </div>
      )}

      {/* ✅ Final Result */}
      {showResult && (
        <div style={{ marginTop: "30px" }}>
          <h2>🎉 Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button
            onClick={() => {
              setQuestions([]);
              setUserAnswers({});
              setCurrentQuestionIndex(0);
              setSubmittedAnswers({});
              setScore(0);
              setShowResult(false);
            }}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#388e3c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;
