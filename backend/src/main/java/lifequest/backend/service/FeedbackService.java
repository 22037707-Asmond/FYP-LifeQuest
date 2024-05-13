package lifequest.backend.service;

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
}
