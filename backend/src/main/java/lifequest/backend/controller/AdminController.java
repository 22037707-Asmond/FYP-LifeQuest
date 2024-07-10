package lifequest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lifequest.backend.entity.Admin;
import lifequest.backend.exception.ResourceNotFoundException;
import lifequest.backend.repository.AdminRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(
        @RequestParam("mr_ms") String mr_ms,
        @RequestParam("telephone") String telephone,
        @RequestParam("email") String email,
        @RequestParam("salary") double salary) {
    
        try {
            Admin admin = new Admin();
            admin.setMr_ms(mr_ms);
            admin.setTelephone(telephone);
            admin.setEmail(email);
            admin.setSalary(salary);
    
            Admin savedAdmin = adminRepository.save(admin);
            return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Ensure this line is present to log the stack trace
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    // build get admin by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable long id) {
        Admin admin = adminRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Admin not exist with id: " + id));
        return ResponseEntity.ok(admin);
    }

    // build update admin REST API
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable long id, @RequestBody Admin adminDetails) {
        Admin updateAdmin = adminRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Admin not exist with id: " + id));

        updateAdmin.setMr_ms(adminDetails.getMr_ms());
        updateAdmin.setTelephone(adminDetails.getTelephone());
        updateAdmin.setEmail(adminDetails.getEmail());
        updateAdmin.setSalary(adminDetails.getSalary());

        adminRepository.save(updateAdmin);

        return ResponseEntity.ok(updateAdmin);
    }

    // build delete admin REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAdmin(@PathVariable long id) {
        Admin admin = adminRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Admin not exist with id: " + id));
        adminRepository.delete(admin);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
