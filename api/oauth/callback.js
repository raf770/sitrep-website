const CLIENT_ID = 'Ov23liARAoLHgeuGCiYp';
const CLIENT_SECRET = 'f3ff5fad619ffd26556132febde472b5dc919da0';

export default async function handler(req, res) {
  const { code } = req.query;
  
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code })
  });
  
  const data = await response.json();
  const token = data.access_token;
  
  const script = token
    ? `<script>
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({token, provider:'github'})}',
          '*'
        );
        window.close();
      </script>`
    : `<script>
        window.opener.postMessage('authorization:github:error:access denied','*');
        window.close();
      </script>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(script);
}
