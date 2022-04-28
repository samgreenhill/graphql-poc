import { Arg, Query, Resolver } from "type-graphql";
import { Circuit } from "../types/Circuit";
import { Service } from "typedi";
import { DatabaseService } from "../services/DatabaseService";
import { RowDataPacket } from "mysql2";

@Service()
@Resolver(of => Circuit)
export class CircuitResolver {

    constructor(private readonly database: DatabaseService) {
    }

    @Query(returns => [Circuit], { description: "Get all the F1 circuits from around the world" })
    async circuits(): Promise<Circuit[]> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from circuits"))[0].map(r => this.convert(r));
    }

    @Query(returns => Circuit, { description: "Get a F1 circuit by its identifier", nullable: true })
    async circuit(@Arg("id") id: string): Promise<Circuit> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from circuits where circuitId = ?", id))[0].map(r => this.convert(r))[0];
    }

    private convert(r: RowDataPacket) : Circuit {
        let c = new Circuit();
        c.id = r["circuitId"];
        c.reference = r["circuitRef"];
        c.name = r["name"];
        c.location = r["location"];
        c.country = r["country"];
        c.latitude = r["lat"];
        c.longitude = r["lng"];
        c.altitude = r["alt"];
        c.url = r["url"];
        return c;
    }
}   