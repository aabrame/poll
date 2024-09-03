package fr.formation.poll_backend_spring;

import java.io.IOException;
import java.util.Properties;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import fr.formation.poll_backend_spring.models.User;
import fr.formation.poll_backend_spring.repositories.UserRepository;

@Configuration
@ComponentScan
public class App {
	
	public static void main(String[] args) {
		try (var context = new AnnotationConfigApplicationContext(App.class)) {
			var userRepository = context.getBean(UserRepository.class);
			userRepository.save(User.builder()
					.name("andre")
					.email("a@a.a")
					.password("secret")
					.build());
		}
	}
	

	@Bean("userProperties")
	public Properties getProperties() throws IOException {
		Properties p = new Properties();
		p.load(App.class.getClassLoader().getResourceAsStream("application.properties"));
		return p;
	}
}
