package fr.formation.poll_backend_webservice_springboot.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
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
    public PollDto save(PollDto dto) {
        final var id = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        dto.setCreatorId(id);
        return super.save(dto);
    }

    @Override
    @Transactional
    public void update(PollDto dto) {
        super.update(dto);
        final var oldPoll = repository.findById(dto.getId())
            .orElseThrow(NotFoundException::new);
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
