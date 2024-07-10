package lifequest.backend.controller;

import java.sql.Blob;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Agent;
import lifequest.backend.service.AccountService;
import lifequest.backend.service.AgentService;

@RestController
@RequestMapping("/api")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/agents/add")
    public ResponseEntity<Agent> addAgent(@RequestBody Agent agent) {
        return new ResponseEntity<>(agentService.addAgent(agent), HttpStatus.CREATED);
    }

    @PostMapping("/agents/add/image")
    public ResponseEntity<String> addImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        try {
            Agent agent = agentService.getAgent(id);
            byte[] image = file.getBytes();
            Blob blob = new SerialBlob(image);
            agent.setProfilePicture(blob);
            agentService.addAgent(agent);
            return new ResponseEntity<>("Image added successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding image", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/agents/add/agentwithpicture")
    public ResponseEntity<Agent> addAgentwithPic(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("email") String email,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("yearsOfExperience") int yearsOfExperience,
            @RequestParam("bio") String bio,
            @RequestParam("file") MultipartFile file) throws Exception

    {

        Agent agent = new Agent();
        agent.setUsername(username);
        agent.setPassword(password);
        agent.setEmail(email);
        agent.setRole("Agent");
        agent.setFirstName(firstName);
        agent.setLastName(lastName);
        agent.setYearsOfExperience(yearsOfExperience);
        agent.setBio(bio);

        byte[] image = file.getBytes();
        Blob blob = new SerialBlob(image);
        agent.setProfilePicture(blob);

        Agent savedAgent = agentService.addAgent(agent);
        return new ResponseEntity<>(savedAgent, HttpStatus.CREATED);
    }

    @GetMapping("/agents/all")
    public ResponseEntity<List<Agent>> getAgents() {
        return new ResponseEntity<>(agentService.getAgents(), HttpStatus.OK);
    }

    @GetMapping("/agents/auth/{username}/{password}")
    public ResponseEntity<?> authAccount(@PathVariable String username, @PathVariable String password) {
        return ResponseEntity.ok(agentService.authAccount(username, password));
    }
    
   

}
