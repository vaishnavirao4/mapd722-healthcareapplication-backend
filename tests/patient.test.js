const db = require("./db");
const agent = db.agent

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

test("add patient", async () => {
  let test = {
    first_name: "Krishna",
    last_name: "Rao",
    age: 23,
    gender: "male",
    address: "Hyderabad",
    mobile: "9923452315",
    email: "kittu@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();
});

test("get patient", async () => {
  let test = {
    first_name: "Krishna",
    last_name: "Raor",
    age: 23,
    gender: "male",
    address: "Hyderabad",
    mobile: "9923452315",
    email: "kittu@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();


  const response = await agent.get(`/api/patient/${res.body.data._id}`).send();
  expect(response.statusCode).toEqual(200);
  expect(response.body.data.first_name).toEqual(test.first_name);
  expect(response.body.data.last_name).toEqual(test.last_name);
  expect(response.body.data.age).toEqual(test.age);
  expect(response.body.data.gender).toEqual(test.gender);
  expect(response.body.data.address).toEqual(test.address);
  expect(response.body.data.email).toEqual(test.email);
  expect(response.body.data.mobile).toEqual(test.mobile);

});

test("update patient", async () => {
  let test = {
    first_name: "Krishna",
    last_name: "Rao",
    age: 23,
    gender: "male",
    address: "Hyderabad",
    mobile: "9923452315",
    email: "kittu@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();

  let newTest = {
    first_name: "Vaishnavi",
    last_name: "Santhapuri",
    age: 21,
  };

  const response = await agent.put(`/api/patient/${res.body.data._id}`).send({...newTest});
  expect(response.statusCode).toEqual(200);
  expect(response.body.data.first_name).toEqual(newTest.first_name);
  expect(response.body.data.last_name).toEqual(newTest.last_name);
  expect(response.body.data.age).toEqual(newTest.age);
});

test("delete patient", async () => {
  let test = {
    first_name: "Krishna",
    last_name: "Rao",
    age: 23,
    gender: "male",
    address: "Hyderabad",
    mobile: "9923452315",
    email: "kittu@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();


  const response = await agent.get(`/api/patient/${res.body.data._id}`).send();
  expect(response.statusCode).toEqual(200);

  const deleteResponse = await agent.delete(`/api/patient/${res.body.data._id}`).send();
  expect(deleteResponse.statusCode).toEqual(200);

});
