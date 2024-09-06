package fr.formation.poll_backend_webservice_springboot.mappers;

import fr.formation.poll_backend_webservice_springboot.dto.HasId;

public interface GenericMapper<MODEL, DTO extends HasId> {
    DTO modelToDto(MODEL m);
    MODEL dtoToModel(DTO d);
}
