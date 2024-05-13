package lifequest.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Feedback;
import lifequest.backend.repository.FeedbackRepository;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class FeedbackService {
    @Autowired
    public FeedbackRepository feedbackRepository;


    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
