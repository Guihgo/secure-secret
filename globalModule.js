#!/usr/bin/env node

const fs = require('fs')
const { join } = require('path')
var SecureSecret = require('./index.js')
let vIndex = -1

const INSTALLED_VERSION = JSON.parse(fs.readFileSync(join(__dirname, "package.json")))["version"]
const MAJOR_VERSION = Number(INSTALLED_VERSION.split(".")[0])

if (["--version", "-v", "-V"].includes(process.argv[2])) {
    console.log(`Installed SecureSecret Version: ${INSTALLED_VERSION}`)
    process.exit()
}

const version = (process.argv.find((arg, index) => {
    if (/@v\d/.test(arg.toLowerCase())) {
        vIndex = index
        return true
    }
    return false
}))
if (version) {
    const v = version.replace("@", "").replace("v", "V")
    if (!SecureSecret[v]) {
        console.error(`SecureSecret${version} not exists.`);
        process.exit();
    }
    console.warn(`Using SecureSecret${version}.`)
    process.argv.splice(vIndex,1)
    SecureSecret[v].cli()
} else {
    SecureSecret[`V${MAJOR_VERSION}`].cli();
}

