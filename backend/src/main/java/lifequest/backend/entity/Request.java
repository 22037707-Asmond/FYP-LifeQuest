package lifequest.backend.entity;

import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lifequest.backend.configs.BlobConfig;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Agent agent;

    private Long agentid;

    public void setAgent(Agent agent) {
        this.agent = agent;
        this.agentid = agent.getId();
    }

    private int userid;

    @JsonSerialize(using = BlobConfig.BlobSerializer.class)
    @JsonDeserialize(using = BlobConfig.BlobDeserializer.class)
    private Blob documents; 

    @Enumerated(EnumType.STRING)
    private RequestEnum status;

    private String insurance;

    @Enumerated(EnumType.STRING)
    private RequestType type;

    public enum RequestEnum {
        PENDING, ACCEPTED, REJECTED
    }

    public enum RequestType {
        Claim, Application
    }
}
