import request from 'supertest';
import { app, server } from '../src/app';

const goodCoords = ["39.10873550425521", "-94.58421356524701"]
const outOfBoundsCoords = ["200.10", "-199.58"]
const wrongFormatCoords = ["39.0997° N", "94.5786° W"]

afterAll((done) => {
  server.close(done);
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get(`/weather?lat=${goodCoords[0]}&lon=${goodCoords[1]}`);
    expect(response.status).toBe(200);
  });

  it('should return 422 for out of bounds coordinates', async () => {
    const response = await request(app).get(`/weather?lat=${outOfBoundsCoords[0]}&lon=${outOfBoundsCoords[1]}`);
    expect(response.status).toBe(422)
    expect(response.text).toBe('Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.');
  });

  it('should return 422 for incorrectly formatted coordinates', async () => {
    const response = await request(app).get(`/weather?lat=${wrongFormatCoords[0]}&lon=${wrongFormatCoords[1]}`);
    expect(response.status).toBe(422)
    expect(response.text).toBe('Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.');
  });
});
