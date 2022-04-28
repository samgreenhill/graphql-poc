import { ID, Field, ObjectType, Int, Float } from "type-graphql"

@ObjectType({ description: "Object representing a F1 circuit" })
export class Circuit {
    @Field(type => ID)
    id?: string;

    @Field()
    reference?: string;

    @Field()
    name?: string;

    @Field()
    location?: string;

    @Field()
    country?: string;

    @Field(type => Float)
    latitude?: number;

    @Field(type => Float)
    longitude?: number;

    @Field(type => Int, {nullable: true})
    altitude?: number;

    @Field()
    url?: string;
}