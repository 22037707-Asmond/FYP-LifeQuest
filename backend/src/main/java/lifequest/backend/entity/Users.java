package lifequest.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@PrimaryKeyJoinColumn(name = "id")
public class Users extends Account {

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
    private List<Payment> payments;

    @OneToMany(mappedBy = "user")
    private List<Billing> billings;

    // avr edit
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Insurance> insurances;

}
