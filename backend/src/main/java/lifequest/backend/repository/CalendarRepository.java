package lifequest.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import lifequest.backend.entity.CalendarEvent;
import lifequest.backend.entity.Users;

public interface CalendarRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByUserAndAccepted(Users user, boolean accepted);
}


