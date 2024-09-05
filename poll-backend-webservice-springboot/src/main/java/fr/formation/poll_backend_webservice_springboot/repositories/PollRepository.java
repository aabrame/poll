package fr.formation.poll_backend_webservice_springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.formation.poll_backend_webservice_springboot.models.Poll;


@Repository
public interface PollRepository extends JpaRepository<Poll, Long>{

}
