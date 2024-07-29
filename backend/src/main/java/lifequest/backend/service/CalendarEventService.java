package lifequest.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.CalendarDTO;
import lifequest.backend.entity.CalendarEvent;
import lifequest.backend.repository.CalendarEventRepository;

@Service
public class CalendarEventService {
    @Autowired
    private CalendarEventRepository calendarEventRepository;

    public List<CalendarDTO> getAllCalendarEvents() {
        return calendarEventRepository.findAll().stream().map(CalendarDTO::new).collect(Collectors.toList());
    }

    public Optional<CalendarEvent> getCalendarEventById(Long id) {
        return calendarEventRepository.findById(id);
    }

    public CalendarEvent saveCalendarEvent(CalendarEvent calendarEvent) {
        return calendarEventRepository.save(calendarEvent);
    }

    public void deleteCalendarEvent(Long id) {
        calendarEventRepository.deleteById(id);
    }

    public List<CalendarDTO> getCalendarEventsByAgent(Long agentId) {
        return calendarEventRepository.findByAgentId(agentId).stream().map(CalendarDTO::new).collect(Collectors.toList());
    }

    public List<CalendarDTO> getCalendarEventsByUser(Long userId) {
        return calendarEventRepository.findByUserId(userId).stream().map(CalendarDTO::new).collect(Collectors.toList());
    }

    public CalendarEvent updateCalendarEventStatus(Long id, String status) {
        Optional<CalendarEvent> eventOpt = calendarEventRepository.findById(id);
        if (eventOpt.isPresent()) {
            CalendarEvent event = eventOpt.get();
            event.setStatus(status);
            return calendarEventRepository.save(event);
        } else {
            return null;
        }
    }
}
