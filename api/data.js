const NPOINT_URL = "https://api.npoint.io/087c1c834254ad10ff4b";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const r = await fetch(`${NPOINT_URL}?_t=${Date.now()}`);
      if (!r.ok) return res.status(r.status).json({ error: "Upstream error" });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const r = await fetch(NPOINT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      if (!r.ok) return res.status(r.status).json({ error: "Upstream error" });
      const data = await r.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: "Proxy error", message: e.message });
  }
}
