// message.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updateAt: Date;

  @ManyToOne(() => User, user => user.message)
  user1: User;

  @ManyToOne(() => User, user => user.conversation)
  user2: User;
  
  @OneToMany(() => Message, (message) => message.conversation)
  message: Message[];
}
