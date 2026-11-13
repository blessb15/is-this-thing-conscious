// VAPID (RFC 8292) with WebCrypto. Beeps carry no payload, so no message encryption is needed.
const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));

export async function vapidHeaders(endpoint, { privateJwk, publicKey, subject }, now = Date.now()) {
  const key = await crypto.subtle.importKey("jwk", privateJwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const aud = new URL(endpoint).origin;
  const unsigned = `${enc({ typ: "JWT", alg: "ES256" })}.${enc({ aud, exp: Math.floor(now / 1000) + 12 * 3600, sub: subject })}`;
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(unsigned));
  return { Authorization: `vapid t=${unsigned}.${b64url(sig)}, k=${publicKey}` };
}

export async function sendBeep(subscription, vapid) {
  const headers = {
    ...(await vapidHeaders(subscription.endpoint, vapid)),
    TTL: "180", // if it can't arrive within the 3-minute timebox, the push service drops it
    Urgency: "high",
    "Content-Length": "0",
  };
  return fetch(subscription.endpoint, { method: "POST", headers });
}
