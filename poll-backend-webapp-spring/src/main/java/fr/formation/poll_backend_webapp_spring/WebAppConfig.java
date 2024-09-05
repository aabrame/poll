package fr.formation.poll_backend_webapp_spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import fr.formation.poll_backend_spring.App;
import fr.formation.poll_backend_webapp_spring.security.SecurityConfig;

@Configuration
@EnableWebMvc
@ComponentScan
@Import({App.class, SecurityConfig.class})
public class WebAppConfig implements WebMvcConfigurer {

	@Bean
	public ViewResolver viewResolver() {
		var vr = new InternalResourceViewResolver();
		vr.setPrefix("/WEB-INF/jsp/pages/");
		vr.setSuffix(".jsp");
		return vr;
	}
	
	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
    }

}
