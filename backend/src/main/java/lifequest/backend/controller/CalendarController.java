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

    /**
     * Get all calendar events.
     *
     * @return a list of CalendarDTO objects representing all calendar events
     */
    @GetMapping
    public List<CalendarDTO> getAllCalendarEvents() {
        return calendarEventService.getAllCalendarEvents();
    }

    /**
     * Get a calendar event by its ID.
     *
     * @param id the ID of the calendar event
     * @return an Optional containing the CalendarEvent if found, or an empty Optional if not found
     */
    @GetMapping("/{id}")
    public Optional<CalendarEvent> getCalendarEventById(@PathVariable Long id) {
        return calendarEventService.getCalendarEventById(id);
    }

    /**
     * Create a calendar event for an agent.
     *
     * @param calendarEvent the CalendarEvent object to be created
     * @return the created CalendarEvent object
     */
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

    /**
     * Create a calendar event for a user.
     *
     * @param calendarEvent the CalendarEvent object to be created
     * @return the created CalendarEvent object
     */
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

    /**
     * Accept a calendar event by its ID.
     *
     * @param id the ID of the calendar event to be accepted
     * @return a ResponseEntity with HTTP status 200 if the event is accepted, or HTTP status 404 if the event is not found
     */
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

    /**
     * Update a calendar event by its ID.
     *
     * @param id            the ID of the calendar event to be updated
     * @param calendarEvent the updated CalendarEvent object
     * @return the updated CalendarEvent object
     */
    @PutMapping("/{id}")
    public CalendarEvent updateCalendarEvent(@PathVariable Long id, @RequestBody CalendarEvent calendarEvent) {
        calendarEvent.setId(id);
        return calendarEventService.saveCalendarEvent(calendarEvent);
    }

    /**
     * Update the status of a calendar event by its ID.
     *
     * @param id     the ID of the calendar event to update the status for
     * @param status the new status of the calendar event
     * @return a ResponseEntity with the updated CalendarEvent object if found, or HTTP status 404 if the event is not found
     */
    @PutMapping("/status/{id}")
    public ResponseEntity<CalendarEvent> updateCalendarEventStatus(@PathVariable Long id, @RequestBody String status) {
        CalendarEvent updatedEvent = calendarEventService.updateCalendarEventStatus(id, status);
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete a calendar event by its ID.
     *
     * @param id the ID of the calendar event to be deleted
     */
    @DeleteMapping("/{id}")
    public void deleteCalendarEvent(@PathVariable Long id) {
        calendarEventService.deleteCalendarEvent(id);
    }

    /**
     * Get all calendar events for a specific agent.
     *
     * @param agentId the ID of the agent
     * @return a list of CalendarDTO objects representing the calendar events for the agent
     */
    @GetMapping("/agent/{agentId}")
    public List<CalendarDTO> getCalendarEventsByAgent(@PathVariable Long agentId) {
        return calendarEventService.getCalendarEventsByAgent(agentId);
    }

    /**
     * Get all calendar events for a specific user.
     *
     * @param userId the ID of the user
     * @return a list of CalendarDTO objects representing the calendar events for the user
     */
    @GetMapping("/user/{userId}")
    public List<CalendarDTO> getCalendarEventsByUser(@PathVariable Long userId) {
        return calendarEventService.getCalendarEventsByUser(userId);
    }
}
