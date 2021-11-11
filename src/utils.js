export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
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
