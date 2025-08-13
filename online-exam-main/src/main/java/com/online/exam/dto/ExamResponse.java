package com.online.exam.dto;

import com.online.exam.entity.Answer;
import com.online.exam.entity.Option;
import com.online.exam.entity.Question;

public class ExamResponse {

    private Question question;
    private Option option;
    private Answer answer;

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
}
