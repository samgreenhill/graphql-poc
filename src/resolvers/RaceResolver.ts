import { Arg, Query, Resolver } from "type-graphql";
import { Race } from "../types/Race";
import { Service } from "typedi";
import { DatabaseService } from "../services/DatabaseService";
import { RowDataPacket } from "mysql2";
import { CircuitResolver } from "./CircuitResolver";

@Service()
@Resolver(of => Race)
export class RaceResolver {

    constructor(private readonly database: DatabaseService) {
    }

    @Query(returns => [Race], { description: "Get all the F1 races from around the world" })
    async races(): Promise<Race[]> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>({sql: "select * from races r, circuits c where r.circuitId = c.circuitId", nestTables: true}))[0].map(r => this.convert(r));
    }

    @Query(returns => Race, { description: "Get a F1 race by its identifier", nullable: true })
    async race(@Arg("id") id: string): Promise<Race> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>({sql: "select * from races r, circuits c where r.circuitId = c.circuitId and raceId = ?", nestTables: true}, id))[0].map(r => this.convert(r))[0];
    }

    private convert(row: RowDataPacket) : Race {
        let r = new Race();
        r.id = row.r["circuitId"];
        r.year = row.r["year"];
        r.round = row.r["round"];
        r.circuit = CircuitResolver.convert(row.c);
        r.name = row.r["name"];
        r.date = row.r["date"];
        r.time = row.r["time"];
        r.url = row.r["url"];
        return r;
    }
}   