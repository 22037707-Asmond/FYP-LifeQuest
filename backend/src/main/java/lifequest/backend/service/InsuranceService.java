package lifequest.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Insurance;
import lifequest.backend.entity.InsuranceType;
import lifequest.backend.repository.InsuranceRepository;
import lifequest.backend.repository.InsuranceTypeRepository;

@Service
public class InsuranceService {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private InsuranceTypeRepository insuranceTypeRepository;

    public List<Insurance> getInsurances() {
        return insuranceRepository.findAll();
    }

    // Find all Insurance Type
    public List<InsuranceType> getInsuranceType() {
        return insuranceTypeRepository.findAll();
    }

    public Insurance addInsurance(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    //  Save Insurance Type
    public InsuranceType addInsuranceType(InsuranceType insuranceType) {
        return insuranceTypeRepository.save(insuranceType);
    }

    public Insurance getInsuranceById(Long id) {
        return insuranceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));
    }

    // Insurance type
    public Optional<InsuranceType> getInsuranceTypeById(Long id) {
        return insuranceTypeRepository.findById(id);
    }

    public Insurance updateInsurance(Long id, Insurance insuranceDetails) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));

        insurance.setName(insuranceDetails.getName());
        insurance.setDescription(insuranceDetails.getDescription());
        insurance.setInsuranceType(insuranceDetails.getInsuranceType());

        return insuranceRepository.save(insurance);
    }

    public void deleteInsurance(Long id) {
        Insurance insurance = insuranceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));
        insuranceRepository.delete(insurance);
    }

    public void deleteInsuranceType(Long id) {
        InsuranceType insuranceType = insuranceTypeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("InsuranceType not found with id: " + id));
        insuranceTypeRepository.delete(insuranceType);
    }
}
