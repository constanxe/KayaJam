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
