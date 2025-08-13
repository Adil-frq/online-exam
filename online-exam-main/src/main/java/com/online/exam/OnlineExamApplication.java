package com.online.exam;

import com.online.exam.entity.Question;
import com.online.exam.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineExamApplication {
    @Autowired
	public static void main(String[] args) {
		SpringApplication.run(OnlineExamApplication.class, args);

	}

}
