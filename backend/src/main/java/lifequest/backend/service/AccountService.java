package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.List;
import lifequest.backend.entity.*;
import lifequest.backend.repository.*;

@Service
@AllArgsConstructor
public class AccountService {
    @Autowired
    public AccountRepository accountRepository;

    public Account addAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    public Account findAccountbyUsername(String username) {
        return accountRepository.findByUsername(username);
    }


}
