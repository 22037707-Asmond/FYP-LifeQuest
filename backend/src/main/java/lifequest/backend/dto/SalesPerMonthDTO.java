package lifequest.backend.dto;

public class SalesPerMonthDTO {
    private String month;
    private double totalSales;

    public SalesPerMonthDTO(String month, double totalSales) {
        this.month = month;
        this.totalSales = totalSales;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }
}
