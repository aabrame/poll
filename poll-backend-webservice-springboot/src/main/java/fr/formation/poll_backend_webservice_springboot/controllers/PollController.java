package fr.formation.poll_backend_webservice_springboot.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import fr.formation.poll_backend_webservice_springboot.dto.PollDto;
import fr.formation.poll_backend_webservice_springboot.services.PollService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("polls")
public class PollController extends GenericController<PollDto, PollService> {
    
    public PollController(PollService service) {
        super(service);
    }

    @Transactional
    @PutMapping("{idPoll:\\d+}/options/{idOption:\\d+}")
    public void vote(@PathVariable long idPoll, @PathVariable long idOption) {
        service.vote(idOption);
    }

}
