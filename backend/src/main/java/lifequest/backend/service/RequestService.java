package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Request;
import lifequest.backend.entity.Request.RequestEnum;
import lifequest.backend.repository.RequestRepository;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public void deleteAllRequests() {
        requestRepository.deleteAll();
    }

    public Request addRequest(Request request) {
        return requestRepository.save(request);
    }

    public Iterable<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public void rejectRequest(Long id) {
        Request request = requestRepository.findById(id).get();
        request.setStatus(RequestEnum.REJECTED);
        requestRepository.save(request);
    }

    public void approveRequest(Long id) {
        Request request = requestRepository.findById(id).get();
        request.setStatus(RequestEnum.ACCEPTED);
        requestRepository.save(request);
    }
    
    
}
