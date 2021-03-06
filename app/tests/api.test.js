// __tests__/user-test.js
const calls = require('./calls');

// The assertion for a promise must be returned.
it('/api/users', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/users').then(data => expect(data[0].name).toEqual("Elena"));
});

it('/api/projects', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/projects').then(data => expect(data[0].name).toEqual("new Google"));
});

it('/api/tasks', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/tasks').then(data => expect(data[0].name).toEqual("Create DB Diagram"));
});

it('/api/users/:id projects', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/users/2').then(data => expect(data.participantProject[0].name).toEqual("new Google"));
});

it('/api/users/:id tasks', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/users/2').then(data => expect(data.participantTask[0].name).toEqual("Create DB Diagram"));
});

it('/api/users/:id Hours', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/users/3').then(data => expect(data.hours[0].id).toEqual(2));
});

it('/api/hours', () => {
  expect.assertions(1);
  return calls('http://localhost:3000/api/hours').then(data => expect(data[0].userId).toEqual(3));
});