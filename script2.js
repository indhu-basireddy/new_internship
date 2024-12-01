const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");
const stopButton = document.getElementById("stopButton");

const canvasContext = canvas.getContext("2d");

let videoStream;

// Start the camera and scan for QR codes
async function startCamera() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
        });
        video.srcObject = videoStream;

        video.addEventListener("play", () => {
            scanQRCode();
        });
    } catch (err) {
        console.error("Error accessing camera:", err);
        result.textContent = "Error accessing camera. Please try again.";
    }
}

// Stop the camera
function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        result.textContent = "Camera stopped.";
    }
}

// QR Code scanning function
function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
            result.textContent = QR Code Content: ${qrCode.data};
            stopCamera();
            return;
        }
    }

    requestAnimationFrame(scanQRCode);
}

stopButton.addEventListener("click", stopCamera);

// Initialize the camera on load
startCamera();
