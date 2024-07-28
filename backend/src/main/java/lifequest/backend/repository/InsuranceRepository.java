package lifequest.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Insurance;
import lifequest.backend.entity.Users;

public interface InsuranceRepository extends JpaRepository<Insurance, Long>{
        List<Insurance> findByUser(Users user);
}
