
import { AppDataSource } from "../ormconfig";
import { Message } from "../entity/Message";

class MessageService{
    private messageRepository;
    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }
    showAllByConversation = async (conversationId)=> {
        return await this.messageRepository.createQueryBuilder("message")
          .leftJoinAndSelect("message.sender", "sender")
          .leftJoinAndSelect("message.conversation", "conversation")
          .leftJoinAndSelect("conversation.user1", "user1")
          .leftJoinAndSelect("conversation.user2", "user2")
          .where("conversation.id = :conversationId", { conversationId })
          .getMany();
      };
    addMessage = async (body,senderId, conversationId) => {
        const newMessage={
            content : body.content,
            sender:senderId,
            conversation: conversationId            
        }
       let data= await this.messageRepository.save(newMessage);
       return data
    }

}
export default new MessageService()