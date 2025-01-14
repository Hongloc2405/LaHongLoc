import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import {User} from "./user.entity";
import {Permission} from "./permission.entity";

@Entity('roles')
export class Role {
    @PrimaryColumn()
    roleName: string;
    @Column()
    description: string;
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({ name: 'roles_permissions' })
    permissions: Permission[];
}
