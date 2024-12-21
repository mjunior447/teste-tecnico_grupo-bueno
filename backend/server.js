import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./database.js";

const app = express();
const port = 8080;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.log("Erro ao buscar usuarios");
    console.error(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await createUser(name, email);
    res.status(201).send(user);
  } catch (error) {
    console.log("Erro ao criar usuario");
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
