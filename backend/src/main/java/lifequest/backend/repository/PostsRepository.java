package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Articles;

public interface PostsRepository extends JpaRepository<Articles, Long>{
    
}
