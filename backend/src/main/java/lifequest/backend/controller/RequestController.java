package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Request;
import lifequest.backend.service.RequestService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @PostMapping("/requests/add")
    public ResponseEntity<?> addRequest(@PathVariable Request request) {
        return new ResponseEntity<>(requestService.addRequest(request), HttpStatus.CREATED);
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getAllRequests() {
        return new ResponseEntity<>(requestService.getAllRequests(), HttpStatus.OK);
    }

    @PostMapping("/requests/approve/{id}")
    public ResponseEntity<?> approveRequest(@PathVariable Long id) {
        requestService.approveRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/requests/reject/{id}")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
        requestService.rejectRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/requests/delete/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
