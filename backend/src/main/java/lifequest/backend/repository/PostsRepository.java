package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long>{
    
}
