const CLIENT_ID = 'Ov23liARAoLHgeuGCiYp';

export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: 'https://sitrep-proxy.vercel.app/api/oauth/callback',
    scope: 'repo',
    state: Math.random().toString(36).substr(2)
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
