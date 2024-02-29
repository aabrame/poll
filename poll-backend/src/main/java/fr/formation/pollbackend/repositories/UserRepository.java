package fr.formation.pollbackend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.formation.pollbackend.models.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    @Query("from User u where u.name like %?1% or u.email like %?1%")
    List<User> findByNameOrEmailLike(String query);
}
