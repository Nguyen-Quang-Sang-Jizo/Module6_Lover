// message.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Conversation } from './Conversation';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  content: string;
  
  @ManyToOne(() => User, user => user.messages)
  sender: User;

  @ManyToOne(() => Conversation, conversation => conversation.message)
  conversation: Conversation ;
}
