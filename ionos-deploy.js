const IONOS_API_KEY = 'c0e168c1053d4603b563bf69e292eede.A_jBzS_Bb363E_c6xIcDGlvTn_FYcTKsw22TT9g40p4vtefm47BbWDW4hZwRl3RZzytY8beije5qxuTwpIwr0A';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path, content } = req.body;

  const response = await fetch(`https://api.hosting.ionos.com/websites/v1/sites`, {
    method: 'GET',
    headers: {
      'X-API-Key': IONOS_API_KEY,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
