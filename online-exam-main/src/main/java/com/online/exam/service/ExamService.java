package com.online.exam.service;

import com.online.exam.dto.ExamRequest;
import com.online.exam.dto.ExamResponse;
import com.online.exam.entity.Answer;
import com.online.exam.entity.Category;
import com.online.exam.entity.Option;
import com.online.exam.entity.Question;
import com.online.exam.repository.AnswerRepository;
import com.online.exam.repository.CategoryRepository;
import com.online.exam.repository.OptionRepository;
import com.online.exam.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamService {
   @Autowired
    QuestionRepository questionRepository;
    @Autowired
    OptionRepository optionRepository;
    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Transactional
    public void saveQuestion(ExamRequest examRequest){
        Question question = examRequest.getQuestion();
        Option option = examRequest.getOption();
        Answer answer = examRequest.getAnswer();
        Category category = examRequest.getCategory();
       // Category savedCategory = null;

        Category savedCategory = categoryRepository.findByCategoryAndSubcategory(category.getCategory(), category.getSubcategory());

        if(savedCategory == null) {
            savedCategory = categoryRepository.save(category);
        }
        if(savedCategory != null){
            category.setCategoryId(savedCategory.getCategoryId());
        }
        //question.setCategory(categoryId);
       question.setCategory(savedCategory);
        Question savedQuestion = questionRepository.save(question);
        option.setOptionId(savedQuestion.getQuestionId());
        option.setQuestionId(savedQuestion);
        Option savedOption = optionRepository.save(option);


        answer.setOptionId(savedOption);
        answer.setAndsweId(option.getOptionId());
        answerRepository.save(answer);
    }

    public List<ExamResponse> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();

        return questions.stream().map(question -> {
            Option option = optionRepository.findByQuestionId(question.getQuestionId());
            Answer answer = answerRepository.findByOptionId(option.getOptionId());
            Optional<Category> category = categoryRepository.findById(question.getCategory().getCategoryId());

            ExamResponse response = new ExamResponse();
            response.setQuestion(question);
            response.setOption(option);
            response.setAnswer(answer);
            response.setCategory(category.get());
            return response;
        }).collect(Collectors.toList());
    }

    public void saveAll(List<ExamRequest> requests) {
         System.out.println(requests);
         List<Question> questions  = requests.stream()
                                              .map(question->question.getQuestion())
                                               .collect(Collectors.toList());


         List<Option> options = requests.stream()
                                        .map(option->option.getOption())
                                        .collect(Collectors.toList());

         List<Answer> answers = requests.stream()
                         .map(answer-> answer.getAnswer())
                                 .collect(Collectors.toList());

        questionRepository.saveAll(questions);
        optionRepository.saveAll(options);
        answerRepository.saveAll(answers);
    }

    public List<ExamResponse> getQuestionByCategory(String category, String subcategory) {
        return null;
    }
}

