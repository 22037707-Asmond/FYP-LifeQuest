package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.*;

public interface AccountRepository extends JpaRepository<Account, Long>
{
    public Account findByUsername(String username);

}
