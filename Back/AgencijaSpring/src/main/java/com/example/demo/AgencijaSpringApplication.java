package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("model")
@EnableJpaRepositories(basePackages = {"repository"})
@ComponentScan(basePackages = {"controller"})
@ComponentScan(basePackages = {"corsConfig"})
public class AgencijaSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgencijaSpringApplication.class, args);
	}

}
