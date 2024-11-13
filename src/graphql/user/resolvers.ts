import EmployeeService, { CreateUserPayload, UpdateUserPayload } from "../../services/user";

const queries = {

  employee: async (_: any, parameters: any, context: any) => {
    if (context && context.employee) {
      const user = await EmployeeService.getEmployeeById(parameters.id);
      return user;
    }
    throw new Error("Unauthorized");
  },
  employees: async (_: any, parameters: { page: number; limit: number }, context: any) => {
   
    if (context && context.employee) {
      const { page = 1, limit = 10 } = parameters;

      const skip = (page - 1) * limit;

      const users = await EmployeeService.getEmployees({ skip, take: limit });
      const totalCount = await EmployeeService.countEmployees();
      return  {
        employees: users || [],
        total: totalCount || 0
      };
    }
    throw new Error("Unauthorized");
  }
};

const mutations = {
  createEmployee: async (_: any, payload: CreateUserPayload) => {
    const res = await EmployeeService.createEmployee(payload);
    return res;
  },
  updateEmployee: async (_: any, payload: UpdateUserPayload, context: any) => {
    // if (context && context.employee && context.employee.role === 'admin') {
      const res = await EmployeeService.updateEmployee(payload);
      return res;
    // }
    // throw new Error("Only admin can update employee");
  },
  Login: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await EmployeeService.Login({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  deleteEmployee: async (_: any, parameters: { id: number }, context: any) => {
    console.log(context.employee);
    // if (context && context.employee && context.employee.role === 'admin') {
      
      const res = await EmployeeService.deleteEmployee(parameters.id);
      return res;
    // }
    // throw new Error("Only admin can delete employee");
  }
};

export const resolvers = { queries, mutations };
