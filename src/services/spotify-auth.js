import axios from 'axios';
import qs from 'qs';


/* initialise a SpotifyWebApi object */
const SpotifyWebApi = require('spotify-web-api-js');
var SpotifyApi = new SpotifyWebApi();

/*
  generate access token from locally stored client
  credentials & set it to the SpotifyWebApi object

  adapted from https://gist.github.com/donstefani/70ef1069d4eab7f2339359526563aab2
*/
async () => {
  const clientId = process.env.VUE_APP_CLIENT_ID;
  const clientSecret = process.env.VUE_APP_CLIENT_SECRET;

  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );

    let accessToken = response.data.access_token;
    SpotifyApi.setAccessToken(accessToken);
    return accessToken;

  } catch (error) {
    console.log(error);
  }
};

export default SpotifyApi;
