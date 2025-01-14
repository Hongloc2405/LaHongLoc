import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import {Role} from "./role.entity";

@Entity('permissions')
export class Permission {
    @PrimaryColumn()
    permissionName: string;

    @Column()
    description: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}
