package lifequest.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Premium;
import lifequest.backend.repository.PremiumRepository;


@Service
public class PremiumService {
    @Autowired
    private PremiumRepository premiumRepository;

    public List<Premium> getAllPremiumsSale() {
        return premiumRepository.findAll();
    }
}
