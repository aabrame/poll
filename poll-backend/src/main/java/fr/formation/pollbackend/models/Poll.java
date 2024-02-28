package fr.formation.pollbackend.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Poll {
    
    @Id
    @GeneratedValue
    private long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>();
    
    @ManyToOne
    private User creator;
}
