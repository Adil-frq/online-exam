import { useEffect, useState } from "react";
import QuestionList from "../data/QuestionList";
import "../styles/quiz.css";

function QuestionViewer() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/exam")
      .then((res) => res.json())
      .then((data) => {
        const validQuestions = data.filter(q =>
          q?.question?.question &&
          q?.answer?.correctOption &&
          typeof q.answer.correctOption === "string" &&
          q?.option?.[q.answer.correctOption.toLowerCase()]
        );
        const shuffled = [...validQuestions].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      })
      .catch(() => {
        const shuffled = [...QuestionList].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      });
  }, []);

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentIndex];
  const correctOptionKey = currentQuestion?.answer?.correctOption?.toLowerCase?.();
  const correctOptionText = correctOptionKey ? currentQuestion.option?.[correctOptionKey] : null;
  const description =
    currentQuestion?.answer?.description?.trim() ||
    currentQuestion?.answer?.optionId?.description?.trim() || "";

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedOption || !correctOptionKey) return;
    const isAnswerCorrect = selectedOption.toLowerCase() === correctOptionKey;
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: selectedOption,
        correct: correctOptionKey,
        isCorrect: isAnswerCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      const nextAnswer = submittedAnswers[currentIndex + 1];
      setSelectedOption(nextAnswer?.selected || "");
      setShowAnswer(!!nextAnswer);
      setIsCorrect(nextAnswer?.isCorrect ?? null);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption("");
      setShowAnswer(false);
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevAnswer = submittedAnswers[currentIndex - 1];
      setSelectedOption(prevAnswer?.selected || "");
      setShowAnswer(!!prevAnswer);
      setIsCorrect(prevAnswer?.isCorrect ?? null);
    }
  };

  const totalQuestions = questions.length;
  const correctCount = Object.values(submittedAnswers).filter((ans) => ans.isCorrect).length;
  const incorrectCount = Object.keys(submittedAnswers).length - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  if (currentIndex >= questions.length) {
    return (
      <div className="quiz-container">
        <h2>🎉 You've completed all questions!</h2>
        <p><strong>Total Questions:</strong> {totalQuestions}</p>
        <p><strong>Correct Answers:</strong> ✅ {correctCount}</p>
        <p><strong>Incorrect Answers:</strong> ❌ {incorrectCount}</p>
        <p><strong>Score:</strong> {scorePercent}%</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h3>Question {currentIndex + 1} of {questions.length}</h3>
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>{currentQuestion.question.question}</p>

      {["a", "b", "c", "d", "e"].map((key) => {
        const optionText = currentQuestion.option[key];
        if (!optionText) return null;

        const isSelected = selectedOption === key;
        const isSubmitted = showAnswer;
        const isCorrectOption = correctOptionKey === key;
        const isUserCorrect = isSelected && isCorrect;
        const isUserIncorrect = isSelected && !isCorrect;

        let className = "option-label";
        if (isSubmitted) {
          if (isUserCorrect) className += " correct";
          else if (isUserIncorrect) className += " incorrect";
          else if (isCorrectOption) className += " reveal";
        }

        return (
          <label key={key} className={className}>
            <input
              type="radio"
              name="option"
              value={key}
              checked={selectedOption === key}
              onChange={handleOptionChange}
              disabled={isSubmitted}
            />
            <strong>{key.toUpperCase()}:</strong> {optionText}
          </label>
        );
      })}

      {!showAnswer && (
        <button onClick={handleSubmit} disabled={!selectedOption}>
          Submit Answer
        </button>
      )}

      {showAnswer && correctOptionText && (
        <div style={{ marginTop: "15px" }}>
          <p>
            {isCorrect ? (
              <>✅ Correct! The answer is <strong>{correctOptionKey.toUpperCase()}: {correctOptionText}</strong></>
            ) : (
              <>❌ Incorrect. The correct answer is <strong>{correctOptionKey.toUpperCase()}: {correctOptionText}</strong></>
            )}
          </p>

          {description && (
            <div style={{
              marginTop: "10px",
              backgroundColor: "#333",
              color: "#fff",
              padding: "15px",
              borderRadius: "5px",
              fontStyle: "italic"
            }}>
              📝 <strong>Explanation:</strong> {description}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer"
          }}
        >
          ⏮️ Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {currentIndex === questions.length - 1 ? "🎉 Finish Quiz" : "⏭️ Next"}
        </button>
      </div>
    </div>
  );
}

export default QuestionViewer;