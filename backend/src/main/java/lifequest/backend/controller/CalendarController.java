package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.Agent;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.entity.CalendarEvent;
import lifequest.backend.repository.CalendarEventRepository;
import lifequest.backend.service.CalendarEventService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private CalendarEventService calendarEventService;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    @GetMapping
    public List<CalendarEvent> getAllCalendarEvents() {
        return calendarEventService.getAllCalendarEvents();
    }

    @GetMapping("/{id}")
    public Optional<CalendarEvent> getCalendarEventById(@PathVariable Long id) {
        return calendarEventService.getCalendarEventById(id);
    }

    @PostMapping
    public CalendarEvent createCalendarEvent(@RequestBody CalendarEvent calendarEvent) {
        Agent agent = agentRepository.findByUsername(calendarEvent.getAgent().getUsername());
        calendarEvent.setAgent(agent);
        return calendarEventService.saveCalendarEvent(calendarEvent);
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptCalendarEvent(@PathVariable Long id) {
        Optional<CalendarEvent> optionalEvent = calendarEventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            CalendarEvent event = optionalEvent.get();
            event.setAccepted(true);
            calendarEventRepository.save(event);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public CalendarEvent updateCalendarEvent(@PathVariable Long id, @RequestBody CalendarEvent calendarEvent) {
        calendarEvent.setId(id);
        return calendarEventService.saveCalendarEvent(calendarEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteCalendarEvent(@PathVariable Long id) {
        calendarEventService.deleteCalendarEvent(id);
    }
}
