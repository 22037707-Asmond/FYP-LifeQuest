package lifequest.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

    @Lob
    @Column(length = 65535)
    public String about;
    public String license;



   

    @OneToMany(mappedBy = "agent")
    @JsonManagedReference
    private List<CalendarEvent> events;

    @OneToMany(mappedBy = "agent")
    private List<BillingAgents> billingAgents;

    // // Actions field - Not sure how you want to handle this, it could be methods
    // or an additional field
    // // If it's just a string or JSON representation of actions, you could add it
    // like this:
    // private String actions;

    // If Actions is a list of some kind of objects representing actions:
    // private List<Action> actions;
}
