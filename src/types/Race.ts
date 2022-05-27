import { ID, Field, ObjectType, Int } from "type-graphql"
import { Circuit } from "./Circuit";

@ObjectType({ description: "Object representing a F1 race" })
export class Race {
    @Field(type => ID)
    id?: string;

    @Field(type => Int)
    year?: number;

    @Field(type => Int)
    round?: string;

    circuitId: string = "";

    @Field()
    circuit?: Circuit;

    @Field()
    name?: string;

    @Field()
    date?: Date;

    @Field({nullable: true})
    time?: string;

    @Field()
    url?: string;
}