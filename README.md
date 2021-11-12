# KayaJam

## 1. Pre-requisites

If running the app for the first time:
1. Go to the `server` folder and **unzip** `keycloak-15.0.2.zip`.
2. Ensure you have the **JAVA_HOME** environment variable set to your Java SDK location for the server. (See FAQ if you did not already configure this)
3. Add `.env.local` to the root directory (unless already provided by us). It should contain **client keys and secrets** for Spotify and PubNub for the functioning of the data and chat features.
4. Ensure you have **NodeJs** installed for `npm`. (If not, download at https://nodejs.org/en/download/)
5. Run `npm i` to install the packages if running the development version.


## 2. Server setup

In the unzipped `keycloak-15.0.2` folder:
1. Go to `bin`
2. Run `standalone.bat` by double-clicking it or otherwise.

Alternatively, `cd server/keycloak-15.0.2/bin` then `standalone.bat` in your CLI.

> Do not close the command window - leave the server running while running the client.


## 3. Project client setup (development)

Run the following command to start to server.
```
npm run serve
```

> You should now be able to access the app at `localhost:8081` or otherwise.

If first-time user, register for an account. (If no verification email, check your spam inbox or quarantine page)


## FAQ

### Java setup
1. Download the Java JDK (https://www.oracle.com/java/technologies/downloads/).
2. Run the installation. Take note of the download path.
3. Go to your System Properties > Advanced > Environment Variables. Under System environment variables, click New and fill in `JAVA_HOME` for name and the download path for the value field.
3. Find your `Path` environment variable and click Edit. Append the download path with `\bin` behind to the end of the string.
