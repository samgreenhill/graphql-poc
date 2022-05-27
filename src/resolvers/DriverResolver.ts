import { Arg, Query, Resolver } from "type-graphql";
import { Driver } from "../types/Driver";
import { Service } from "typedi";
import { DatabaseService } from "../services/DatabaseService";
import { RowDataPacket } from "mysql2";

@Service()
@Resolver(of => Driver)
export class DriverResolver {

    constructor(private readonly database: DatabaseService) {
    }

    @Query(returns => [Driver], { description: "Get all the F1 drivers from around the world" })
    async drivers(): Promise<Driver[]> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from drivers"))[0].map(r => this.convert(r));
    }

    @Query(returns => Driver, { description: "Get a F1 driver by their identifier", nullable: true })
    async driver(@Arg("id") id: string): Promise<Driver> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from drivers where driverId = ?", id))[0].map(r => this.convert(r))[0];
    }

    private convert(r: RowDataPacket) : Driver {
        let d = new Driver();
        d.id = r["driverId"];
        d.reference = r["circuitRef"];
        d.number = r["number"];
        d.code = r["code"];
        d.forename = r["forename"];
        d.surname = r["surname"];
        d.dob = r["dob"];
        d.nationality = r["nationality"];
        d.url = r["url"];
        return d;
    }
}   