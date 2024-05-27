package lifequest.backend.entity;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String username;
    private String password;
    private String email;
    private String role;
    private byte[] profilePicture;

  // Add a method to set the password securely
  public void setPassword(String password) {
    // Hash the password before setting it
    this.password = hashPassword(password);
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
