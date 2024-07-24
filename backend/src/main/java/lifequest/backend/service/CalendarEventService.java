package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.CalendarEvent;
import lifequest.backend.repository.CalendarEventRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarEventService {

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    public List<CalendarEvent> getAllCalendarEvents() {
        return calendarEventRepository.findAll();
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
}

