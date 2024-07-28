package lifequest.backend.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Agent;
import lifequest.backend.entity.Premium;
import lifequest.backend.entity.Users;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.repository.PremiumRepository;
import lifequest.backend.repository.UsersRepository;

@Service
public class DataService {
    @Autowired
    private PremiumRepository premiumRepo;

    @Autowired
    private AgentRepository agentRepo;

    @Autowired
    private UsersRepository userRepo;

    public List<Premium> getAllPremiums() {
        return premiumRepo.findAll();
    }

    public List<Agent> getAllAgents() {
        return agentRepo.findAll();
    }

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    // Calculate age of users
    public Map<Users, Integer> calculateUserAges() {
        List<Users> users = userRepo.findAll();
        return users.stream()
                .collect(Collectors.toMap(
                    user -> user,
                    user -> {
                        LocalDate birthDate = LocalDate.parse(user.getDateOfBirth());
                        return Period.between(birthDate, LocalDate.now()).getYears();
                    }
                ));
    }

    // Calculate total sales made by each agent
    public Map<Agent, Double> calculateTotalSalesByAgent() {
        List<Premium> premiums = premiumRepo.findAll();
        return premiums.stream()
                .collect(Collectors.groupingBy(
                    Premium::getAgent,
                    Collectors.summingDouble(Premium::getPayment)
                ));
    }

    // Calculate profit/loss for the month
    public Map<String, Double> calculateProfitOrLossByMonth() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);
        
        // Collect all premiums
        List<Premium> premiums = premiumRepo.findAll();
        
        // Sum payments per month
        Map<String, Double> paymentsByMonth = new HashMap<>();
        for (Premium premium : premiums) {
            LocalDate purchaseDate = LocalDate.parse(premium.getPurchaseDate());
            while (purchaseDate.isBefore(now)) {
                String monthKey = purchaseDate.format(formatter);
                paymentsByMonth.put(monthKey, paymentsByMonth.getOrDefault(monthKey, 0.0) + premium.getPayment());
                purchaseDate = purchaseDate.plusMonths(1);
            }
        }

        // Sum salaries per month
        List<Agent> agents = agentRepo.findAll();
        Map<String, Double> salariesByMonth = new HashMap<>();
        for (Agent agent : agents) {
            LocalDate salaryDate = startOfMonth;
            while (salaryDate.isBefore(now)) {
                String monthKey = salaryDate.format(formatter);
                salariesByMonth.put(monthKey, salariesByMonth.getOrDefault(monthKey, 0.0) + agent.getSalary());
                salaryDate = salaryDate.plusMonths(1);
            }
        }

        // Calculate profit or loss per month
        Map<String, Double> profitOrLossByMonth = new TreeMap<>();
        for (String month : paymentsByMonth.keySet()) {
            double totalPayments = paymentsByMonth.get(month);
            double totalSalaries = salariesByMonth.getOrDefault(month, 0.0);
            profitOrLossByMonth.put(month, totalPayments - totalSalaries);
        }
        
        return profitOrLossByMonth;
    }
}
