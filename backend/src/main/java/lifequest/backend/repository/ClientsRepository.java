package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.Clients;

public interface ClientsRepository extends JpaRepository<Clients,Long>{


}