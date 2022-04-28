import { ID, Field, ObjectType } from "type-graphql"

@ObjectType({ description: "Object representing an F1 constructor" })
export class F1Constructor {
    @Field(type => ID)
    id?: string;

    @Field()
    reference?: string;

    @Field()
    name?: string;

    @Field()
    nationality?: string;

    @Field()
    url?: string;
}