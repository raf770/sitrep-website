export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path, content, message } = req.body;
  const token = process.env.GH_TOKEN;

  // Get existing SHA
  let sha = null;
  try {
    const r = await fetch(`https://api.github.com/repos/raf770/sitrep-website/contents/${path}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const d = await r.json();
    if (d.sha) sha = d.sha;
  } catch(e) {}

  const body = { message, content: btoa(unescape(encodeURIComponent(content))), branch: 'main' };
  if (sha) body.sha = sha;

  const response = await fetch(`https://api.github.com/repos/raf770/sitrep-website/contents/${path}`, {
    method: 'PUT',
    headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  res.status(response.ok ? 200 : 400).json(data);
}
