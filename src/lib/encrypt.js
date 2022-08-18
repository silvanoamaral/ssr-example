function JSEncryptFn(data) {
  const JSEncrypt = require("jsencrypt").default;
  let encode = new JSEncrypt();

  return encode.encrypt(data);
}

export function encryptFn(data) {
  if (typeof window === "undefined") {
    global.window = {};

    return JSEncryptFn(data);
  } else {
    return JSEncryptFn(data);
  }
}
