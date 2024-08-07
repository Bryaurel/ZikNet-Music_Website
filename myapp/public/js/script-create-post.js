document.addEventListener('DOMContentLoaded', () => {
    const postTypeSelect = document.getElementById('post-type');
    const imageUpload = document.getElementById('image-upload');
    const videoUpload = document.getElementById('video-upload');
    const voiceRecord = document.getElementById('voice-record');
    const textNote = document.getElementById('text-note');
    const createPostForm = document.getElementById('create-post-form');

    postTypeSelect.addEventListener('change', (event) => {
        const value = event.target.value;
        imageUpload.style.display = value === 'image' ? 'block' : 'none';
        videoUpload.style.display = value === 'video' ? 'block' : 'none';
        voiceRecord.style.display = value === 'voice' ? 'block' : 'none';
        textNote.style.display = value === 'text' ? 'block' : 'none';
    });

    const startRecordingBtn = document.getElementById('start-recording');
    const stopRecordingBtn = document.getElementById('stop-recording');
    const voicePreview = document.getElementById('voice-preview');
    let mediaRecorder;
    let audioChunks = [];

    startRecordingBtn.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        stopRecordingBtn.disabled = false;
        startRecordingBtn.disabled = true;
    });

    stopRecordingBtn.addEventListener('click', () => {
        mediaRecorder.stop();
        stopRecordingBtn.disabled = true;
        startRecordingBtn.disabled = false;

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            voicePreview.src = audioUrl;
        });
    });

    // Gestion de la soumission du formulaire
    createPostForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(createPostForm);

        // Ici, vous pouvez ajouter le code pour envoyer les données du formulaire via AJAX si nécessaire
        // Exemple : envoi des données via fetch ou XMLHttpRequest

        // Redirection vers la page de profil après soumission
        window.location.href = 'profile.html'; // Redirection vers la page de profil
    });
});