package lifequest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lifequest.backend.entity.CalendarBooking;

public interface CalendarRepository extends JpaRepository<CalendarBooking, Long> {}

