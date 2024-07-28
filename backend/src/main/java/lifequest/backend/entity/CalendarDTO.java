package lifequest.backend.entity;

public class CalendarDTO {
    private Long id;
    private String title;
    private String date;
    private String time;
    private boolean accepted;
    private String status;
    private Long agentId;
    private Long userId;

    public CalendarDTO(CalendarEvent event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.date = event.getDate();
        this.time = event.getTime();
        this.accepted = event.isAccepted();
        this.status = event.getStatus();
        this.agentId = event.getAgent() != null ? event.getAgent().getId() : null;
        this.userId = event.getUser() != null ? event.getUser().getId() : null;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getAgentId() {
        return agentId;
    }

    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}