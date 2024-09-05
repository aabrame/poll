package fr.formation.poll_backend_webservice_springboot.controllers;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import fr.formation.poll_backend_webservice_springboot.models.User;
import fr.formation.poll_backend_webservice_springboot.repositories.UserRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("users")
public class UserController extends GenericController<User, UserRepository> {

    public UserController(UserRepository repository) {
        super(repository);
    }

    @Transactional
    @PatchMapping("{id:\\d+}")
    public void update(@PathVariable long id, @RequestBody Map<String, Object> values) {
        final User user = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        values.forEach((k,v) -> {
            try {
                final var attributeType = User.class.getDeclaredField(k).getType();
                final var setter = User.class.getMethod("set"+k.substring(0,1).toUpperCase() + k.substring(1), attributeType);
                setter.invoke(user, v);
            } catch (NoSuchMethodException | SecurityException | IllegalAccessException | InvocationTargetException | NoSuchFieldException e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid attribute " + k, e);
            }
        });
        if (user.getId() != id)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id in url and body must be the same");
    }
}
