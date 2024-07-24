package lifequest.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import lifequest.backend.entity.CalendarEvent;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByAgentId(Long agentId);
    List<CalendarEvent> findByUserId(Long userId);
}



