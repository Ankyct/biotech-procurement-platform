package com.biotech.procurement.chat;



import lombok.*;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@ToString

public class ChatMessage {
    

    private String senderName;
    private String recieverName;
    private String message;
    private String date;
    private Status status;
    

    // public ChatMessage(){

    // }

    // public long getId(){
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    // public long getRoomId(){
    //     return roomId;
    // }

    // public void setRoomId(Long roomId){
    //     this.roomId = roomId;
    // }

    // public String getSender(){
    //     return senderName;
    // }

    // public void setSender(String senderName){
    //     this.senderName = senderName;
    // }

    // public String getMessage(){
    //     return message;
    // }

    // public void setMessage(String message){
    //     this.message = message;
    // }

    // public long getSentAt(){
    //     return sentAt;
    // }

    // public void setSentAt(long sentAt){
    //     this.sentAt = sentAt;
    // }
}
