package fr.formation.pollbackend.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.pollbackend.exceptions.BadRequestException;
import fr.formation.pollbackend.exceptions.NotFoundException;
import fr.formation.pollbackend.models.Poll;
import fr.formation.pollbackend.repositories.PollRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("polls")
@RequiredArgsConstructor
public class PollController {
    
    private final PollRepository pollRepository;

    @GetMapping
	public Collection<Poll> findAll() {
		return pollRepository.findAll();
	}

	@GetMapping("{id:\\d+}")
	public Poll findById(@PathVariable long id) {
		
		return pollRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("no entity with id " + id + " exists"));
	}
	
	@PostMapping
	public Poll save(@Valid @RequestBody Poll m) {
		if (m.getId() != 0)
			throw new BadRequestException("a new entity cannot have a non-null id");
		return pollRepository.save(m);
	}
	
	@PutMapping("{id:\\d+}")
	public Poll update(@PathVariable long id, @Valid @RequestBody Poll m) {
		if (m.getId() != id)
			throw new BadRequestException("ids in url and body do no match");
        if (pollRepository.findById(m.getId()).isEmpty())
		    throw new NotFoundException("no entity with id " + m.getId() + " exists");
		return pollRepository.save(m);
	}
	
	@DeleteMapping("{id:\\d+}")
	public void delete(@PathVariable long id) {
		
		pollRepository.findById(id).ifPresentOrElse(
				pollRepository::delete, 
				() -> { throw new NotFoundException("no entity with id " + id + " exists"); }
		);
	}
}
