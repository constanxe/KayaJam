<img src="src/assets/brand.jpg" alt="KayaJam">

**Note that this branch has been <u>deprecated</u>.**

## 1. Pre-requisites

If you have already configured your setup, you may skip to the [next section](#2-server-setup).

Else, if running the app for the first time:

- Add `.env.local` to the root directory <small>(unless already provided by us)</small>. It should contain **client keys and secrets** for <i>Spotify</i> and <i>PubNub</i> for the functioning of the data and chat features.
- Ensure you have **Node.js** installed for `npm`. <small>(If not, download at https://nodejs.org/en/download/)</small>
- Run `npm i` to install the packages. <small>(If running the development version)</small>


## 2. Server setup

Run the following command.
```
json-server --watch db.json
```

> You should now have access to the mock server at `localhost:3000` or otherwise.

:warning: Do not close this window - leave it running while running the client.


## 3. Project client setup (development)
Run `client-development.bat`.

**Alternatively**, run the following command.
```
npm run serve
```

> You should now be able to access the app at `localhost:8080` or otherwise.


## FAQ

### Java setup
1. Download the **JDK** (https://www.oracle.com/java/technologies/downloads/).
2. Run the **installation**. Take note of the <i>download path</i>.
3. Go to your System Properties > Advanced > **Environment Variables**.
	- Under System environment variables, click **New** and fill in the following for the respective fields:
		- <u>Name:</u>		`JAVA_HOME`
		- <u>Value:</u>	<i><< download path >></i>
	- Find your `Path` environment variable and click **Edit**. Append this to the end of the string:
		- <i><< download path >></i>`\bin`
