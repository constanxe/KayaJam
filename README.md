<img src="src/assets/brand.jpg" alt="KayaJam">

## 1. Pre-requisites

If you have already configured your setup, you may skip to the [next section](#2-setup).

🚧 Else, if running the app for the first time:

### Keycloak (IAM)
1. Go to the `server` folder and **unzip** `keycloak-15.0.2.zip`.
2. Ensure you have the `JAVA_HOME` environment variable set to your Java SDK location. <small>(See FAQ if you did not already configure this)</small>

### Client
3. Add `.env.local` to the root directory <small>(unless already provided by us)</small>. It should contain **client keys and secrets** for <i>Spotify</i> and <i>PubNub</i> for the functioning of the data and chat features.
4. Ensure you have **Node.js** installed for `npm`. <small>(If not, download at https://nodejs.org/en/download/)</small>
5. Run `npm i` to install the packages. <small>(If running the development version)</small>

## 2. Setup

Go to the `.scripts` folder and run all of the files. <small>(Made for Windows. Edit the contents according to your OS if needed)</small>

⚠️ Do not close these windows - leave them all running at the same time.

> You should now be able to access the app at `localhost` at the following ports by default.
>	- <u>Client:</u> `8081`
>	- <u>Keycloak:</u> `8080`
>	- <u>Database:</u> `3000`

If otherwise specified by any of your CLI windows, do the following.
> - <u>Client:</u> Ensure the `publicPath` in `vue.config.js` is the same.
> - <u>Other:</u> Edit the `.env` file to reflect those ports for `VUE_APP_JSONSERVER_URL` or `VUE_APP_KEYCLOAK_URL`.

If first-time user, register for an account. <small>(If no verification email, check your spam inbox or quarantine page)</small>


## FAQ

### Java setup
1. Download the **JDK** (https://www.oracle.com/java/technologies/downloads/).
2. Run the **installation**. Take note of the <i>JDK download path</i>.
3. Go to your System Properties > Advanced > **Environment Variables**.
	- Under System environment variables, click **New** and fill in the following for the respective fields:
		- <u>Name:</u>		`JAVA_HOME`
		- <u>Value:</u>	<i>< JDK download path ></i>
	- Find your `Path` environment variable and click **Edit**. Add this to the end of the string or otherwise:
		- <i>< JDK download path ></i>`\bin`

### Solutions for possible errors for `json-server`

* `npm install -g json-server`
* "...cannot be loaded because running scripts is disabled on this system" -> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
