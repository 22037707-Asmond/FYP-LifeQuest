package lifequest.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import lifequest.backend.entity.Message;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public void receiveMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSend("/chatroom/public", message);
    }

    @MessageMapping("/private-message")
    public void recMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(message.getReceiver(), "/private", message);
    }
}
