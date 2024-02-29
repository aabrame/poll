package fr.formation.pollbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InternalErrorException extends ResponseStatusException {

    public InternalErrorException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    public InternalErrorException(String reason) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason);
    }
    public InternalErrorException(String reason, Throwable cause) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason, cause);
    }
    
}
