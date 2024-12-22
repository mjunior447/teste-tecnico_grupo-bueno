import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./database.js";
import cors from "cors";

const app = express();
const port = 8080;
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/users", async (_, res) => {
  try {
    const users = await getUsers();
    console.log(`Usuarios buscados com sucesso!`);

    res.status(200).type("application/json").send(users);
  } catch (error) {
    console.error("Erro ao buscar usuarios");
    console.error(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new Error("Propriedades faltando no corpo da requisição");
    }

    const user = await createUser(name, email);
    console.log(`Usuario criado!\nNome=${user.name} | Email=${user.email}`);

    res.status(201).send(user);
  } catch (error) {
    console.error("Erro ao criar usuario");
    console.error(error);

    // trata erro de violacao de chave unica
    if (error.errno === 1062) {
      res.status(422).send({
        code: 1062,
        message: "Ja existe um usuario com esse e-mail",
      });
    }
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new Error("Propriedades faltando no corpo da requisição");
    }

    const userId = req.params.id;
    await updateUser(userId, name, email);

    console.log(`Usuario com id ${userId} foi atualizado!`);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao atualizar usuario");
    console.error(error);

    // trata erro de violacao de chave unica
    if (error.errno === 1062) {
      res.status(422).send({
        code: 1062,
        message: "Ja existe um usuario com esse e-mail",
      });
    }
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);

    console.log(`Usuario com id ${userId} foi excluido!`);
    res.status(204).send();
  } catch (error) {
    console.log("Erro ao excluir usuario");
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
