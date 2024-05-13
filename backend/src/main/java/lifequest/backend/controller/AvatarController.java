package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lifequest.backend.entity.Avatar;
import lifequest.backend.service.AvatarService;

@RestController
@RequestMapping("/api")
public class AvatarController {

    @Autowired
    public AvatarService avatarService;

    @PostMapping("/avatars/add")
    public ResponseEntity<Avatar> addAvatar(@RequestBody Avatar avatar) {
        return new ResponseEntity<>(avatarService.addAvatar(avatar), HttpStatus.CREATED);
    }
    

}
