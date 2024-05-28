package lifequest.backend.entity;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
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
    private String firstName;
    private String lastName;
    private byte[] profilePicture;
    private int yearsOfExperience;
    private String bio;

    @ManyToMany(mappedBy = "agents")
    private List<Users> users;

}

