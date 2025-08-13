try {
      const res = await fetch("http://localhost:8080/api/v1/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to submit question");

      alert("✅ Question submitted successfully!");

      // Reset form after successful submission
      setFormData({
        question: { question: "" , category: ""},
        option: { a: "", b: "", c: "", d: "", e: "" },
        answer: { correctOption: "", description: "" }
      });
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    }