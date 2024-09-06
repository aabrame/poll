package fr.formation.poll_backend_webservice_springboot.dto;

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
public class OptionDto implements HasId {
	
	@EqualsAndHashCode.Include
	private long id;
	
	private String name;
	
	private int votes;

}
