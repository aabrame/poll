package fr.formation.poll_backend_webapp_spring.controllers;

import java.util.stream.Collectors;

import org.hibernate.transform.ToListResultTransformer;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fr.formation.poll_backend_spring.models.User;
import fr.formation.poll_backend_spring.repositories.UserRepository;
import fr.formation.poll_backend_webapp_spring.security.MyUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	@GetMapping
	public String findAll(Model model, Authentication auth) {
		model.addAttribute("users", userRepository.findAll());
		System.out.println(auth != null ? ((MyUserDetails)auth.getPrincipal()).getUser() : "not connected");
		return "userList";
	}
	
	@GetMapping("{id}/delete")
	public String delete(@PathVariable("id") long id) {
		userRepository.deleteById(id);
		return "redirect:/users";
	}
	
	@GetMapping("{id:\\d+}")
	public String findById(@PathVariable("id") long id, Model model) {
		model.addAttribute("user", userRepository.findById(id).get());
		return "userDetails";
	}
	
	@GetMapping("add")
	public String save() {
		return "userAdd";
	}
	
	@PostMapping("add")
	public String save(@Valid @ModelAttribute User user, BindingResult result, Model model) {
		if (result.hasErrors()) {
			model.addAttribute("user", user);
			model.addAttribute("errors", result.getFieldErrors().stream()
				.collect(Collectors.groupingBy(
						e -> e.getField(),
						Collectors.mapping(e -> e.getDefaultMessage(), Collectors.toList())
						)));
			return "userAdd";
		} else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			return "redirect:/users";
		}
	}
	
}
