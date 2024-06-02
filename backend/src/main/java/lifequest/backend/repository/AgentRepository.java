package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent, Long>{
    
}
