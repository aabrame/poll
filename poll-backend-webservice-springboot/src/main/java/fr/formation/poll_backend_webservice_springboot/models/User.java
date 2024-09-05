package fr.formation.poll_backend_webservice_springboot.models;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
public class User implements HasId {
	
	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue
	private long id;
	
	@NotBlank
	private String name;
	
	@Email
	private String email;
	
	@NotBlank
	@Length(min=8)
	private String password;
	
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy = "creator")
	@JsonIgnore
	private Set<Poll> polls = new HashSet<>();

}
