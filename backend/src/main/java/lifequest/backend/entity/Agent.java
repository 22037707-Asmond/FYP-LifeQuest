package lifequest.backend.entity;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
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
