const imageContainer = document.getElementById('image-container');
const spinner = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const imageCount = 10;
const apiKey  = 'z9hUWq3vIrbTFhlHa9DaYGRxR6ggu1HUbpxxFwLTGrQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`


function setAttributes( element, attributes) {
	for( const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

function displayPhotos() {
	photosArray.forEach( (photo) => {
		// Create anker component
		const item = document.createElement('a');
		setAttributes(item, 
			{	href: photo.links.html, 
				target: '_blank',
			}
		);
		// Create image component
		const img = document.createElement('img');
		setAttributes(img, 
			{	src: photo.urls.regular, 
				alt: photo.alt_descriptiom, 
				title: photo.alt_description,
			}
		);
		// Create attribution below the image
		const attributionText = document.createTextNode(`creator: ${photo.user.name}`);
		const attribution = document.createElement('p');
		attribution.classList.add('attribution');
		attribution.appendChild(attributionText);
		// Nest img into a
		item.appendChild(img);
		// Nest a into container
		imageContainer.appendChild(item);
		imageContainer.appendChild(attribution);
	})
}

async function getImages() {
	try{
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		console.log(photosArray);
		displayPhotos();
	} catch(error) {

	}
}

getImages();