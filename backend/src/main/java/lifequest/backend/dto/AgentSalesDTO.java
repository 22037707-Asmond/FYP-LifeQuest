package lifequest.backend.dto;

public class AgentSalesDTO {
    private String agentName;
    private double totalSales;

    public AgentSalesDTO(String agentName, double totalSales) {
        this.agentName = agentName;
        this.totalSales = totalSales;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }
}
