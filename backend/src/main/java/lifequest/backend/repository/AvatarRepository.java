package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Avatar;

public interface AvatarRepository extends JpaRepository<Avatar, Long>{
    
}
