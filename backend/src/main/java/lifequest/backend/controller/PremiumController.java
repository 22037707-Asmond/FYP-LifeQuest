package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Premium;
import lifequest.backend.service.PremiumService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class PremiumController {
    @Autowired
    public PremiumService premiumService;

    @GetMapping("/sales/data")
    public ResponseEntity<List<Premium>> getSalesAgentData() {
        List<Premium> premiums = premiumService.getAllPremiumsSale(); // Retrieve all articles from the service
        return new ResponseEntity<>(premiums, HttpStatus.OK); // Return the articles as JSON with HTTP status 200
    }
}
