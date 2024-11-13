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
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const JWT_SECRET = "$uperM@n@123";
;
class EmployeeService {
    static generateHash(salt, password) {
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static getEmployeeById(id) {
        return db_1.prismaClient.employee.findUnique({ where: { id } });
    }
    static countEmployees() {
        return db_1.prismaClient.employee.count();
    }
    static getEmployees(pagination) {
        const employees = db_1.prismaClient.employee.findMany({
            skip: pagination.skip,
            take: pagination.take,
        });
        return employees;
    }
    static createEmployee(payload) {
        const { name, age, group, subjects, role, email, password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const hashedPassword = EmployeeService.generateHash(salt, password);
        return db_1.prismaClient.employee.create({
            data: {
                name,
                age,
                group,
                subjects,
                salt,
                email,
                role,
                password: hashedPassword,
            },
        });
    }
    static updateEmployee(payload) {
        const { id, name, age, group, subjects, email, password, role } = payload;
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (age !== undefined)
            updateData.age = age;
        if (group !== undefined)
            updateData.group = group;
        if (subjects !== undefined)
            updateData.subjects = subjects;
        if (email !== undefined)
            updateData.email = email;
        if (role !== undefined)
            updateData.role = role;
        if (password) {
            const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
            const hashedPassword = EmployeeService.generateHash(salt, password);
            updateData.password = hashedPassword;
            updateData.salt = salt;
        }
        return db_1.prismaClient.employee.update({
            where: { id },
            data: updateData,
        });
    }
    static deleteEmployee(id) {
        return db_1.prismaClient.employee.delete({ where: { id } });
    }
    static getEmployeeByEmail(email) {
        return db_1.prismaClient.employee.findUnique({ where: { email } });
    }
    static Login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const employee = yield EmployeeService.getEmployeeByEmail(email);
            if (!employee)
                throw new Error("user not found");
            const userSalt = employee.salt;
            const usersHashPassword = EmployeeService.generateHash(userSalt, password);
            if (usersHashPassword !== employee.password)
                throw new Error("Incorrect Password");
            // Gen Token
            const token = jsonwebtoken_1.default.sign({ id: employee.id, email: employee.email, role: employee.role }, JWT_SECRET);
            return token;
        });
    }
    static decodeJWTToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.default = EmployeeService;
