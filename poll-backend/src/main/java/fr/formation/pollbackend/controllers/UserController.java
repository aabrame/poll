package fr.formation.pollbackend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import fr.formation.pollbackend.models.User;
import fr.formation.pollbackend.repositories.UserRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @GetMapping()
    List<User> findAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    User findById(@PathVariable long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "no user with id " + id + " exist"));
    }

    @PostMapping()
    User save(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return user;
    }

    @PutMapping("{id}")
    void update(@PathVariable long id, @RequestBody User user) {
        user.setId(id);
        if (userRepository.findById(id).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no user with id " + id + " exist");
        userRepository.save(user);
    }

	@PreAuthorize("isAuthenticated()")
    @DeleteMapping("{id}")
    void deleteBy(@PathVariable long id) {
        userRepository.findById(id).ifPresentOrElse(
            user -> userRepository.deleteById(id),
            () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no user with id " + id + " exist"); }
        );
    }
}
