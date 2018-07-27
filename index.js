const crypto = require('crypto');
const fs = require('fs');

class SecureSecret {
  constructor() {
    var params = [
      {nome: "<Algorithms>", valor: process.argv[2] || null},
      {nome: "<Password>", valor: process.argv[3] || null},
      {nome: "<0: encript | 1: decript>", valor: process.argv[4] || null},
      {nome: "<Input file to encript or decrypt>", valor: process.argv[5] || null},
      {nome: "[Output file encripted] (Optinal)", valor: process.argv[6] || "secret.encripted"},
    ];
    var paramsComErro = [];
    params.forEach(function(param){
      if(param.valor==null) { paramsComErro.push(param); }
    });
    paramsComErro.forEach(function(param){
      console.error("Param "+param.nome+" not found");
    });
    if(paramsComErro.length>0) { return; }

    if(params[2].valor==0){
      fs.writeFileSync(params[4].valor, this.encrypt(params[0].valor,params[1].valor,fs.readFileSync(params[3].valor).toString()));
      console.log("File encripted: "+params[4].valor);
    }
    if(params[2].valor==1){
      console.log(this.decrypt(params[0].valor,params[1].valor,fs.readFileSync(params[3].valor).toString()));
    }
  }
  encrypt(algorithm,password,text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  }
  decrypt(algorithm,password,text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
module.exports = new SecureSecret();
