package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.InsuranceType;

public interface InsuranceTypeRepository extends JpaRepository<InsuranceType, Long>{
    
}
