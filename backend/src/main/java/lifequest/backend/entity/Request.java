package lifequest.backend.entity;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users user;

    @Lob
    private Blob documents; 

    @Enumerated(EnumType.STRING)
    private RequestEnum status;

    private String insurance;

    @OneToOne
    private Insurance insuranceObj;

    public void setInsuranceObj(Insurance insuranceObj) {
        this.insuranceObj = insuranceObj;
        if (insuranceObj != null) {
            this.insurance = insuranceObj.getName();
        }
    }

}
