package lifequest.backend.entity;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Agent extends Account {
  
    private int yearsOfExperience;
    private String bio;
    private String phoneNumber;
    private int salary;
    private String about;


    @ManyToMany(mappedBy = "agents")
    private List<Users> users;

    @OneToMany(mappedBy = "agent")
    private List<Premium> premiums;

    

}

