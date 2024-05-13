package lifequest.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Feedback;
import lifequest.backend.service.FeedbackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;




@RestController
@RequestMapping("/api")
public class FeedbackController {
    @Autowired
    public FeedbackService feedbackService;

    @PostMapping("/feedback/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        return new ResponseEntity<>(feedbackService.addFeedback(feedback), HttpStatus.CREATED);
    }

}
