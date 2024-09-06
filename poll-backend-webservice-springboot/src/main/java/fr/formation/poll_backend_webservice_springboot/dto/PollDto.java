package fr.formation.poll_backend_webservice_springboot.dto;

import java.util.ArrayList;
import java.util.List;
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
public class PollDto implements HasId {
	
	@EqualsAndHashCode.Include
	private long id;
	
	private String name;
	
	private long creatorId;

	private String creatorName;

	@Builder.Default
	private List<OptionDto> options = new ArrayList<>();

}
