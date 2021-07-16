import express from "express";
// const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen({ port: 3000 });
