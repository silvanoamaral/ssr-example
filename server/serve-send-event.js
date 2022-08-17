const sendInterval = 5000;

function writeServerSendEvent(res, sseId, data) {
  res.write("data: " + JSON.stringify({ msg: data, id: sseId }) + "\n\n");
}

export function sendServerSendEvent(req, res, globalVersion) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sseId = new Date().toLocaleTimeString();

  console.log("passando aqui", globalVersion);

  const intervalId = setInterval(function () {
    if (globalVersion) {
      writeServerSendEvent(res, sseId, new Date().toLocaleTimeString());

      globalVersion = false;
    }
  }, sendInterval);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
}
