# Secure Secret V2
Helper for secure files using native module NodeJS::crypto

## installing
` nmp install securesecret -g`

## using
` securesecret <param1> <param2> <param3> <param4> <param5>`

 "param1": Cipher Algorithms (required)

 "param2": Password to encript or decript (required)

 "param3": 0: to encrypt OR 1: to decrypt (required)

 "param4": Input file (path) for to encrypt OR to decrypt (required)

 "param5": Encrypted/Decrypted output file (path) (required)

### Cipher Algorithms
* aes-128-cbc
* aes-128-ecb
* aes-192-cbc
* aes-192-ecb
* aes-256-cbc
* aes-256-ecb

 ## Checkout Cipher Class for help
 [crypto -> class cipher](https://nodejs.org/api/crypto.html#crypto_class_cipher)

 ## Using others versions

 Add @v{Major_Version} in command line

 Example: 

 ```bash
 securesecret @v1 onePassword 1 secret.enc
 ```

 ```bash
 securesecret @v2 onePassword 1 secret.enc secret.txt
 ```