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
exports.resolvers = void 0;
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    employee: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.employee) {
            const user = yield user_1.default.getEmployeeById(parameters.id);
            return user;
        }
        throw new Error("Unauthorized");
    }),
    employees: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.employee) {
            const { page = 1, limit = 10 } = parameters;
            const skip = (page - 1) * limit;
            const users = yield user_1.default.getEmployees({ skip, take: limit });
            const totalCount = yield user_1.default.countEmployees();
            return {
                employees: users || [],
                total: totalCount || 0
            };
        }
        throw new Error("Unauthorized");
    })
};
const mutations = {
    createEmployee: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.default.createEmployee(payload);
        return res;
    }),
    updateEmployee: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        // if (context && context.employee && context.employee.role === 'admin') {
        const res = yield user_1.default.updateEmployee(payload);
        return res;
        // }
        // throw new Error("Only admin can update employee");
    }),
    Login: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_1.default.Login({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }),
    deleteEmployee: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(context.employee);
        // if (context && context.employee && context.employee.role === 'admin') {
        const res = yield user_1.default.deleteEmployee(parameters.id);
        return res;
        // }
        // throw new Error("Only admin can delete employee");
    })
};
exports.resolvers = { queries, mutations };
