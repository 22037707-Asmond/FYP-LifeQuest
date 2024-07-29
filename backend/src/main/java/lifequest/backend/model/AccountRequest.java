package lifequest.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountRequest {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;

}
