const express = require('express');
const app = express();

const {OAuth2Client} = require('google-auth-library');

const GOOGLE_CLIENT_ID = '668142444122-pf726ksm73gid94kl4appgt6commo42b';
const GOOGLE_CLIENT_SECRET = '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';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const token = 'asdgausdfjafdukafgdhagskdibakugf';
async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  console.log(userid);
}
verify().catch(console.error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
