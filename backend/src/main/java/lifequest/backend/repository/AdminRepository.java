package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Admin;
 
public interface AdminRepository extends JpaRepository<Admin, Long>{
    
}
