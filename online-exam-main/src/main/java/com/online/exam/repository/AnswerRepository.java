package com.online.exam.repository;

import com.online.exam.entity.Answer;
import com.online.exam.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {


    @Query(value = "SELECT * FROM answer WHERE option_id = :optionId", nativeQuery = true)
    Answer findByOptionId(@Param("optionId") int optionId);
}
