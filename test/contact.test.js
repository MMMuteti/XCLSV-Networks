import assert from "node:assert/strict";
import test from "node:test";
import { app } from "../server/index.js";

const valid = {
  name: "Amina Kariuki",
  email: "amina@example.com",
  service: "Website Development",
  message: "We need a label system for a spice range.",
};

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => new Promise((resolve, reject) => {
  server.close((error) => (error ? reject(error) : resolve()));
}));

async function post(body) {
  const response = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return { status: response.status, data };
}

test("valid contact payload returns 200", async () => {
  const { status, data } = await post(valid);
  assert.equal(status, 200);
  assert.equal(data.ok, true);
  assert.match(data.message, /xclsvnetworks@outlook.com/);
  assert.match(data.message, /\+254 \(0\) 726 898 381/);
  assert.match(data.message, /\+254 \(0\) 732 211 721/);
});

test("empty contact payload returns 400", async () => {
  const { status, data } = await post({});
  assert.equal(status, 400);
  assert.equal(data.ok, false);
  assert.ok(data.errors.name);
  assert.ok(data.errors.email);
  assert.ok(data.errors.service);
  assert.ok(data.errors.message);
});

test("unknown service returns 400", async () => {
  const { status, data } = await post({ ...valid, service: "Brand identity" });
  assert.equal(status, 400);
  assert.equal(data.ok, false);
  assert.ok(data.errors.service);
  assert.equal(data.errors.name, undefined);
  assert.equal(data.errors.email, undefined);
  assert.equal(data.errors.message, undefined);
});

test("invalid contact payload returns 400", async () => {
  const { status, data } = await post({
    name: "A",
    email: "not-an-email",
    service: "Unknown",
    message: "too short",
  });
  assert.equal(status, 400);
  assert.equal(data.ok, false);
  assert.ok(data.errors.name);
  assert.ok(data.errors.email);
  assert.ok(data.errors.service);
  assert.ok(data.errors.message);
});
