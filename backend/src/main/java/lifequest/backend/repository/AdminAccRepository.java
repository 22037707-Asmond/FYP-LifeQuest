package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lifequest.backend.entity.Admin;

public interface AdminAccRepository extends JpaRepository<Admin, Long>{
    public Admin findByUsername(String username);
}
