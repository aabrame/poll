package fr.formation.poll_backend_webapp_spring;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRegistration;

public class WebAppInitializer implements WebApplicationInitializer {
    
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		
		AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
		dispatcherContext.register(WebAppConfig.class);
		servletContext.addListener(new ContextLoaderListener(dispatcherContext));

		ServletRegistration.Dynamic appServlet = servletContext.addServlet("webapp", new DispatcherServlet(dispatcherContext));
		appServlet.setLoadOnStartup(1);
		appServlet.addMapping("/");
	}

}
