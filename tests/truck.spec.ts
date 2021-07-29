import request, { Response } from "supertest"
import { InversifyExpressServer } from "inversify-express-utils"
import { ContainerLoader } from "../src/container";

describe("Truck Service", () => {
    const server = new InversifyExpressServer(ContainerLoader.load()).build()

    it("calls /api/trucks, returns success response", async () => {
        const response: Response = await request(server)
            .get("/api/trucks")
            .expect(200)

        expect(response.ok)
        expect(response.body).toMatchObject({

        })
    })
})