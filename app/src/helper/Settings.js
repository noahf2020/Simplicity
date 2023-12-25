
import { getAuth, onAuthStateChanged } from "firebase/auth";
var CryptoJS = require("crypto-js");

export  function secureConnection(){
    console.log(getAuth())
    const dataToEncrypt = 'sensitiveData';
    const secretKey = 'yourSecretKey';
    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
    
}