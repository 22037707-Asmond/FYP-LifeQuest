package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Agent;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.service.AgentService;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/agents")
public class AgentController {
    @Autowired
    public AgentService agentService;

    @Autowired
    public AgentRepository agentRepository;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();   
    }

    // Build create agents REST API
    @PostMapping
    public Agent createAgent(@RequestBody Agent agent) {
        return agentRepository.save(agent);
    }
}

