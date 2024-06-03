package lifequest.backend;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lifequest.backend.entity.Agent;
import lifequest.backend.repository.AgentRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private AgentRepository agentRepository;

	@Override
	public void run(String... args) throws Exception {
		Agent agent = new Agent();
		agent.setFirstName("Sema");
		agent.setLastName("Kaya");	

		// Read the image file and convert it to byte[]
		Path imagePath = Paths.get("C:/Users/22019860/Pictures/ic pic.jpg");
		byte[] profilePictureBytes = Files.readAllBytes(imagePath);
		agent.setProfilePicture(profilePictureBytes);

		agent.setYearsOfExperience(5);
		agent.setBio("I am a software engineer.");
		agentRepository.save(agent);	
	}

}
