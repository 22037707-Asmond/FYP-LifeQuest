package lifequest.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Clients {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int companyCode;
    private String name;
    private boolean status;
    private String email;
    private String phone;
    private String address;
    private String city;

}
