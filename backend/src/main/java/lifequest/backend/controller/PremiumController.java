package lifequest.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Payment;

import lifequest.backend.entity.PaymentRequest;
import lifequest.backend.service.PayPalService;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/premium")
public class PremiumController {

    @Autowired
    private PayPalService payPalService;

    @PostMapping("/buy")
    public ResponseEntity<?> buyPremium(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = payPalService.createPayment(
                    paymentRequest.getTotal(),
                    paymentRequest.getCurrency(),
                    paymentRequest.getMethod(),
                    paymentRequest.getIntent(),
                    paymentRequest.getDescription(),
                    paymentRequest.getCancelUrl(),
                    paymentRequest.getSuccessUrl()
            );
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Payment failed");
        }
    }

    @PostMapping("/process")
    public ResponseEntity<?> processOrder(
            @RequestParam String orderId,
            @RequestParam String transactionId,
            @RequestParam Double total,
            @RequestParam Long memberId) {
        // Add logic to process the insurance purchase
        // e.g., update user account, send confirmation email, etc.

        return ResponseEntity.ok("Order processed successfully");
    }
}

