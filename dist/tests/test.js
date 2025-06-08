"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const goodCoords = ["39.10873550425521", "-94.58421356524701"];
const outOfBoundsCoords = ["200.10", "-199.58"];
const wrongFormatCoords = ["39.0997° N", "94.5786° W"];
afterAll((done) => {
    app_1.server.close(done);
});
describe('GET /', () => {
    it('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/weather?lat=${goodCoords[0]}&lon=${goodCoords[1]}`);
        expect(response.status).toBe(200);
    }));
    it('should return 400 for no coordinates input', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/weather`);
        expect(response.status).toBe(400);
        expect(response.text).toBe('ERROR: Required values for latitude and or longitude not provided.');
    }));
    it('should return 422 for out of bounds coordinates', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/weather?lat=${outOfBoundsCoords[0]}&lon=${outOfBoundsCoords[1]}`);
        expect(response.status).toBe(422);
        expect(response.text).toBe('ERROR: Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.');
    }));
    it('should return 422 for incorrectly formatted coordinates', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/weather?lat=${wrongFormatCoords[0]}&lon=${wrongFormatCoords[1]}`);
        expect(response.status).toBe(422);
        expect(response.text).toBe('ERROR: Invalid latitude or longitude format. Please verify latitude and longitude are in decimal degrees notation.');
    }));
});
//# sourceMappingURL=test.js.map