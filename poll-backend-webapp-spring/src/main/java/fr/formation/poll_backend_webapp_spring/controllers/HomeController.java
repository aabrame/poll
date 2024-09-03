package fr.formation.poll_backend_webapp_spring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("")
	public String home() {
		return "home";
	}
	
}
