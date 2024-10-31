package lifequest.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.BillingAgents;
import lifequest.backend.repository.BillingAgentRepository;

@Service
public class BillingAgentService {

    @Autowired
    private BillingAgentRepository billingAgentRepo;

    public BillingAgents addInvoice(BillingAgents billingAgent) {
        return billingAgentRepo.save(billingAgent);
    }

    public List<BillingAgents> getInvoices() {
        try {
            return billingAgentRepo.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch invoices", e);
        }
    }
}
