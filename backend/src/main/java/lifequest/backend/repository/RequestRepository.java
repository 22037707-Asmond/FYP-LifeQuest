package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
    
}
