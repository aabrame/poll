package fr.formation.poll_backend_spring.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
public class Poll {
	
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	@ManyToOne
	private User creator;
	
	@Builder.Default
	@OneToMany
	private Set<Option> options = new HashSet<>();

}
