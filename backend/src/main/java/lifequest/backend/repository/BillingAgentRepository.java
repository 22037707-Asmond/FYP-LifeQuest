package lifequest.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lifequest.backend.entity.BillingAgents;

@Repository
public interface BillingAgentRepository extends JpaRepository<BillingAgents, Long> {
    
}
