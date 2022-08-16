import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import { sendServerSendEvent } from "./serve-send-event";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/events", function (req, res) {
  sendServerSendEvent(req, res);
});

app.get("/payment", function (req, res) {
  return res.send("ok");
});

app.get("/", function (req, res) {
  return res.send("[OK] Carregou o server... ");
});

app.get("/server-client", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: "Some error happened",
      });
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
