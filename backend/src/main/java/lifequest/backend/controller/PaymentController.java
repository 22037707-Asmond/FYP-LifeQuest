package lifequest.backend.controller;

import lifequest.backend.entity.Payment;
import lifequest.backend.entity.Users;
import lifequest.backend.entity.Insurance;
import lifequest.backend.entity.Billing;
import lifequest.backend.repository.PaymentRepository;
import lifequest.backend.repository.UsersRepository;
import lifequest.backend.repository.BillingRepository;
import lifequest.backend.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private InsuranceRepository insuranceRepository;

    @PostMapping("/pay")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
        Payment payment = new Payment();
        payment.setAmount(paymentRequest.getTotalAmount());
        payment.setCurrency(paymentRequest.getCurrency());
        payment.setMethod(paymentRequest.getMethod());
        payment.setCreatedDate(LocalDateTime.now());
        payment.setPaymentId(paymentRequest.getPaymentId()); // PayPal payment ID

        Optional<Users> userOpt = usersRepository.findById(paymentRequest.getUserId());
        Optional<Insurance> insuranceOpt = insuranceRepository.findById(paymentRequest.getInsuranceId());

        if (!userOpt.isPresent() || !insuranceOpt.isPresent()) {
            return new ResponseEntity<>("User or Insurance not found", HttpStatus.BAD_REQUEST);
        }

        Users user = userOpt.get();
        Insurance insurance = insuranceOpt.get();

        payment.setUser(user);
        payment.setInsurance(insurance);

        paymentRepository.save(payment);

        Billing billing = new Billing();
        billing.setPaymentId(payment.getPaymentId());
        billing.setTotalAmount(payment.getAmount());
        billing.setBillingDate(LocalDateTime.now());
        billing.setUser(user);
        billing.setInsurance(insurance);

        billingRepository.save(billing);

        return new ResponseEntity<>(payment, HttpStatus.OK);
    }
}

class PaymentRequest {
    private Long userId;
    private Long insuranceId;
    private double totalAmount;
    private String currency;
    private String method;
    private String paymentId; // PayPal payment ID

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(Long insuranceId) {
        this.insuranceId = insuranceId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}
