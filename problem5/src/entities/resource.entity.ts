import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {User} from "./user.entity";
import {ResourceType} from "./resourceType.entity";

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({unique: true})
    resourceName: string;
    @Column()
    description: string;
    @ManyToOne(() => User, (user) => user.resources)
    @JoinColumn({name: 'createdBy'})
    createdBy: User;
    @ManyToOne(() => ResourceType, (type) => type.resources)
    @JoinColumn({name: 'type'})
    type: ResourceType;
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
