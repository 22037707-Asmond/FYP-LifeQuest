package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Clients;
import lifequest.backend.repository.ClientsRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientsService {
    @Autowired
    private ClientsRepository clientsRepository;

    public Clients addClient(Clients client) {
        return clientsRepository.save(client);
    }
}
