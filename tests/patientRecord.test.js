const db = require("./db");
const agent = db.agent

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => {await db.close()});

test("add patient record", async () => {
  let test = {
    first_name: "Akash",
    last_name: "Thakar",
    age: 23,
    gender: "male",
    address: "Ahmedabad",
    mobile: "9923452315",
    email: "ravi42@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();

  let patientRecord = {
    date_time: new Date(),
    data_type: "blood_pressure",
    reading: { x: 100 },
    patient: res.body.data._id,
  };

  const response = await agent
    .post(`/api/patient/${res.body.data._id}/record`)
    .send({ ...patientRecord });
    console.log(response.error, response.body)
  expect(response.statusCode).toEqual(200);
  expect(response.body.data.date_time).toEqual(patientRecord.date_time.toISOString());
  expect(response.body.data.data_type).toEqual(patientRecord.data_type);
  expect(response.body.data.patient).toEqual(patientRecord.patient);
});

test("get patient record", async () => {
  let test = {
    first_name: "Akash",
    last_name: "Thakar",
    age: 23,
    gender: "male",
    address: "Ahmedabad",
    mobile: "9923452315",
    email: "ravi42@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();

  let patientRecord = {
    date_time: new Date(),
    data_type: "blood_pressure",
    reading: { x: 100 },
    patient: res.body.data._id,
  };

  const response = await agent
    .post(`/api/patient/${res.body.data._id}/record`)
    .send({ ...patientRecord });
  expect(response.statusCode).toEqual(200);

  const getResponse = await agent
    .get(`/api/patient/${res.body.data._id}/record/${response.body.data._id}`)
    .send();
  expect(getResponse.statusCode).toEqual(200);
  expect(getResponse.body.data.date_time).toEqual(patientRecord.date_time.toISOString());
  expect(getResponse.body.data.data_type).toEqual(patientRecord.data_type);
  expect(getResponse.body.data.patient).toEqual(patientRecord.patient);
});

test("update patient record", async () => {
  let test = {
    first_name: "Akash",
    last_name: "Thakar",
    age: 23,
    gender: "male",
    address: "Ahmedabad",
    mobile: "9923452315",
    email: "ravi42@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();

  let patientRecord = {
    date_time: new Date(),
    data_type: "blood_pressure",
    reading: { x: 100 },
    patient: res.body.data._id,
  };

  const response = await agent
    .post(`/api/patient/${res.body.data._id}/record`)
    .send({ ...patientRecord });
  expect(response.statusCode).toEqual(200);

  let updatedPatientRecord = {
    date_time: new Date(),
    data_type: "respiratory_rate",
    reading: { x: 10 },
    patient: res.body.data._id,
  };

  const putResponse = await agent
    .put(`/api/patient/${res.body.data._id}/record/${response.body.data._id}`)
    .send({ ...updatedPatientRecord });
  expect(putResponse.statusCode).toEqual(200);
  expect(putResponse.body.data.date_time).toEqual(
    updatedPatientRecord.date_time.toISOString()
  );
  expect(putResponse.body.data.data_type).toEqual(
    updatedPatientRecord.data_type
  );
  expect(putResponse.body.data.patient).toEqual(updatedPatientRecord.patient);
});

test("delete patient record", async () => {
  let test = {
    first_name: "Akash",
    last_name: "Thakar",
    age: 23,
    gender: "male",
    address: "Ahmedabad",
    mobile: "9923452315",
    email: "ravi42@gmail.com",
  };
  const res = await agent.post("/api/patient").send({ ...test });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeTruthy();

  let patientRecord = {
    date_time: new Date(),
    data_type: "blood_pressure",
    reading: { x: 100 },
    patient: res.body.data._id,
  };

  const response = await agent
    .post(`/api/patient/${res.body.data._id}/record`)
    .send({ ...patientRecord });
  expect(response.statusCode).toEqual(200);

  const deleteResponse = await agent
    .delete(`/api/patient/${res.body.data._id}/record/${response.body.data._id}`)
    .send();
  expect(deleteResponse.statusCode).toEqual(200);
});
