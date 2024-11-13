import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = "$uperM@n@123";

export interface CreateUserPayload {
  name: string;
  age: number;
  group: string;
  subjects: string[];
  email: string;
  role: string;
  password: string;
}

export interface UpdateUserPayload  {
  id: number;          
  age?: number;
  name?: string;
  group?: string;
  subjects?: string[];
  role?: string;
  email?: string;
  password?: string;    
};

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class EmployeeService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static getEmployeeById(id: number) {
    return prismaClient.employee.findUnique({ where: { id } });
  }

  public static countEmployees() {
    return prismaClient.employee.count();
  }

  public static getEmployees(pagination: { skip: number; take: number }) {
   const employees = prismaClient.employee.findMany({
      skip: pagination.skip,
      take: pagination.take,
    });

    return employees;    
  }

  public static createEmployee(payload: CreateUserPayload) {
    const { name, age, group, subjects, role, email, password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = EmployeeService.generateHash(salt, password);

    return prismaClient.employee.create({
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

  public static updateEmployee(payload: UpdateUserPayload) {
    const { id, name, age, group, subjects, email, password, role } = payload;
  
    const updateData: any = {};
    
    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = age;
    if (group !== undefined) updateData.group = group;
    if (subjects !== undefined) updateData.subjects = subjects;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
  
    if (password) {
      const salt = randomBytes(32).toString("hex");
      const hashedPassword = EmployeeService.generateHash(salt, password);
      updateData.password = hashedPassword;
      updateData.salt = salt;
    }
  
    return prismaClient.employee.update({
      where: { id },
      data: updateData,
    });
  }

  public static deleteEmployee(id: number) {
    return prismaClient.employee.delete({ where: { id } });
  }

  private static getEmployeeByEmail(email: string) {
    return prismaClient.employee.findUnique({ where: { email } });
  }

  public static async Login(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const employee = await EmployeeService.getEmployeeByEmail(email);
    if (!employee) throw new Error("user not found");

    const userSalt = employee.salt;
    const usersHashPassword = EmployeeService.generateHash(userSalt, password);

    if (usersHashPassword !== employee.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign({ id: employee.id, email: employee.email, role: employee.role }, JWT_SECRET);
    return token;
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}

export default EmployeeService;
