package lifequest.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Agent;
import lifequest.backend.entity.Users;
import lifequest.backend.service.DataService;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataService dataService;

    // Endpoint to get the age of users
    @GetMapping("/user-ages")
    public Map<Users, Integer> getUserAges() {
        return dataService.calculateUserAges();
    }

    // Endpoint to get total sales by each agent
    @GetMapping("/agent-sales")
    public Map<Agent, Double> getAgentSales() {
        return dataService.calculateTotalSalesByAgent();
    }

    // Endpoint to get profit or loss by month
    @GetMapping("/profit-loss")
    public Map<String, Double> getProfitOrLossByMonth() {
        return dataService.calculateProfitOrLossByMonth();
    }
}
