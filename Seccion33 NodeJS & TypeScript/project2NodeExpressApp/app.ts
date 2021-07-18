import express from "express";
import routerTodo from "./routes/todos";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerTodo);

app.listen(3000);
