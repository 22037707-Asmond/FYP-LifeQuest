package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Avatar;
import lifequest.backend.repository.AvatarRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AvatarService {

    @Autowired
    public AvatarRepository avatarRepository;

    public Avatar addAvatar(Avatar avatar) {
        return avatarRepository.save(avatar);
    }

}
