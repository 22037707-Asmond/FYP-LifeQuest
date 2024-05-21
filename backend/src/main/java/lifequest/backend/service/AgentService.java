package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Agent;
import lifequest.backend.repository.AgentRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AgentService {
    @Autowired
    public AgentRepository agentRepository;

    public void deleteAgent(Long id) {
        agentRepository.deleteById(id);
    }

    public void addAgent(Agent agent) {
        agentRepository.save(agent);
    }

    
}
