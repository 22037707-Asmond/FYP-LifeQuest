package lifequest.backend.dto;

public class UserAgeBinDTO {
    private String ageBin;
    private int count;

    public UserAgeBinDTO(String ageBin, int count) {
        this.ageBin = ageBin;
        this.count = count;
    }

    public String getAgeBin() {
        return ageBin;
    }

    public void setAgeBin(String ageBin) {
        this.ageBin = ageBin;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
