package lifequest.backend.controller;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Agent;
import lifequest.backend.exception.ResourceNotFoundException;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.service.AgentService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @Autowired
    private AgentRepository agentRepository;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
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
            .orElseThrow(() -> new  ResourceNotFoundException("Emplouee not exist with id: " + id)); 
        return ResponseEntity.ok(agent);
    }

    // build update agent REST API
    @PutMapping("path/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable long id, @RequestBody Agent agentDetails) {
        Agent updateAgent = agentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agent not exist with id: " + id));

        updateAgent.setFirstName(agentDetails.getFirstName());
        updateAgent.setLastName(agentDetails.getLastName());
        updateAgent.setProfilePicture(agentDetails.getProfilePicture());
        updateAgent.setYearsOfExperience(agentDetails.getYearsOfExperience());
        updateAgent.setBio(agentDetails.getBio());
        updateAgent.setPhoneNumber(agentDetails.getPhoneNumber());
        updateAgent.setSalary(agentDetails.getSalary());

        agentRepository.save(updateAgent);

        return ResponseEntity.ok(updateAgent);
    }

    // build delete agent REST API
    @DeleteMapping("/delete/{id}")
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

    @GetMapping("/agents/profilepicture/{username}")
    public ResponseEntity<?> getProfilePicture(@PathVariable String username) {
        Blob profilePicture = agentService.getProfilePicture(username);
        try {
            return ResponseEntity.ok(new SerialBlob(profilePicture.getBytes(1, (int) profilePicture.length())));
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error retrieving profile picture");
        }
    }

}
