package fr.formation.poll_backend_webservice_springboot.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import fr.formation.poll_backend_webservice_springboot.dto.PollDto;
import fr.formation.poll_backend_webservice_springboot.exceptions.NotFoundException;
import fr.formation.poll_backend_webservice_springboot.mappers.customs.PollMapper;
import fr.formation.poll_backend_webservice_springboot.models.Poll;
import fr.formation.poll_backend_webservice_springboot.repositories.OptionRepository;
import fr.formation.poll_backend_webservice_springboot.repositories.PollRepository;
import jakarta.transaction.Transactional;

@Service
public class PollService extends GenericService<Poll, PollDto, PollRepository, PollMapper> {

    private final OptionRepository optionRepository;

    public PollService(PollRepository repository, PollMapper mapper, OptionRepository optionRepository) {
        super(repository, mapper);
        this.optionRepository = optionRepository;
    }

    @Override
    @Transactional
    public void update(PollDto dto) {
        super.update(dto);
        final var oldPoll = repository.findById(dto.getId())
            .orElseThrow(() -> new NotFoundException());
        oldPoll.getOptions().stream()
            .filter(option -> dto.getOptions().stream().noneMatch(other -> option.getId() == other.getId()))
            .forEach(optionRepository::delete);
    }

    @Transactional
    public void vote(long idOption) {
        optionRepository.findById(idOption).ifPresentOrElse(
            o -> o.setVotes(o.getVotes()+1),
            () -> { throw new NotFoundException(); });
    }
}
