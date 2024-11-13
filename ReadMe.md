DOWNLOAD the dockor 

RUN Below Commands to run the create and run the database 

docker ps 
docker exec -it [id] bash
su postgres
psql
\l
\c [database name]
npx prisma migrate dev --name [any description]
\d
\d [model name]



SELECT * from "Employee"