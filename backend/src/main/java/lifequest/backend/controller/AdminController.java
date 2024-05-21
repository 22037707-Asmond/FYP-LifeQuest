package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lifequest.backend.entity.Admin;
import lifequest.backend.service.AdminService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    public AdminService adminService;

    @PostMapping("/admin/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
       
        return new ResponseEntity<>(adminService.addAdmin(admin), HttpStatus.CREATED);
    }

    @GetMapping("/admin/{username}")
    public ResponseEntity<?> getAdmin(@PathVariable String username) {
        return new ResponseEntity<>(adminService.getAdmin(username), HttpStatus.OK);
    }

}
