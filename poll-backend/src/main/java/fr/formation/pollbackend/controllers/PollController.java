package fr.formation.pollbackend.controllers;

import java.security.Principal;
import java.util.Collection;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.pollbackend.exceptions.BadRequestException;
import fr.formation.pollbackend.exceptions.InternalErrorException;
import fr.formation.pollbackend.exceptions.NotFoundException;
import fr.formation.pollbackend.models.Poll;
import fr.formation.pollbackend.repositories.PollRepository;
import fr.formation.pollbackend.repositories.UserRepository;
import fr.formation.pollbackend.services.PollService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("polls")
@RequiredArgsConstructor
public class PollController {
    
    private final PollRepository pollRepository;
	private final PollService pollService;
    private final UserRepository userRepository;

    @GetMapping
	public Collection<Poll> findAll(@RequestParam(required = false) String q) {
		return q == null || q.isBlank()
			? pollRepository.findAll()
			: pollRepository.findByNameContaining(q);
	}

	@GetMapping("{id:\\d+}")
	public Poll findById(@PathVariable long id) {
		return pollRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("no entity with id " + id + " exists"));
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping
	public Poll save(@Valid @RequestBody Poll m, Principal principal) {
		if (m.getId() != 0)
			throw new BadRequestException("a new entity cannot have a non-null id");
		m.setCreator(userRepository
			.findById(Long.parseLong(principal.getName()))
			.orElseThrow(() -> new InternalErrorException("connected user not found in db " + principal.getName())));
		return pollRepository.save(m);
	}
	
	@PutMapping("{id:\\d+}")
	public Poll update(@PathVariable long id, @Valid @RequestBody Poll poll) {
		if (poll.getId() != id)
			throw new BadRequestException("ids in url and body do no match");
		if (poll.getId() == 0)
			throw new BadRequestException("id must not be zero");
        var old = pollRepository.findById(poll.getId()).orElseThrow(
			() -> { throw new NotFoundException("no entity with id " + poll.getId() + " exists"); });
		return pollService.update(poll, old);
	}
	
	@DeleteMapping("{id:\\d+}")
	public void deleteById(@PathVariable long id, Principal principal, Authentication authentication) {
		pollRepository.findById(id).ifPresentOrElse(
				pollService::delete, 
				() -> { throw new NotFoundException("no entity with id " + id + " exists"); });
	}
}
