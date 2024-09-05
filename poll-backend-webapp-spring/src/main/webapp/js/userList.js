
document.querySelectorAll("[data-delete-link]")
	.forEach(button => button.addEventListener('click', async (ev) => {
	// envoyer une requete GET sur /users/??/delete
	await fetch(button.getAttribute('data-delete-link'));
	button.parentElement.remove();
}));