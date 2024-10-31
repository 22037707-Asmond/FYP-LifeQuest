package lifequest.backend.dto;

public class UserChildrenBinDTO {
    private String childrenBin;
    private int count;

    public UserChildrenBinDTO(String childrenBin, int count) {
        this.childrenBin = childrenBin;
        this.count = count;
    }

    public String getChildrenBin() {
        return childrenBin;
    }

    public void setChildrenBin(String childrenBin) {
        this.childrenBin = childrenBin;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
