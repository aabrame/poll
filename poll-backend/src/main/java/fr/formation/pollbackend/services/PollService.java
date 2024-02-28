package fr.formation.pollbackend.services;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import fr.formation.pollbackend.models.Poll;
import fr.formation.pollbackend.repositories.PollRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PollService {
    
    private final PollRepository pollRepository;

	@PreAuthorize("isAuthenticated() && new Integer(principal.claims['sub']) == #poll.creator.id")
	public Poll update(Poll newPoll, @P("poll") Poll oldPoll) {
		return pollRepository.save(newPoll);
	}

	@PreAuthorize("isAuthenticated() && new Integer(principal.claims['sub']) == #poll.creator.id")
	public void delete(@P("poll") Poll poll) {
		pollRepository.delete(poll);
	}
}
