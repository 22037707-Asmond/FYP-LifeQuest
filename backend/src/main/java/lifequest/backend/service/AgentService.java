package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Agent;
import lifequest.backend.repository.AgentRepository;

@Service
public class AgentService {
    @Autowired
    public AgentRepository agentRepository;

    public Agent addAgent(Agent agent) {
        return agentRepository.save(agent);
    }
}
