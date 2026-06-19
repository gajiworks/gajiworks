window.gajiWorksMedia = {
    playMuted(video) {
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        const playAttempt = video.play();
        if (playAttempt) playAttempt.catch(() => { });
    }
};
