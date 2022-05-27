import { ID, Field, ObjectType, Int } from "type-graphql";
import { Driver } from "./Driver";
import { F1Constructor } from "./F1Constructor";
import { Race } from "./Race";


@ObjectType({ description: "Object representing a F1 race result" })
export class RaceResult {
    @Field(type => ID)
    id?: string;

    raceId: string = "";

    @Field()
    race?: Race;

    driverId: string = "";

    @Field()
    driver?: Driver;

    constructorId: string = "";

    @Field()
    f1constructor?: F1Constructor;

    @Field()
    position?: string;
}
