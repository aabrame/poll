package fr.formation.poll_backend_webservice_springboot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fr.formation.poll_backend_webservice_springboot.repositories.UserRepository;

@SpringBootApplication
public class PollBackendWebserviceSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(PollBackendWebserviceSpringbootApplication.class, args);
	}

	// @Bean
	// public CommandLineRunner cli(UserRepository userRepository) {
	// 	return args -> {
	// 		userRepository.findAll().forEach(System.out::println);
	// 	};
	// }

}
