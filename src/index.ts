import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import EmployeeService from "./services/user";
import cors from 'cors'

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(cors())

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });


  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        // @ts-ignore
        const token = req.headers["token"];

        try {
          const employee = EmployeeService.decodeJWTToken(token as string);

          return { employee };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
