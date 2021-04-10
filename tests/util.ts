import supertest from "supertest";
import { server } from "../src/server";

export const request: supertest.SuperTest<supertest.Test> = supertest(server);
