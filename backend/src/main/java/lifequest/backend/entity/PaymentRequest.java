package lifequest.backend.entity;

public class PaymentRequest {
    private Double total;
    private String currency;
    private String method;
    private String intent;
    private String description;
    private String cancelUrl;
    private String successUrl;

    // Getters
    public Double getTotal() {
        return total;
    }

    public String getCurrency() {
        return currency;
    }

    public String getMethod() {
        return method;
    }

    public String getIntent() {
        return intent;
    }

    public String getDescription() {
        return description;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    // Setters
    public void setTotal(Double total) {
        this.total = total;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    // Getters and Setters
    
}

