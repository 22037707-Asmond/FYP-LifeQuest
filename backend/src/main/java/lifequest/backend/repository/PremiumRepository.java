package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lifequest.backend.entity.Premium;

@Repository
public interface PremiumRepository extends JpaRepository<Premium, Long>{

}
