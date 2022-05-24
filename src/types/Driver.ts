import { ID, Field, ObjectType, Int } from "type-graphql"

@ObjectType({ description: "Object representing a F1 driver" })
export class Driver {
    @Field(type => ID)
    id?: string;

    @Field()
    reference?: string;

    @Field(type => Int)
    number?: number;

    @Field({nullable: true})
    code?: string;

    @Field()
    forename?: string;

    @Field()
    surname?: string;

    @Field()
    dob?: string;

    @Field()
    nationality?: string;

    @Field()
    url?: string;
}