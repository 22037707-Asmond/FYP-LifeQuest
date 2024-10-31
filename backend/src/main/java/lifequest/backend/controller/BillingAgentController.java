package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.dto.BillingAgentsRequest;
import lifequest.backend.entity.Agent;
import lifequest.backend.entity.BillingAgents;
import lifequest.backend.service.AgentService;
import lifequest.backend.service.BillingAgentService;

@RestController
@RequestMapping("/api/invoices")
public class BillingAgentController {

    @Autowired
    private BillingAgentService billingAgentService;

    @Autowired
    private AgentService agentService;


    @GetMapping("/all")
    public ResponseEntity<List<BillingAgents>> getInvoices() {
        return new ResponseEntity<>(billingAgentService.getInvoices(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<BillingAgents> addInvoice(@RequestBody BillingAgentsRequest request) {
        Agent agent = agentService.getAgent(request.getAgentId());
        if (agent == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Agent not found
        }
    
        BillingAgents billingAgents = new BillingAgents();
        billingAgents.setTotalAmount(request.getTotalAmount());
        billingAgents.setBillingDate(request.getBillingDate());
        billingAgents.setAgent(agent);
    
        BillingAgents savedInvoice = billingAgentService.addInvoice(billingAgents);
        return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }
    

}
