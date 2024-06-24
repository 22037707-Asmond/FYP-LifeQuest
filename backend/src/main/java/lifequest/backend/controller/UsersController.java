package lifequest.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lifequest.backend.entity.Account;
import lifequest.backend.entity.Users;
import lifequest.backend.service.AccountService;
import lifequest.backend.service.UsersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.SQLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.lang.reflect.Field;

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
        if ("User profile picture updated successfully".equals(result) || "Agent profile picture updated successfully".equals(result)) {
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

    @PostMapping("/accounts/update/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Long id,  @RequestBody Account updatedAccount) {
        Account account = accService.updateAccount(id, updatedAccount);
        if (updatedAccount == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(account);
    }
       
    
}
