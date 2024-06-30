const UNSPLASH_API_KEY = 'PF84305TzsrYmNhbeQ_eFxAuK05xPylX0zC44pz__4U'; // Replace with your Unsplash API key

document.getElementById('randomImageButton').addEventListener('click', function () {
    fetchRandomImage().then(randomImageURL => {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = randomImageURL;
        document.getElementById('imageURL').value = randomImageURL; // Set image URL in input field
    }).catch(error => {
        console.error('Error fetching random image:', error);
        alert('Failed to fetch random image. Please try again later.');
    });
});

document.getElementById('memeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const imageURL = document.getElementById('imageURL').value;
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;

    if (imageURL !== "") {
        createMeme(imageURL, topText, bottomText);
    } else {
        alert("Please enter an image URL or fetch a random image.");
    }

    document.getElementById('memeForm').reset();
});

function createMeme(imageURL, topText, bottomText) {
    const memeContainer = document.getElementById('memeContainer');

    const memeContainerItem = document.createElement('div');
    memeContainerItem.classList.add('meme-container-item');

    const memeDiv = document.createElement('div');
    memeDiv.classList.add('meme');

    const memeImg = document.createElement('img');
    memeImg.src = imageURL;

    const topTextDiv = document.createElement('div');
    topTextDiv.classList.add('top-text');
    topTextDiv.textContent = topText;

    const bottomTextDiv = document.createElement('div');
    bottomTextDiv.classList.add('bottom-text');
    bottomTextDiv.textContent = bottomText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        memeContainer.removeChild(memeContainerItem); // Remove meme container item when delete button is clicked
    });

    memeDiv.appendChild(memeImg);
    memeDiv.appendChild(topTextDiv);
    memeDiv.appendChild(bottomTextDiv);

    memeContainerItem.appendChild(memeDiv);
    memeContainerItem.appendChild(deleteButton); // Append delete button to meme container item (below memeDiv)

    memeContainer.appendChild(memeContainerItem);
}

async function fetchRandomImage() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`);
    const data = await response.json();
    return data.urls.regular;
}
