'use strict';

var AudioManager = /** @class */ (function () {
    function AudioManager(src) {
        var _this = this;
        this.playlist = Array.isArray(src) ? src : [src];
        this.currentTrackIndex = 0;
        this.audio = new Audio(this.playlist[this.currentTrackIndex]);
        this.state = {
            isPlaying: false,
            isLooping: false,
            currentTime: 0,
            duration: this.audio.duration,
            volume: 1
        };
        this.shuffle = false;
        // Event handling for various audio events
        this.audio.addEventListener('loadeddata', function () { return _this.updateState(); });
        this.audio.addEventListener('timeupdate', function () { return _this.updateState(); });
        this.audio.addEventListener('ended', function () { return _this.handleTrackEnd(); });
        this.audio.addEventListener('error', function (e) { return console.error('Audio error:', e); });
    }
    AudioManager.prototype.play = function () {
        this.audio.play();
        this.state.isPlaying = true;
    };
    AudioManager.prototype.pause = function () {
        this.audio.pause();
        this.state.isPlaying = false;
    };
    AudioManager.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.state.isPlaying = false;
    };
    AudioManager.prototype.seek = function (time) {
        this.audio.currentTime = time;
        this.state.currentTime = time;
    };
    AudioManager.prototype.setVolume = function (volume) {
        this.audio.volume = volume;
        this.state.volume = volume;
    };
    AudioManager.prototype.setLoop = function (loop) {
        this.audio.loop = loop;
        this.state.isLooping = loop;
    };
    AudioManager.prototype.toggleShuffle = function () {
        this.shuffle = !this.shuffle;
    };
    AudioManager.prototype.nextTrack = function () {
        if (this.shuffle) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        }
        else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        this.changeTrack();
    };
    AudioManager.prototype.previousTrack = function () {
        if (this.shuffle) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        }
        else {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        }
        this.changeTrack();
    };
    AudioManager.prototype.changeTrack = function () {
        this.audio.src = this.playlist[this.currentTrackIndex];
        this.audio.load();
        this.play();
    };
    AudioManager.prototype.on = function (event, handler) {
        this.audio.addEventListener(event, handler);
    };
    AudioManager.prototype.off = function (event, handler) {
        this.audio.removeEventListener(event, handler);
    };
    AudioManager.prototype.updateState = function () {
        this.state.currentTime = this.audio.currentTime;
        this.state.duration = this.audio.duration;
    };
    AudioManager.prototype.handleTrackEnd = function () {
        if (this.state.isLooping) {
            this.play();
        }
        else {
            this.nextTrack();
        }
    };
    AudioManager.prototype.getCurrentTime = function () {
        return this.audio.currentTime;
    };
    AudioManager.prototype.getDuration = function () {
        return this.audio.duration;
    };
    AudioManager.prototype.getState = function () {
        return this.state;
    };
    return AudioManager;
}());

module.exports = AudioManager;
//# sourceMappingURL=index.cjs.js.map
