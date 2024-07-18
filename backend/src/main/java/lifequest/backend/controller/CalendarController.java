package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lifequest.backend.entity.CalendarEvent;
import lifequest.backend.entity.Users;
import lifequest.backend.repository.CalendarRepository;
import lifequest.backend.exception.ResourceNotFoundException; 
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {
    @Autowired
    private CalendarRepository calendarRepository;

    @PostMapping("/request")
    public CalendarEvent createMeetingRequest(@RequestBody CalendarEvent event) {
        event.setAccepted(false);
        return calendarRepository.save(event);
    }

    @PostMapping("/accept/{id}")
    public CalendarEvent acceptMeetingRequest(@PathVariable Long id) {
      CalendarEvent event = calendarRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found"));        
      event.setAccepted(true);
        return calendarRepository.save(event);
    }

    @GetMapping("/accepted/{userId}")
    public List<CalendarEvent> getAcceptedMeetings(@PathVariable Long userId) {
        Users user = new Users();
        user.setId(userId);
        return calendarRepository.findByUserAndAccepted(user, true);
    }
    
}
