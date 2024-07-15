package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Agent;
import lifequest.backend.exception.ResourceNotFoundException;
import lifequest.backend.repository.AgentRepository;


@RestController
@RequestMapping("/api")
public class AgentController {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private AgentService agentService;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Agent> createAgent(
        @RequestParam("mr_ms") String mr_ms,
        @RequestParam("telephone") String telephone,
        @RequestParam("email") String email,
        @RequestParam("salary") double salary) {
    
        try {
            Agent agent = new Agent();
            agent.setMr_ms(mr_ms);
            agent.setTelephone(telephone);
            agent.setEmail(email);
            agent.setSalary(salary);
    
            Agent savedAgent = agentRepository.save(agent);
            return new ResponseEntity<>(savedAgent, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Ensure this line is present to log the stack trace
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // build create agent REST API
    @PostMapping("/agents/add")
    public ResponseEntity<Agent> createAgent( @RequestBody Agent agent) {
        return new ResponseEntity<>(agentService.addAgent(agent), HttpStatus.CREATED);
    }
       

    // build get agent by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable long id) {
        Agent agent = agentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agent not exist with id: " + id));
        return ResponseEntity.ok(agent);
    }

    // build update agent REST API
    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable long id, @RequestBody Agent agentDetails) {
        Agent updateAgent = agentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agent not exist with id: " + id));

        updateAgent.setMr_ms(agentDetails.getMr_ms());
        updateAgent.setTelephone(agentDetails.getTelephone());
        updateAgent.setEmail(agentDetails.getEmail());
        updateAgent.setSalary(agentDetails.getSalary());

        agentRepository.save(updateAgent);

        return ResponseEntity.ok(updateAgent);
    }

    // build delete agent REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAgent(@PathVariable long id) {
        Agent agent = agentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agent not exist with id: " + id));
        agentRepository.delete(agent);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/agents/all")
    public ResponseEntity<List<Agent>> getAgents() {
        return new ResponseEntity<>(agentService.getAgents(), HttpStatus.OK);
    }

    @GetMapping("/agents/auth/{username}/{password}")
    public ResponseEntity<?> authAccount(@PathVariable String username, @PathVariable String password) {
        return ResponseEntity.ok(agentService.authAccount(username, password));
    }


    @GetMapping("/agents/fullname/{username}")
    public ResponseEntity<?> getFullName(@PathVariable String username) {
        return ResponseEntity.ok(agentService.getFullName(username));
    }

    // @GetMapping("/agents/profilepicture/{username}")
    // public ResponseEntity<?> getProfilePicture(@PathVariable String username) {
    //     Blob profilePicture = agentService.getProfilePicture(username);
    //     try {
    //         return ResponseEntity.ok(new SerialBlob(profilePicture.getBytes(1, (int) profilePicture.length())));
    //     } catch (SQLException e) {
    //         e.printStackTrace();
    //         return ResponseEntity.badRequest().body("Error retrieving profile picture");
    //     }
    // }

}
