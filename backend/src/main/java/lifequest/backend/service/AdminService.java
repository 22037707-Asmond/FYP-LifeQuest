package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Admin;
import lifequest.backend.repository.AdminAccRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
    @Autowired
    public AdminAccRepository adminAccRepository;

    public void deleteAdmin(Long id) {
        adminAccRepository.deleteById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminAccRepository.save(admin);
    }
    
    public Admin getAdmin(String username) {
        if(adminAccRepository.findByUsername(username) == null) {
            return null;
        } else {
            return adminAccRepository.findByUsername(username);
        }
        
    }
}
