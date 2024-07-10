package lifequest.backend.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Agent;
import lifequest.backend.entity.Users;
import lifequest.backend.repository.AgentRepository;

@Service
public class AgentService {
    @Autowired
    public AgentRepository agentRepository;

    public Agent addAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    public Agent getAgent(Long id) {
        return agentRepository.findById(id).orElse(null);
    }

    public List<Agent> getAgents() {
        return agentRepository.findAll();
    }

    public Agent authAccount(String username, String password) {
        Agent account = agentRepository.findByUsername(username);
        if (account != null && account.getPassword().equals(hashPassword(password))) {
            return account;
        }
        return null;
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
