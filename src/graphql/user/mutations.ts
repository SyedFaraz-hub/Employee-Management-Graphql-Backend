export const mutations = `#graphql
       createEmployee(name: String!, age: Int, group: String!, subjects: [String!]!, email: String!, password: String!, role: String): Employee!
       updateEmployee(id: Int!, name: String, age: Int, group: String, subjects: [String!],  email: String, password: String, role: String): Employee!
       Login(email: String!, password: String!): String!
       deleteEmployee(id: Int!): Employee!
`;
