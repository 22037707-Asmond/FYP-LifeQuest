package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Premium;

public interface PremiumRepository extends JpaRepository<Premium, Long>{
    
}
