package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.util.List;

import lifequest.backend.entity.*;
import lifequest.backend.repository.*;

@Service
@AllArgsConstructor
public class UsersService {

    @Autowired
    public UsersRepository usersRepository;

    @Autowired
    public AgentRepository agentRepository;

    @Autowired
    public AccountRepository accountRepository;

    public Users addAccount(Users account) {
        return usersRepository.save(account);
    }

    public Users getAccountById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public List<Users> getAllAccounts() {
        return usersRepository.findAll();
    }

    public void deleteAccount(Long id) {
        usersRepository.deleteById(id);
    }

    public Users findAccountByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public Users authAccount(String username, String password) {
        Users account = usersRepository.findByUsername(username);
        if (account != null && account.getPassword().equals(hashPassword(password))) {
            return account;
        }
        return null;
    }

    public void hireAgent(Long accountId, Long agentId) {
        Users account = usersRepository.findById(accountId).orElse(null);
        Agent agent = agentRepository.findById(agentId).orElse(null);
        if (account != null && agent != null) {
            account.getAgents().add(agent);
            usersRepository.save(account);
        }
    }

    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public String getFullName(String username) {
        Users account = usersRepository.findByUsername(username);
        return account.getFirstName() + " " + account.getLastName();
    }


    public Blob getProfilePicture(String username) {
        Users account = usersRepository.findByUsername(username);
        return account.getProfilePicture();
    }

    


    // Method to hash the password using SHA-256
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes());
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            // Handle hashing algorithm not found exception
            e.printStackTrace();
            return null; // Or handle error in another way
        }
    }

    // Method to convert byte array to hexadecimal string
    private static String bytesToHex(byte[] hashBytes) {
        StringBuilder hexString = new StringBuilder(2 * hashBytes.length);
        for (byte b : hashBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
