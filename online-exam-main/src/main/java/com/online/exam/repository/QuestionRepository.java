package com.online.exam.repository;

import com.online.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Integer> {
    @Query(value = "SELECT * FROM question WHERE category_id = :categoryId", nativeQuery = true)
    List<Question> findByCategoryId(@Param("categoryId") int categoryId);
}
