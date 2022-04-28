import { Arg, Query, Resolver } from "type-graphql";
import { F1Constructor } from "../types/F1Constructor";
import { Service } from "typedi";
import { DatabaseService } from "../services/DatabaseService";
import { RowDataPacket } from "mysql2";

@Service()
@Resolver(of => F1Constructor)
export class ConstructorResolver {

    constructor(private readonly database: DatabaseService) {
    }

    @Query(returns => [F1Constructor], { description: "Get all the F1 constructors" })
    async f1constructors(): Promise<F1Constructor[]> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from constructors"))[0].map(r => this.convert(r));
    }

    @Query(returns => F1Constructor, { description: "Get a F1 constructor by its identifier", nullable: true })
    async f1constructor(@Arg("id") id: string): Promise<F1Constructor> {
        return (await this.database.getConnection().promise().query<RowDataPacket[]>("select * from constructors where constructorId = ?", id))[0].map(r => this.convert(r))[0];
    }

    private convert(r: RowDataPacket) : F1Constructor {
        let c = new F1Constructor();
        c.id = r["constructorId"];
        c.reference = r["constructorRef"];
        c.name = r["name"];
        c.nationality = r["nationality"];
        c.url = r["url"];
        return c;
    }
}   