package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Agent;
import lifequest.backend.service.AgentService;

@RestController
@RequestMapping("/api")
public class AgentController {
    @Autowired
    public AgentService agentService;

    @PostMapping("/agents/add")
    public ResponseEntity<Agent> addAgent(
            @RequestParam String username,
            @RequestParam String password,  // Assuming password is sent in the request
            @RequestParam String email,
            @RequestParam String role,
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam int yearsOfExperience,
            @RequestParam String bio) throws Exception {
    
        Agent agent = new Agent();
        agent.setUsername(username);
        agent.setPassword(password); // Hash password before saving
        agent.setEmail(email);
        agent.setRole(role);
        agent.setFirstName(firstName);
        agent.setLastName(lastName);
        agent.setYearsOfExperience(yearsOfExperience);
        agent.setBio(bio);

    return new ResponseEntity<>(agentService.addAgent(agent), HttpStatus.CREATED);

}


}
