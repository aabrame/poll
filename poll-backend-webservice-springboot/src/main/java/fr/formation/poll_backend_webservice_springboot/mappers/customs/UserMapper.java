package fr.formation.poll_backend_webservice_springboot.mappers.customs;

import org.springframework.stereotype.Component;

import fr.formation.poll_backend_webservice_springboot.dto.UserDto;
import fr.formation.poll_backend_webservice_springboot.mappers.GenericMapper;
import fr.formation.poll_backend_webservice_springboot.models.User;

@Component
public class UserMapper implements GenericMapper<User, UserDto> {
    
    public UserDto modelToDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .password(user.getPassword())
            .pollsNumber(user.getPolls().size())
            .build();
    }

    public User dtoToModel(UserDto dto) {
        return User.builder()
            .id(dto.getId())
            .name(dto.getName())
            .email(dto.getEmail())
            .password(dto.getPassword())
            .build();
    }

}
