import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

var allowedOrigins = [
  "http://localhost:3000/",
  "https://star-payment-front.herokuapp.com",
];

var corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin) return callback(null, true);
  //   if (allowedOrigins.indexOf(origin) === -1) {
  //     var msg =
  //       "The CORS policy for this site does not " +
  //       "allow access from the specified Origin.";
  //     return callback(new Error(msg), false);
  //   }
  //   return callback(null, true);
  // },
  optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 8000;

const app = express();

let globalVersion = false;

const sendInterval = 1000;

function writeServerSendEvent(res, sseId, data, isDisabled) {
  res.write(
    "data: " + JSON.stringify({ msg: data, id: sseId, isDisabled }) + "\n\n"
  );
}

export function sendServerSendEvent(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sseId = new Date().toLocaleTimeString();

  const intervalId = setInterval(function () {
    if (globalVersion) {
      writeServerSendEvent(res, sseId, new Date().toLocaleTimeString(), false);

      globalVersion = false;
    }
  }, sendInterval);

  writeServerSendEvent(res, sseId, new Date().toLocaleTimeString(), true);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);

    writeServerSendEvent(res, sseId, new Date().toLocaleTimeString(), true);
  });
}

app.get("/events", cors(corsOptions), function (req, res) {
  sendServerSendEvent(req, res);
});

app.post("/payment", cors(corsOptions), function (req, res) {
  globalVersion = true;

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
