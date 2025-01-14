import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {Role} from "./role.entity";
import {Resource} from "./resource.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @Column({ unique: true })
    email: string;
    @Column()
    fullname: string;
    @OneToMany(() => Resource, (resource) => resource.createdBy)
    resources: Resource[];
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({ name: 'users_roles' })
    roles: Role[];
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
