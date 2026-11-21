package com.biotech.procurement.chat;

import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;



@Controller 
public class ChatController {
    
    @Autowired 
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message") //   /app/message
    @SendTo("/chatroom/public")
    public  ChatMessage recievedPublicMessage(@Payload ChatMessage message){
        return message;
    }

    @MessageMapping("/private-message")
    public void recievePrivateMessage(@Payload ChatMessage message){

        simpMessagingTemplate.convertAndSendToUser(message.getRecieverName(),"/private", message); // /user/username/private
    }
}
