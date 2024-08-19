// Importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definir a rede
// bitcoin.networks.bitcoin => Rede Principal 
// bitcoin.networks.testnet => Rede de Teste 
const network = bitcoin.networks.testnet

// Derivação de endereço de carteiras HD
// `m/49'/0'/0'/0` => Principal 
// `m/49'/1'/0'/0` => Teste
const path = `m/49'/1'/0'/0`

// Criando mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raíz da carteira HD
let root = bip32.fromSeed(seed,network)

// Criando uma conta - par de chaves PVT e PUB keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("################################")
console.log("CARTEIRA GERADA")
console.log("--------------------------------")
console.log("Endereço: ",btcAddress)
console.log("Chave Privada: ",node.toWIF())
console.log("Seed: ",mnemonic)
console.log("################################")

