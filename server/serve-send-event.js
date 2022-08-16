const sendInterval = 5000;

function writeServerSendEvent(res, sseId, data) {
  res.write("id: " + sseId + "\n");
  res.write("data: new server event " + data + "\n\n");
}

export function sendServerSendEvent(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sseId = new Date().toLocaleTimeString();

  setInterval(function () {
    writeServerSendEvent(res, sseId, new Date().toLocaleTimeString());
  }, sendInterval);

  writeServerSendEvent(res, sseId, new Date().toLocaleTimeString());
}
