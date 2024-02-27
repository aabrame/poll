package fr.formation.pollbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.formation.pollbackend.models.Poll;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    
}
