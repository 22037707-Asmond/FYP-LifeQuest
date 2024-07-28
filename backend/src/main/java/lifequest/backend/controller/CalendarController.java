package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.Agent;
import lifequest.backend.entity.CalendarDTO;
import lifequest.backend.entity.Users;
import lifequest.backend.repository.AgentRepository;
import lifequest.backend.repository.UsersRepository;
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
    private UsersRepository userRepository;

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    @GetMapping
    public List<CalendarDTO> getAllCalendarEvents() {
        return calendarEventService.getAllCalendarEvents();
    }

    @GetMapping("/{id}")
    public Optional<CalendarEvent> getCalendarEventById(@PathVariable Long id) {
        return calendarEventService.getCalendarEventById(id);
    }

    @PostMapping("/agent")
    public CalendarEvent createCalendarEventForAgent(@RequestBody CalendarEvent calendarEvent) {
        if (calendarEvent.getAgent() != null && calendarEvent.getAgent().getId() != null) {
            Optional<Agent> agentOpt = agentRepository.findById(calendarEvent.getAgent().getId());
            agentOpt.ifPresent(calendarEvent::setAgent);
        }
        if (calendarEvent.getUser() != null && calendarEvent.getUser().getId() != null) {
            Optional<Users> userOpt = userRepository.findById(calendarEvent.getUser().getId());
            userOpt.ifPresent(calendarEvent::setUser);
        }
        return calendarEventService.saveCalendarEvent(calendarEvent);
    }

    @PostMapping("/user")
    public CalendarEvent createCalendarEventForUser(@RequestBody CalendarEvent calendarEvent) {
        if (calendarEvent.getUser() != null && calendarEvent.getUser().getId() != null) {
            Optional<Users> userOpt = userRepository.findById(calendarEvent.getUser().getId());
            userOpt.ifPresent(calendarEvent::setUser);
        }
        if (calendarEvent.getAgent() != null && calendarEvent.getAgent().getId() != null) {
            Optional<Agent> agentOpt = agentRepository.findById(calendarEvent.getAgent().getId());
            agentOpt.ifPresent(calendarEvent::setAgent);
        }
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

    @PutMapping("/status/{id}")
    public ResponseEntity<CalendarEvent> updateCalendarEventStatus(@PathVariable Long id, @RequestBody String status) {
        CalendarEvent updatedEvent = calendarEventService.updateCalendarEventStatus(id, status);
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCalendarEvent(@PathVariable Long id) {
        calendarEventService.deleteCalendarEvent(id);
    }

    @GetMapping("/agent/{agentId}")
    public List<CalendarDTO> getCalendarEventsByAgent(@PathVariable Long agentId) {
        return calendarEventService.getCalendarEventsByAgent(agentId);
    }

    @GetMapping("/user/{userId}")
    public List<CalendarDTO> getCalendarEventsByUser(@PathVariable Long userId) {
        return calendarEventService.getCalendarEventsByUser(userId);
    }
}
