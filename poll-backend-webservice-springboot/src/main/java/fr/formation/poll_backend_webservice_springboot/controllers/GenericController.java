package fr.formation.poll_backend_webservice_springboot.controllers;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import fr.formation.poll_backend_webservice_springboot.models.HasId;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GenericController<T extends HasId, R extends JpaRepository<T, Long>> {
    
    protected final R repository;

    @GetMapping
    public Collection<T> findAll() {
        return repository.findAll();
    }

    @GetMapping("{id:\\d+}")
    public T findById(@PathVariable long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public T save(@Valid @RequestBody T user) {
        if (user.getId() != 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id must be null or zero");
        return repository.save(user);
    }

    @Transactional
    @PutMapping("{id:\\d+}")
    public void update(@PathVariable long id, @Valid @RequestBody T user) {
        if (user.getId() == 0)
            user.setId(id);
        else if (user.getId() != id)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id in url and body must be the same");
        if (repository.findById(id).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        repository.save(user);
    }

    @DeleteMapping("{id:\\d+}")
    public void deleteById(@PathVariable long id) {
        final var user = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        repository.delete(user);
    }

}
