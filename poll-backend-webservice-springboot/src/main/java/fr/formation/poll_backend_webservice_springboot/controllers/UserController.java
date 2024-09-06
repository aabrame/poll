package fr.formation.poll_backend_webservice_springboot.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import fr.formation.poll_backend_webservice_springboot.dto.UserDto;
import fr.formation.poll_backend_webservice_springboot.exceptions.BadRequestException;
import fr.formation.poll_backend_webservice_springboot.services.UserService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("users")
public class UserController extends GenericController<UserDto, UserService> {

    public UserController(UserService service) {
        super(service);
    }

    @Transactional
    @PatchMapping("{id:\\d+}")
    public void update(@PathVariable long id, @RequestBody Map<String, Object> values) {
        if (values.containsKey("id") && !values.get("id").equals(id))
            throw new BadRequestException("id in url and body must be the same");
        service.patch(id, values);
    }
}
