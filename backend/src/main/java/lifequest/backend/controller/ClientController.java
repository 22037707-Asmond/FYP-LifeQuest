package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Clients;
import lifequest.backend.service.ClientsService;

@RestController
@RequestMapping("/api")
public class ClientController {

    @Autowired
    private ClientsService clientsService;

    @PostMapping("/addClient")
    public ResponseEntity<Clients> addClient(@RequestBody  Clients client) {
        return new ResponseEntity<>(clientsService.addClient(client), HttpStatus.CREATED);
    }

}
