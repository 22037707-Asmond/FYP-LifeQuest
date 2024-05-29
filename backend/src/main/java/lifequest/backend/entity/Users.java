package lifequest.backend.entity;


import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Blob;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name="id")
public class Users extends Account{

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private Blob profilePicture;

    @ManyToMany
    private List<Agent> agents;


    
}
