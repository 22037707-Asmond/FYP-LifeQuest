package lifequest.backend.service;

import java.sql.Blob;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Agent;
import lifequest.backend.entity.Users;
import lifequest.backend.model.AccountRequest;
import lifequest.backend.repository.AccountRepository;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.repository.UsersRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    public AccountRepository accountRepository;

    public String addImage(MultipartFile file, Long id) {
        try {
            byte[] image = file.getBytes();
            Blob blob = new javax.sql.rowset.serial.SerialBlob(image);

            Optional<Users> optionalUser = usersRepository.findById(id);
            if (optionalUser.isPresent()) {
                Users account = optionalUser.get();
                account.setProfilePicture(blob);
                usersRepository.save(account); // Save the user with the updated profile picture
                return "User profile picture updated successfully";
            } else {
                Optional<Agent> optionalAgent = agentRepository.findById(id);
                if (optionalAgent.isPresent()) {
                    Agent agent = optionalAgent.get();
                    agent.setProfilePicture(blob);
                    agentRepository.save(agent); // Save the agent with the updated profile picture
                    return "Agent profile picture updated successfully";
                } else {
                    // Handle case where neither user nor agent is found
                    return "No user or agent found with the provided ID.";
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle the exception appropriately, possibly throw a custom exception
            return "Failed to upload image";
        }
    }

      public Account updateAccount(Long id, AccountRequest updatedAccount) {
        Account account = accountRepository.findById(id).orElse(null);
        account.setFirstName(updatedAccount.getFirstName());
        account.setLastName(updatedAccount.getLastName());
        account.setUsername(updatedAccount.getUsername());
        account.setEmail(updatedAccount.getEmail());
        account.setPassword(updatedAccount.getPassword());
        return accountRepository.save(account);
    } 

    
}
