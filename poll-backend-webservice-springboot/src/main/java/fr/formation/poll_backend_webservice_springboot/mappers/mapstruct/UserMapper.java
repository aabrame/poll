package fr.formation.poll_backend_webservice_springboot.mappers.mapstruct;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import fr.formation.poll_backend_webservice_springboot.dto.UserDto;
import fr.formation.poll_backend_webservice_springboot.mappers.GenericMapper;
import fr.formation.poll_backend_webservice_springboot.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper extends GenericMapper<User, UserDto> {

    UserDto modelToDto(User m);

    User dtoToModel(UserDto d);

    @AfterMapping
    default void computePollsNumber(User user, @MappingTarget UserDto dto) {
        dto.setPollsNumber(user.getPolls().size());
    }

}
