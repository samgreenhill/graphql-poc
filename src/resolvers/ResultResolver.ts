import { Arg, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { RaceResult } from "../types/RaceResult";
import { Service } from "typedi";
import { DatabaseService } from "../services/DatabaseService";
import { RowDataPacket } from "mysql2";
import { CircuitResolver } from "./CircuitResolver";
import { DriverResolver } from "./DriverResolver";
import { RaceResolver } from "./RaceResolver";
import { F1Constructor } from "../types/F1Constructor";
import { ConstructorResolver } from "./ConstructorResolver";

@Service()
@Resolver(of => RaceResult)
export class ResultResolver implements ResolverInterface<RaceResult> {

    constructor(private readonly database: DatabaseService, private readonly raceResolver: RaceResolver, private readonly driverResolver: DriverResolver, private readonly constructorResolver: ConstructorResolver) {
    }

    @Query(returns => [RaceResult], { description: "Get all the F1 race result" })
    async results(): Promise<RaceResult[]> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>({ sql: "SELECT * FROM results res", nestTables: true }))[0].map(r => this.convert(r));
    }

    @Query(returns => RaceResult, { description: "Get a F1 race result by its identifier", nullable: true })
    async result(@Arg("id") id: string): Promise<RaceResult> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>({ sql: "SELECT * FROM results res where res.resultId = ?", nestTables: true }, id))[0].map(r => this.convert(r))[0];
    }

    @FieldResolver()
    race(@Root() rr: RaceResult) {
        return this.raceResolver.race(rr.raceId);
    }

    @FieldResolver()
    driver(@Root() rr: RaceResult) {
        return this.driverResolver.driver(rr.driverId);
    }

    @FieldResolver()
    f1constructor(@Root() rr: RaceResult) {
        return this.constructorResolver.f1constructor(rr.constructorId);
    }

    private convert(row: RowDataPacket): RaceResult {
        let rr = new RaceResult();
        rr.id = row.res["resultId"];
        rr.raceId = row.res["raceId"];
        rr.driverId = row.res["driverId"];
        rr.constructorId = row.res["constructorId"];
        rr.position = row.res["positionText"];
        return rr;
    }
}   