"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    employees(page: Int!, limit: Int!): EmployeeConnection!
    employee(id: Int!): Employee
`;
