export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const keycloakInitOptions = {
	url: process.env.VUE_APP_KEYCLOAK_URL,
	realm: process.env.VUE_APP_KEYCLOAK_REALM,
	clientId: process.env.VUE_APP_KEYCLOAK_CLIENT,
	onLoad: 'login-required'
}

/*
	* general options for toast notification
	* usage: this.$toasted.{type}("{message}", toastedOptions)
	documentation: https://github.com/shakee93/vue-toasted
*/
export const toastedOptions = {
	position: 'bottom-right',
	duration: '4000',
	keepOnHover: true,
	action: {
		text: 'X',
		onClick: (e, toastObject) => {
			toastObject.goAway(0);
		}
	}
}

export const defaultUser = {
  "username": "",
  "profile_pic": "https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png",
  "description": "No description yet",
  "facebook_un": "",
  "twitter_un": "",
  "telegram_un": "",
  "theme": "dark",
  "fav_albums": [],
  "feat_albums": [],
  "fav_artists": [],
  "feat_artists": [],
  "location": [0,0],
  "saved_chats": [],
  "id": 0
}
