import supertest from "supertest";
import { server } from "../src/server";

export const request: supertest.SuperTest<supertest.Test> = supertest(server);
process.env.PORT = "4000";
process.env.baseURL = `http://localhost:${process.env.PORT}`;
