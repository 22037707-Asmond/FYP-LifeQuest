package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.CalendarBooking;
import lifequest.backend.repository.CalendarRepository;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

  @Autowired
  private CalendarRepository calendarRepository;

  @GetMapping
  public List<CalendarBooking> getAllEvents() {
    return calendarRepository.findAll();
  }

  @PostMapping
  public CalendarBooking createEvent(@RequestBody CalendarBooking event) {
    return calendarRepository.save(event);
  }
}
