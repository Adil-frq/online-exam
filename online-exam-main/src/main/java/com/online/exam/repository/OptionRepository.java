package com.online.exam.repository;

import com.online.exam.entity.Option;
import com.online.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OptionRepository extends JpaRepository<Option,Integer> {
    @Query(value = "SELECT * FROM option_tbl WHERE question_id = :questionId", nativeQuery = true)
    Option findByQuestionId(@Param("questionId") int questionId);
}
