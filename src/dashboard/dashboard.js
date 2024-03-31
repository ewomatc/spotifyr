import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";

const onProfileClick = (event) => {
	event.stopPropagation();
	const profileMenu = document.querySelector("#profile-menu");
	profileMenu.classList.toggle("hidden");

	// check if the menu is open, if it is, get the logout element from the list, and handle a click on that logout element
	if (!profileMenu.classList.contains("hidden")) {
		profileMenu.querySelector("li#logout").addEventListener("click", logout);
	}
};

const loadUserProfile = async () => {
	const defaultImage = document.getElementById("default-image");
	const profileButton = document.getElementById("user-profile-btn");
	const displayNameElement = document.getElementById("display-name");

	const { display_name: displayName, images } = await fetchRequest(
		ENDPOINT.userInfo
	);

	// if the user has a profile image set, show it, if no show the default profile icon
	if (images?.length) {
		const [{ url }] = images;
		const userImage = url;
		const defaultImage = document.getElementById("default-image");
		if (defaultImage) {
			defaultImage.innerHTML = ""; // Clear the default SVG icon
			const imgElement = new Image();
			imgElement.src = userImage;
			// Add Tailwind CSS classes to the image element
			imgElement.classList.add("w-8", "h-8", "rounded-full", "bg-gray-300");
			defaultImage.appendChild(imgElement);
		}
	} else {
		const defaultImage = document.getElementById("default-image");
		if (defaultImage) {
			defaultImage.classList.remove("hidden");
		}
	}

	profileButton.addEventListener("click", onProfileClick);

	// show the users display name
	displayNameElement.textContent = displayName;
};

const onPlaylistItemClicked = (event) => {
	console.log(event.target);
};

// featured playlist
const loadPlaylist = async (endpoint, elementId) => {
	const {
		playlists: { items },
	} = await fetchRequest(endpoint);
	const playlistItemsSection = document.getElementById(`${elementId}`);
	for (let { name, description, images, id } of items) {
		const playlistItem = document.createElement("section");
		playlistItem.className =
			"mx-2 my-2 p-4 rounded-md border-2 border-white border-solid hover:cursor-pointer";
		playlistItem.id = id;
		playlistItem.setAttribute("data-type", "playlist");
		playlistItem.addEventListener("click", onPlaylistItemClicked);

		const [{ url }] = images;
		playlistItem.innerHTML = `
    <img src="${url}" alt="${name}" class='rounded-md object-contain shadow'>
    <h2 class="py-2 text-base font-semibold truncate">${name}</h2>
    <h3 class="text-sm text-secondary line-clamp-2">${description}</h3>
`;
		playlistItemsSection.appendChild(playlistItem);
	}
};

const loadPlaylists = () => {
	loadPlaylist(ENDPOINT.featuredPlaylist, "featured-playlist-items");
	loadPlaylist(ENDPOINT.toplists, "top-playlist-items");
};

document.addEventListener("DOMContentLoaded", () => {
	loadUserProfile();
	loadPlaylists();
	// close the profile menu when any part on the main document/page is clicked
	document.addEventListener("click", () => {
		const profileMenu = document.querySelector("#profile-menu");
		if (!profileMenu.classList.contains("hidden")) {
			profileMenu.classList.add("hidden");
		}
	});
});
