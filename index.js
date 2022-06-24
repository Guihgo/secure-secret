const crypto = require('crypto');
const fs = require('fs');
const { join } = require('path');

class SecureSecretV1 {
  constructor() { }
  cli() {
    var params = [
      { nome: "<Algorithm>", valor: process.argv[2] || null },
      { nome: "<Password>", valor: process.argv[3] || null },
      { nome: "<0: encript || 1: decript>", valor: process.argv[4] || null },
      { nome: "<Input file to encript or decrypt>", valor: process.argv[5] || null },
      { nome: "[Output file encripted]", valor: process.argv[6] || "secret.encripted" },
    ];
    var paramsComErro = [];
    var help = "securesecret ";
    params.forEach(function (param) {
      help += " " + param.nome;
      if (param.valor == null) { paramsComErro.push(param); }
    });
    if (process.argv[2] == "--help") {
      console.log(help);
      paramsComErro = [];
    }
    paramsComErro.forEach(function (param) {
      console.error("Param " + param.nome + " not found");
    });
    if (paramsComErro.length > 0) { return; }

    if (params[2].valor == 0) {
      fs.writeFileSync(params[4].valor, this.encrypt(params[0].valor, params[1].valor, fs.readFileSync(params[3].valor).toString()));
      console.log("File encripted: " + params[4].valor);
    }
    if (params[2].valor == 1) {
      console.log(this.decrypt(params[0].valor, params[1].valor, fs.readFileSync(params[3].valor).toString()));
    }
  }
  encrypt(algorithm, password, text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }
  decrypt(algorithm, password, text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
module.exports.V1 = new SecureSecretV1();

class SecureSecretV2 {
  constructor() { }
  cli() {
    var params = [
      { nome: "<Algorithm>", valor: process.argv[2] || null, example: "aes-256-ecb" },
      { nome: "<Password>", valor: process.argv[3] || null },
      { nome: "<0: to encrypt OR 1: to decrypt>", valor: process.argv[4] || null },
      { nome: "<Input file for to encrypt OR to decrypt>", valor: process.argv[5] || null, example: "myFile.txt" },
      { nome: "<Encrypted/Decrypted output file>", valor: process.argv[6] || null, example: "myFileEncrypted.enc" },
      { nome: "<Output/Input encoding>", valor: process.argv[7] || "hex", example: "hex | binary | base64" },
    ];
    var paramsComErro = [];
    var help = "securesecret ";
    params.forEach(function (param, index) {
      help += `\r\n\t${param.nome}`;
      if (param.valor == null) { paramsComErro.push({ ...param, index }); }
    });

    if (["--help", "-h", "-H"].includes(process.argv[2])) {
      console.log(help);
      paramsComErro = [];
    }
    paramsComErro.forEach(function (param) {
      console.error(`Param [${param.index}] ${param.nome} not found`);
    });
    if (paramsComErro.length > 0) { return; }

    params[5].valor = params[5].valor.toLowerCase()
    const supportedEncodings = ["hex", "binary", "base64"]
    if (!supportedEncodings.includes(params[5].valor)) {
      console.error(`Encoding not supported. Supported encoding: `, supportedEncodings);
      return
    }
    console.log("params[5].valor",params[5].valor)

    if (params[2].valor == 0) {
      fs.writeFileSync(params[4].valor, this.encrypt(params[0].valor, params[1].valor, fs.readFileSync(params[3].valor), params[5].valor));
      console.log("File encrypted to: " + params[4].valor);
    }
    if (params[2].valor == 1) {
      fs.writeFileSync(params[4].valor, this.decrypt(params[0].valor, params[1].valor, fs.readFileSync(params[3].valor), params[5].valor));
      console.log("File decrypted to: " + params[4].valor);
    }
  }
  getIVLengthByAlgorithm(algorithm) {
    if (algorithm.split("-")[2].toLowerCase() === "ecb") return 0
    if (algorithm.split("-")[2].toLowerCase() === "cbc") return 8
  }
  getKeyLengthByAlgorithm(algorithm) {
    return Number(algorithm.split("-")[1]) / 8
  }
  encrypt(algorithm, password, buffer, encoding) {
    const key = Buffer.alloc(this.getKeyLengthByAlgorithm(algorithm), password)
    const iv = Buffer.alloc(this.getIVLengthByAlgorithm(algorithm), password).toString("hex")

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    const dataBuffer = Buffer.from(cipher.update(buffer, undefined, encoding))

    const finalBuffer = Buffer.from(cipher.final(encoding))

    return Buffer.concat([dataBuffer, finalBuffer])
  }
  decrypt(algorithm, password, buffer, encoding) {
    if (typeof buffer === "string") buffer = Buffer.from(buffer)
    
    const key = Buffer.alloc(this.getKeyLengthByAlgorithm(algorithm), password)
    const iv = Buffer.alloc(this.getIVLengthByAlgorithm(algorithm), password).toString("hex")

    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    const dataBuffer = decipher.update(buffer.toString(), encoding)
    const finalBuffer = Buffer.from(decipher.final())

    return Buffer.concat([dataBuffer, finalBuffer])
  }
}
module.exports.V2 = new SecureSecretV2();

