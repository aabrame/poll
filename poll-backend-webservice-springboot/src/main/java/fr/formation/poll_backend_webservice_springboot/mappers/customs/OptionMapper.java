package fr.formation.poll_backend_webservice_springboot.mappers.customs;

import org.springframework.stereotype.Component;

import fr.formation.poll_backend_webservice_springboot.dto.OptionDto;
import fr.formation.poll_backend_webservice_springboot.mappers.GenericMapper;
import fr.formation.poll_backend_webservice_springboot.models.Option;

@Component
public class OptionMapper implements GenericMapper<Option, OptionDto> {
    
    public OptionDto modelToDto(Option option) {
        return OptionDto.builder()
            .id(option.getId())
            .name(option.getName())
            .votes(option.getVotes())
            .build();
    }

    public Option dtoToModel(OptionDto dto) {
        return Option.builder()
            .id(dto.getId())
            .name(dto.getName())
            .votes(dto.getVotes())
            .build();
    }

}
