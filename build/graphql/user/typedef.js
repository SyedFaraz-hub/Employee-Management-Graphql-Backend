"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type Employee {
    id: Int!
    email: String!
    name: String!
    age: Int!
    group: String!
    subjects: [String!]!
    role: String!
  }

  type EmployeeConnection {
        employees: [Employee!]!
        total: Int
    }
`;
