// node worker/vapid-keys.mjs: generate the VAPID key pair once.
const { subtle } = globalThis.crypto;
const kp = await subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
const raw = new Uint8Array(await subtle.exportKey("raw", kp.publicKey));
const pub = Buffer.from(raw).toString("base64url");
const jwk = await subtle.exportKey("jwk", kp.privateKey);
console.log("Public key (goes in web/config.js and as VAPID_PUBLIC_KEY):\n" + pub + "\n");
console.log("Private key (secret, VAPID_PRIVATE_JWK; never commit):\n" + JSON.stringify(jwk));
