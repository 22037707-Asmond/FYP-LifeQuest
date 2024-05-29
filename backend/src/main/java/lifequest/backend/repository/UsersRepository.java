package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.*;

public interface UsersRepository extends JpaRepository<Users, Long>
{
    public Users findByUsername(String username);
    public Users findByUsernameAndPassword(String username, String password);
}
