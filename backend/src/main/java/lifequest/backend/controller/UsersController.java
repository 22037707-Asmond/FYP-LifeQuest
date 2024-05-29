package lifequest.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lifequest.backend.entity.Users;
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

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    public UsersService accountService;

    @PostMapping("/accounts/add")
    public ResponseEntity<Users> addAccount(@RequestBody Users account) {
        return new ResponseEntity<>(accountService.addAccount(account), HttpStatus.CREATED);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccounts() {
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    @DeleteMapping("/accounts/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/accounts/{username}")
    public ResponseEntity<?> getAccountByUsername(@PathVariable String username) {
        return new ResponseEntity<>(accountService.findAccountByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/accounts/auth/{username}/{password}")
    public ResponseEntity<?> authAccount(@PathVariable String username, @PathVariable String password) {
       return ResponseEntity.ok(accountService.authAccount(username, password));
    }

  
}