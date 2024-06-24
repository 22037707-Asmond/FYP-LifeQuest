package lifequest.backend.entity;


import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name="id")
public class Users extends Account{


    @ManyToMany
    private List<Agent> agents;
    
    private String ic;
    private String dateOfBirth;
    private boolean smoker;
    private int children;
    private char sex;

    @OneToMany(mappedBy = "user")
    private List<Premium> premiums;

    @OneToMany(mappedBy = "user")
    private List<Request> requests;

    
}
