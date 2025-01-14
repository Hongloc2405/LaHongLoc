import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {Resource} from "./resource.entity";

@Entity('resources_type')
export class ResourceType {
    @PrimaryColumn()
    typeName: string;
    @Column()
    description: string;
    @OneToMany(() => Resource, (resource) => resource.type)
    resources: Resource[];
}
