import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config'
import { baseURL, userID } from "../helpers/data.js";

describe("Api tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get(`${baseURL}/BookStore/v1/Books`)
      .inspect();
    expect(response.statusCode).to.eql(200);
    expect(JSON.stringify(response.body)).to.include(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
  });

  it.skip("Create a user", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/User`)
      .withBody({
        userName: "TestWarez_user4",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });
});
