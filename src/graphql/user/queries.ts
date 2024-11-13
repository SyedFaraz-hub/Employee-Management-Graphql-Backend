
export const queries = `#graphql
    employees(page: Int!, limit: Int!): EmployeeConnection!
    employee(id: Int!): Employee
`;

