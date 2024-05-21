package lifequest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.entity.Posts;
import lifequest.backend.repository.PostsRepository;
import lombok.AllArgsConstructor;
import java.util.List;


@Service
@AllArgsConstructor
public class PostsService {
    @Autowired
    public PostsRepository postsRepository;

    public Posts addPost(Posts post) {
        return postsRepository.save(post);
    }

    public List<Posts> getAllPosts() {
        return postsRepository.findAll();
    }
}
