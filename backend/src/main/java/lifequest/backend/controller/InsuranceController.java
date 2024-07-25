package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.Insurance;
import lifequest.backend.exception.ResourceNotFoundException;
import lifequest.backend.repository.InsuranceRepository;
import lifequest.backend.service.InsuranceService;

@RestController
@RequestMapping("/api/insurances")
public class InsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private InsuranceService insuranceService;

    @GetMapping
    public ResponseEntity<List<Insurance>> getAllInsurances() {
        List<Insurance> insurances = insuranceRepository.findAll();
        insurances.forEach(insurance -> {
            System.out.println("Insurance ID: " + insurance.getId());
            System.out.println("Insurance Name: " + insurance.getName());
            System.out.println("Insurance Description: " + insurance.getDescription());
        });
        return new ResponseEntity<>(insurances, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Insurance> createInsurance(@RequestBody Insurance insurance) {
        return new ResponseEntity<>(insuranceService.addInsurance(insurance), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable Long id) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));
        return ResponseEntity.ok(insurance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable Long id, @RequestBody Insurance insuranceDetails) {
        Insurance updateInsurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));

        updateInsurance.setName(insuranceDetails.getName());
        updateInsurance.setDescription(insuranceDetails.getDescription());
        updateInsurance.setInsuranceType(insuranceDetails.getInsuranceType());

        insuranceRepository.save(updateInsurance);

        return ResponseEntity.ok(updateInsurance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteInsurance(@PathVariable Long id) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));
        insuranceRepository.delete(insurance);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Insurance>> getInsurances() {
        return new ResponseEntity<>(insuranceService.getInsurances(), HttpStatus.OK);
    }
}
