# secure-secret
module to help secure files using nodejs

## installing and running  (npm coming soon)
1. Clone repository
2. In directory runs: 
` node index.js <param1> <param2> <param3> <param4> <param5>`

 "param1": Cipher Algorithms (required)

 "param2": Password to encript or decript (required)
 
 "param3": 0 to enctipt || 1 to decript (required)
 
 "param4": filname (path) to encript or decript (required)
 
 "param5": output encripted filname (path) (optional)
 
 ## Checkout Cipher Class for help
 [crypto -> class cipher](https://nodejs.org/api/crypto.html#crypto_class_cipher)
 
### Cipher Algorithms
* aes-128-cbc
* aes-128-ecb
* aes-192-cbc
* aes-192-ecb
* aes-256-cbc
* aes-256-ecb
* base64
* bf
* bf-cbc
* bf-cfb
* bf-ecb
* bf-ofb
* camellia-128-cbc
* camellia-128-ecb
* camellia-192-cbc
* camellia-192-ecb
* camellia-256-cbc
* camellia-256-ecb
* cast
* cast-cbc
* cast5-cbc
* cast5-cfb
* cast5-ecb
* cast5-ofb
* des
* des-cbc
* des-cfb 
* des-ecb
* des-ede
* des-ede-cbc
* des-ede-cfb
* des-ede-ofb
* des-ede3
* des-ede3-cbc
* des-ede3-cfb
* des-ede3-ofb
* des-ofb
* des3
* desx
* idea
* idea-cbc
* idea-cfb
* idea-ecb
* idea-ofb
* rc2
* rc2-40-cbc
* rc2-64-cbc
* rc2-cbc
* rc2-cfb
* rc2-ecb
* rc2-ofb
* rc4
* rc4-40
* seed
* seed-cbc
* seed-cfb
* seed-ecb
* seed-ofb
* zlib
