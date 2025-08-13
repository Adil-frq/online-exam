package com.online.exam.controller;

import com.online.exam.dto.ExamRequest;
import com.online.exam.dto.ExamResponse;
import com.online.exam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/exam")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ExamController {
    @Autowired
    ExamService examService;
    @PostMapping
    public void saveQuestion(@RequestBody ExamRequest request){
        examService.saveQuestion(request);
        System.out.println(request.getAnswer().getDescription());

    }

    @GetMapping
    public List<ExamResponse> getAllQuestions(){
       return examService.getAllQuestions();
    }
    @PostMapping("/all")
    public void saveAll(@RequestBody List<ExamRequest> requests){
        examService.saveAll(requests);

    }

    @GetMapping("/{category}/{subCategory}")
    public List<ExamResponse> getQuestionByCategory(@PathVariable String category, @PathVariable String subCategory){
        return examService.getQuestionByCategory(category, subCategory);
    }

}


