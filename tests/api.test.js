import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config'
import { baseURL, userID, user, isbn } from "../helpers/data.js";

let token_response

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
  })

  it.skip("Generate token", async ()=>{
    const response = await spec()
    .post(`${baseURL}/Account/v1/GenerateToken`)
    .withBody({
      "userName": user,
      "password": process.env.SECRET_PASSWORD,
    })
    .inspect();
    token_response = response.body.token;
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3RXYXJlel91c2VyNCIsInBhc3N3b3JkIjoiVGVzdDEyMyEiLCJpYXQiOjE3MzA5MDEwOTl9.umWZ2mO-GLq54ERwJs0ls7FL43UzZ0JIk1_mK0H0cXo
  })

  it("Add a book", async ()=>{
    const response = await spec()
    .post(`${baseURL}/BookStore/v1/Books`)
    .withBody({
      "userId": userID,
      "collectionOfIsbns": [
        {
          "isbn": isbn
        }
      ]    
    })
    .inspect()
    expect(response.statusCode).to.eql(200);

  })
});
