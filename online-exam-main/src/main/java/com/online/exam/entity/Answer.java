package com.online.exam.entity;

import javax.persistence.*;

@Entity
public class Answer {
    @Id
    private int andsweId;
    private String correctOption;
    @OneToOne
    @JoinColumn(name="option_id")
    private Option optionId;

    @Column(length=1000)
    private String description;
    public int getAndsweId() {
        return andsweId;
    }

    public void setAndsweId(int andsweId) {
        this.andsweId = andsweId;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }

    public Option getOptionId() {
        return optionId;
    }

    public void setOptionId(Option optionId) {
        this.optionId = optionId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
