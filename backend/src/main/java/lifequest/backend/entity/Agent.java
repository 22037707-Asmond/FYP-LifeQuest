package lifequest.backend.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Agent extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int yearsOfExperience;
    private String bio;
    private String phoneNumber;
    private double salary;

    private String mr_ms;
    private String telephone;
    private String email;
    private String license;

    @ManyToMany(mappedBy = "agents")
    private List<Users> users;

    @OneToMany(mappedBy = "agent")
    @JsonManagedReference
    private List<Premium> premiums;

    @OneToMany(mappedBy = "agent")
    @JsonManagedReference
    private List<Request> requests;
}
