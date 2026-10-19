function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ success: false }, 403);
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    return jsonResponse({ success: false }, 503);
  }

  let token;
  try {
    const body = await request.json();
    token = typeof body.token === "string" ? body.token : "";
  } catch {
    return jsonResponse({ success: false }, 400);
  }

  if (!token || token.length > 2048) {
    return jsonResponse({ success: false }, 400);
  }

  const formData = new FormData();
  formData.set("secret", env.TURNSTILE_SECRET_KEY);
  formData.set("response", token);

  const clientIp = request.headers.get("CF-Connecting-IP");
  if (clientIp) formData.set("remoteip", clientIp);

  try {
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData }
    );
    const verification = await verificationResponse.json();
    const expectedHostname = new URL(request.url).hostname;
    const valid = verificationResponse.ok
      && verification.success === true
      && verification.hostname === expectedHostname;

    return jsonResponse({ success: valid }, valid ? 200 : 403);
  } catch {
    return jsonResponse({ success: false }, 502);
  }
}