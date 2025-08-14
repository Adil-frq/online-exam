package com.online.exam.repository;

import com.online.exam.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    @Query(value = "SELECT * FROM category WHERE category = :category AND subcategory = :subcategory", nativeQuery = true)
    Category findByCategoryAndSubcategory(@Param("category") String category, @Param("subcategory") String subcategory);
}
