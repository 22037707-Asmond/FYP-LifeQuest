package lifequest.backend.entity;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Agent extends Account {
    private String firstName;
    private String lastName;
    private Blob profilePicture; 
    @JsonProperty("profilePicture")
    public byte[] getProfilePictureBytes() throws SQLException, IOException {
        if (profilePicture != null) {
            return profilePicture.getBinaryStream().readAllBytes();
        }
        return null;
    }

    @JsonProperty("profilePicture")
    public void setProfilePictureBytes(byte[] profilePictureBytes) {
        if (profilePictureBytes != null) {
            try {
                this.profilePicture = new SerialBlob(profilePictureBytes);
            } catch (SQLException e) {
                // Handle the exception here, e.g. log the error or throw a custom exception
            }
        }
    }
    private int yearsOfExperience;
    private String bio;
    private String phoneNumber;
    private double salary;

    @ManyToMany(mappedBy = "agents")
    private List<Users> users;

    @OneToMany(mappedBy = "agent")
    private List<Premium> premiums;

    

}
