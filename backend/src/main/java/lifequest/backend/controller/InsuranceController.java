package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Insurance;
import lifequest.backend.entity.InsuranceType;
import lifequest.backend.exception.ResourceNotFoundException;
import lifequest.backend.repository.InsuranceRepository;
import lifequest.backend.repository.InsuranceTypeRepository;
import lifequest.backend.service.InsuranceService;

@RestController
@RequestMapping("/api/insurances")
public class InsuranceController {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;

    @Autowired
    private InsuranceService insuranceService;

    // @GetMapping
    // public ResponseEntity<List<InsuranceType>> getAllInsuranceType() {
    //     List<InsuranceType> categories = insuranceTypeRepository.findAll();
    //     categories.forEach(category -> {
    //         System.out.println("Category ID: " + category.getId());
    //         System.out.println("Category Name: " + category.getName());
    //         System.out.println("Category Description: " + category.getDescription());
    //     });
    //     return new ResponseEntity<>(categories, HttpStatus.OK);
    // }

    // @GetMapping
    // public ResponseEntity<List<Insurance>> getAllInsurances() {
    //     List<Insurance> insurances = insuranceRepository.findAll();
    //     insurances.forEach(insurance -> {
    //         System.out.println("Insurance ID: " + insurance.getId());
    //         System.out.println("Insurance Name: " + insurance.getName());
    //         System.out.println("Insurance Description: " + insurance.getDescription());
    //     });
    //     return new ResponseEntity<>(insurances, HttpStatus.OK);
    // }

    @PostMapping("Category/add")
    public ResponseEntity<InsuranceType> createInsuranceType(@RequestBody InsuranceType insuranceType) {
        return new ResponseEntity<>(insuranceService.addInsuranceType(insuranceType), HttpStatus.CREATED);
    }

    @PostMapping("Insurance/add")
    public ResponseEntity<Insurance> createInsurance(@RequestBody Insurance insurance) {
        return new ResponseEntity<>(insuranceService.addInsurance(insurance), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable Long id) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));
        return ResponseEntity.ok(insurance);
    }

    @GetMapping("Category/{id}")
    public ResponseEntity<InsuranceType> getInsuranceTypeById(@PathVariable Long id) {
        InsuranceType category = insuranceTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));
        return ResponseEntity.ok(category);
    }

    @PutMapping("Insurance/update/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable Long id, @RequestBody Insurance insuranceDetails) {
        Insurance updateInsurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));

        updateInsurance.setName(insuranceDetails.getName());
        updateInsurance.setDescription(insuranceDetails.getDescription());
        updateInsurance.setInsuranceType(insuranceDetails.getInsuranceType());

        insuranceRepository.save(updateInsurance);

        return ResponseEntity.ok(updateInsurance);
    }

    @DeleteMapping("Insurance/delete/{id}")
    public ResponseEntity<HttpStatus> deleteInsurance(@PathVariable Long id) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Insurance not exist with id: " + id));
        insuranceRepository.delete(insurance);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/Insurance/all")
    public ResponseEntity<List<Insurance>> getInsurances() {
        return new ResponseEntity<>(insuranceService.getInsurances(), HttpStatus.OK);
    }

    @GetMapping("/Category/all")
    public ResponseEntity<List<InsuranceType>> getInsuranceType() {
        return new ResponseEntity<>(insuranceService.getInsuranceType(), HttpStatus.OK);
    }
}
