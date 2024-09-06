package fr.formation.poll_backend_webservice_springboot.controllers;

import java.util.Collection;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import fr.formation.poll_backend_webservice_springboot.dto.HasId;
import fr.formation.poll_backend_webservice_springboot.exceptions.BadRequestException;
import fr.formation.poll_backend_webservice_springboot.services.GenericService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GenericController<DTO extends HasId, SERVICE extends GenericService<?, DTO, ?, ?>> {
    
    protected final SERVICE service;

    @GetMapping
    public Collection<DTO> findAll() {
        return service.findAll();
    }

    @GetMapping("{id:\\d+}")
    public DTO findById(@PathVariable long id) {
        return service.findById(id);
    }

    @PostMapping
    public DTO save(@Valid @RequestBody DTO dto) {
        if (dto.getId() != 0)
            throw new BadRequestException("id must be null or zero");
        return service.save(dto);
    }

    @Transactional
    @PutMapping("{id:\\d+}")
    public void update(@PathVariable long id, @Valid @RequestBody DTO dto) {
        if (dto.getId() == 0)
            dto.setId(id);
        else if (dto.getId() != id)
            throw new BadRequestException("id in url and body must be the same");
        service.save(dto);
    }

    @DeleteMapping("{id:\\d+}")
    public void deleteById(@PathVariable long id) {
        service.deleteById(id);
    }

}
