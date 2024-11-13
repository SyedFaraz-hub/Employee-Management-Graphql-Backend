export const typeDefs = `#graphql
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
