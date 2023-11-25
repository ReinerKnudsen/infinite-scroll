const imageContainer = document.getElementById('image-container');
const spinnerElement = document.getElementById('spinner');

let ready = false;
let imagesLoaded = 0;
let photosArray = [];
let imageCount = 5;   // start with 5 images for slower network
const apiKey  = 'z9hUWq3vIrbTFhlHa9DaYGRxR6ggu1HUbpxxFwLTGrQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`

function imageLoaded(){
	imagesLoaded++;
	if( imagesLoaded === imageCount) {
		ready = true;
		spinnerElement.hidden = true;
		imageCount = 20;			// after first load, increase number of images
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
	}
}

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
		
		// Event Listener to check when images are finished loading
		img.addEventListener('load', imageLoaded)
		
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
		displayPhotos();
	} catch(error) {
		console.log('Fehler beim Laden der Images von Unsplash: ', error);
	}
}

window.addEventListener('scroll', () => {
	if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		imagesLoaded = 0;
		ready = false;
		getImages();
		}
	})

getImages();