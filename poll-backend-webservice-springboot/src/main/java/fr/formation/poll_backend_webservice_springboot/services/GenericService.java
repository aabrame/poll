package fr.formation.poll_backend_webservice_springboot.services;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.poll_backend_webservice_springboot.dto.HasId;
import fr.formation.poll_backend_webservice_springboot.exceptions.NotFoundException;
import fr.formation.poll_backend_webservice_springboot.mappers.GenericMapper;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GenericService<MODEL, DTO extends HasId, REPOSITORY extends JpaRepository<MODEL, Long>, MAPPER extends GenericMapper<MODEL, DTO>> {
    
    protected final REPOSITORY repository;
    protected final MAPPER mapper;

    public Collection<DTO> findAll() {
        return repository.findAll().stream()
            .map(mapper::modelToDto)
            .toList();
    }

    public DTO findById(long id) {
        return repository.findById(id)
            .map(mapper::modelToDto)
            .orElseThrow(() -> new NotFoundException("no entity with id " + id + " exists"));
    }

    public DTO save(DTO dto) {
        return mapper.modelToDto(repository.save(mapper.dtoToModel(dto)));
    }

    public void update(DTO dto) {
        throwIfNotExist(dto.getId());
        repository.save(mapper.dtoToModel(dto));
    }

    public void deleteById(long id) {
        throwIfNotExist(id);
        repository.deleteById(id);
    }

    protected void throwIfNotExist(long id) {
        if (repository.findById(id).isEmpty())
            throw new NotFoundException("no entity with id " + id + " exists");
    }

}
