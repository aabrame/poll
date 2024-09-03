package fr.formation.poll_backend_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.formation.poll_backend_spring.models.Poll;
import fr.formation.poll_backend_spring.models.User;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long>{

}