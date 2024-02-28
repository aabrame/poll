package fr.formation.pollbackend.controllers;

import java.security.Principal;
import java.util.Collection;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.pollbackend.exceptions.BadRequestException;
import fr.formation.pollbackend.exceptions.InternalErrorException;
import fr.formation.pollbackend.exceptions.NotFoundException;
import fr.formation.pollbackend.models.Poll;
import fr.formation.pollbackend.repositories.PollRepository;
import fr.formation.pollbackend.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("polls")
@RequiredArgsConstructor
public class PollController {
    
    private final PollRepository pollRepository;
    private final UserRepository userRepository;

    @GetMapping
	public Collection<Poll> findAll() {
		return pollRepository.findAll();
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
	
	@PreAuthorize("principal== #poll.creator.id")
	@PutMapping("{id:\\d+}")
	public Poll update(@PathVariable long id, @Valid @RequestBody @P("poll") Poll poll) {
		if (poll.getId() != id)
			throw new BadRequestException("ids in url and body do no match");
		if (poll.getId() == 0)
			throw new BadRequestException("id must not be zero");
        if (pollRepository.findById(poll.getId()).isEmpty())
			throw new NotFoundException("no entity with id " + poll.getId() + " exists");
		return pollRepository.save(poll);
	}
	
	// @PreAuthorize("principal == #m.creator.id")
	// @PreAuthorize("@userRepository.findById(#id).get().creator == principal.getUser()")
	@DeleteMapping("{id:\\d+}")
	public void deleteById(@PathVariable long id) {
		
		pollRepository.findById(id).ifPresentOrElse(
				this::delete, 
				() -> { throw new NotFoundException("no entity with id " + id + " exists"); }
		);
	}

	@PreAuthorize("principal == #poll.creator.id")
	private void delete(@P("poll") Poll poll) {
		pollRepository.delete(poll);
	}
}
