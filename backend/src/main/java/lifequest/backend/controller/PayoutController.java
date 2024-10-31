package lifequest.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.service.PayPalPayoutService;

@RestController
@RequestMapping("/api/payouts")
public class PayoutController {
    @Autowired
    private PayPalPayoutService payPalPayoutService;

    @PostMapping
    public ResponseEntity<String> createPayout(@RequestParam String recipientEmail, @RequestParam String amount) {
        try {
            String response = payPalPayoutService.createPayout(recipientEmail, amount);
            return ResponseEntity.ok(response); // Return a successful response with payout details
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}