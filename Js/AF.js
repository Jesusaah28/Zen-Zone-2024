const videos = [
    './Videos/video1.mp4'
    ];

function playRandomVideo() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Limpiar el contenido previo

    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];

    const videoElement = document.createElement('video');
    videoElement.src = randomVideo;
    videoElement.controls = true;
    videoElement.autoplay = true;

    videoContainer.appendChild(videoElement);
}
