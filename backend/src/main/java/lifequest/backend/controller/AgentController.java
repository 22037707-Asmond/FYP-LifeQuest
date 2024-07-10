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


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/agents")
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
    @PostMapping
    public ResponseEntity<Agent> createAgent(
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("profilePicture") MultipartFile profilePicture,
        @RequestParam("yearsOfExperience") int yearsOfExperience,
        @RequestParam("bio") String bio,
        @RequestParam("phoneNumber") String phoneNumber,
        @RequestParam("salary") double salary) {

        try {
            Agent agent = new Agent();
            agent.setFirstName(firstName);
            agent.setLastName(lastName);
            agent.setYearsOfExperience(yearsOfExperience);
            agent.setBio(bio);
            agent.setPhoneNumber(phoneNumber);
            agent.setSalary(salary);

            if (profilePicture != null && !profilePicture.isEmpty()) {
                byte[] bytes = profilePicture.getBytes();
                Blob blob = new SerialBlob(bytes);
                agent.setProfilePicture(blob);
            }

            Agent savedAgent = agentRepository.save(agent);
            return new ResponseEntity<>(savedAgent, HttpStatus.CREATED);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

}
