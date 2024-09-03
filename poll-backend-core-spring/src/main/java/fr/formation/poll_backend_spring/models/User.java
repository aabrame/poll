package fr.formation.poll_backend_spring.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@Entity
public class User {
	
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private String email;
	
	private String password;
	
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy = "creator")
	private Set<Poll> polls = new HashSet<>();

}
