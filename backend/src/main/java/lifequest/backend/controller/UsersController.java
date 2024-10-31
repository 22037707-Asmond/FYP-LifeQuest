package lifequest.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Users;
import lifequest.backend.model.AccountRequest;
import lifequest.backend.service.AccountService;
import lifequest.backend.service.UsersService;

import java.sql.Blob;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    public UsersService usersService;

    @Autowired
    public AccountService accService;

    @PostMapping("/accounts/add")
    public ResponseEntity<Users> addAccount(@RequestBody Users account) {
        return new ResponseEntity<>(usersService.addAccount(account), HttpStatus.CREATED);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccounts() {
        return new ResponseEntity<>(usersService.getAllAccounts(), HttpStatus.OK);
    }

    @DeleteMapping("/accounts/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        usersService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/accounts/{username}")
    public ResponseEntity<?> getAccountByUsername(@PathVariable String username) {
        return new ResponseEntity<>(usersService.findAccountByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/accounts/auth/{username}/{password}")
    public ResponseEntity<?> authAccount(@PathVariable String username, @PathVariable String password) {
        return ResponseEntity.ok(usersService.authAccount(username, password));
    }

    @PostMapping("/accounts/addPhoto")
    public ResponseEntity<String> addImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        String result = accService.addImage(file, id);
        if ("User profile picture updated successfully".equals(result)
                || "Agent profile picture updated successfully".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/accounts/hireAgent")
    public ResponseEntity<?> hireAgent(@RequestParam Long accountId, @RequestParam Long agentId) {
        usersService.hireAgent(accountId, agentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/accounts/id/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Long id) {
        Account account = usersService.getUserById(id);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(account);
    }


    @GetMapping("/users/profilepicture/{username}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String username) {
        Blob profilePicture = usersService.getProfilePicture(username);
        try {
            byte[] imageBytes = profilePicture.getBytes(1, (int) profilePicture.length());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Assuming the image is a JPEG. Adjust if needed.
            headers.setContentLength(imageBytes.length);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/users/fullname/{username}")
    public ResponseEntity<?> getFullName(@PathVariable String username) {
        return ResponseEntity.ok(usersService.getFullName(username));
    }

    @PostMapping("/accounts/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Long id, @RequestBody AccountRequest updatedAccount) {
        Account account = accService.updateAccount(id, updatedAccount);
        if (updatedAccount == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(account);
    }

}
