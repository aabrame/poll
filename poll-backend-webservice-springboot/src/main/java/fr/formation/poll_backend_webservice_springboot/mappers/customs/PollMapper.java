package fr.formation.poll_backend_webservice_springboot.mappers.customs;

import org.springframework.stereotype.Component;

import fr.formation.poll_backend_webservice_springboot.dto.PollDto;
import fr.formation.poll_backend_webservice_springboot.mappers.GenericMapper;
import fr.formation.poll_backend_webservice_springboot.models.Poll;
import fr.formation.poll_backend_webservice_springboot.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PollMapper implements GenericMapper<Poll, PollDto> {

    private final UserRepository userRepository;
    private final OptionMapper optionMapper;
    
    public PollDto modelToDto(Poll poll) {
        return PollDto.builder()
            .id(poll.getId())
            .name(poll.getName())
            .creatorId(poll.getCreator() != null ? poll.getCreator().getId() : 0)
            .creatorName(poll.getCreator() != null ? poll.getCreator().getName() : null)
            .options(poll.getOptions().stream().map(optionMapper::modelToDto).toList())
            .build();
    }

    public Poll dtoToModel(PollDto dto) {
        return Poll.builder()
            .id(dto.getId())
            .name(dto.getName())
            .creator(userRepository.findById(dto.getCreatorId()).get())
            .options(dto.getOptions().stream().map(optionMapper::dtoToModel).toList())
            .build();
    }

}
