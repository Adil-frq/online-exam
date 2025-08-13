package com.online.exam.repository;

import com.online.exam.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    void findAllByCategoryAndSubcategory(String category, String subcategory);
}
