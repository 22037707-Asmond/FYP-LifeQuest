package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Agent;
import lifequest.backend.service.AgentService;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class AgentController {
    
    @Autowired
    public AgentService agentService;

    @PostMapping("/agents/add")
    public ResponseEntity<Agent> addAgent(@RequestBody Agent agent) {
        return new ResponseEntity<>(agentService.addAgent(agent), HttpStatus.CREATED);
    }

}
