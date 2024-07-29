package lifequest.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Premium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private String purchaseDate; 
    
    @ManyToOne
    private Users user; 

    @ManyToOne
    private Insurance insurance; 

    @ManyToOne
    private Agent agent;
    
    private boolean active; // true => yes, false => no

    
    public void setPurchaseDateToCurrentDate() {
        this.purchaseDate = LocalDate.now().toString();
    }
}

