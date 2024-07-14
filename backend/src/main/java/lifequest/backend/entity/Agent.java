package lifequest.backend.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
<<<<<<< HEAD
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String mr_ms;
    private String telephone;
    private String email;
    private double salary;
=======
public class Agent extends Account {
  
    private int yearsOfExperience;
    private String bio;
    private String phoneNumber;
    private int salary;
    private String about;

>>>>>>> 230de8b6c7ebd8763e5f83980caf410a2f8238f3

    // @ManyToMany(mappedBy = "agents")
    // private List<Users> users;

    // @OneToMany(mappedBy = "agent")
    // private List<Premium> premiums;

    // // Actions field - Not sure how you want to handle this, it could be methods or an additional field
    // // If it's just a string or JSON representation of actions, you could add it like this:
    // private String actions;

    // If Actions is a list of some kind of objects representing actions:
    // private List<Action> actions;
}
