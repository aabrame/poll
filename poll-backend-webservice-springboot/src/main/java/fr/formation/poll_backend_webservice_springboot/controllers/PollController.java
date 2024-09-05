package fr.formation.poll_backend_webservice_springboot.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import fr.formation.poll_backend_webservice_springboot.models.Poll;
import fr.formation.poll_backend_webservice_springboot.repositories.OptionRepository;
import fr.formation.poll_backend_webservice_springboot.repositories.PollRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("polls")
public class PollController extends GenericController<Poll, PollRepository> {

    private final OptionRepository optionRepository;
    
    public PollController(PollRepository repository, OptionRepository optionRepository) {
        super(repository);
        this.optionRepository = optionRepository;
    }

    @Transactional
    @PutMapping("{id:\\d+}")
    @Override
    public void update(@PathVariable long id, @Valid @RequestBody Poll poll) {
        super.update(id, poll);
        final var oldPoll = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        oldPoll.getOptions().stream()
            .filter(o -> !poll.getOptions().contains(o))
            .forEach(optionRepository::delete);
    }


    @Transactional
    @PutMapping("{idPoll:\\d+}/options/{idOption:\\d+}")
    public void vote(@PathVariable long idPoll, @PathVariable long idOption) {
        optionRepository.findById(idOption).ifPresentOrElse(
            o -> o.setVotes(o.getVotes()+1),
            () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND); });
        // autre syntaxe :
        // final var optional = optionRepository.findById(idOption);
        // if (optional.isPresent()) {
        //     final var option = optional.get();
        //     option.setVotes(option.getVotes()+1);
        // } else {
        //     throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        // }
    }

}
