type AudioState = {
    isPlaying: boolean;
    isLooping: boolean;
    currentTime: number;
    duration: number;
    volume: number;
  };
  
  class AudioManager {
    private audio: HTMLAudioElement;
    private playlist: string[];
    private currentTrackIndex: number;
    private state: AudioState;
    private shuffle: boolean;
  
    constructor(src: string | string[]) {
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
      this.audio.addEventListener('loadeddata', () => this.updateState());
      this.audio.addEventListener('timeupdate', () => this.updateState());
      this.audio.addEventListener('ended', () => this.handleTrackEnd());
      this.audio.addEventListener('error', (e) => console.error('Audio error:', e));
    }
  
    play(): void {
      this.audio.play();
      this.state.isPlaying = true;
    }
  
    pause(): void {
      this.audio.pause();
      this.state.isPlaying = false;
    }
  
    stop(): void {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.state.isPlaying = false;
    }
  
    seek(time: number): void {
      this.audio.currentTime = time;
      this.state.currentTime = time;
    }
  
    setVolume(volume: number): void {
      this.audio.volume = volume;
      this.state.volume = volume;
    }
  
    setLoop(loop: boolean): void {
      this.audio.loop = loop;
      this.state.isLooping = loop;
    }
  
    toggleShuffle(): void {
      this.shuffle = !this.shuffle;
    }
  
    nextTrack(): void {
      if (this.shuffle) {
        this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
      } else {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      }
      this.changeTrack();
    }
  
    previousTrack(): void {
      if (this.shuffle) {
        this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
      } else {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
      }
      this.changeTrack();
    }
  
    changeTrack(): void {
      this.audio.src = this.playlist[this.currentTrackIndex];
      this.audio.load();
      this.play();
    }
  
    on(event: string, handler: () => void): void {
      this.audio.addEventListener(event, handler);
    }
  
    off(event: string, handler: () => void): void {
      this.audio.removeEventListener(event, handler);
    }
  
    private updateState(): void {
      this.state.currentTime = this.audio.currentTime;
      this.state.duration = this.audio.duration;
    }
  
    private handleTrackEnd(): void {
      if (this.state.isLooping) {
        this.play();
      } else {
        this.nextTrack();
      }
    }
  
    getCurrentTime(): number {
      return this.audio.currentTime;
    }
  
    getDuration(): number {
      return this.audio.duration;
    }
  
    getState(): AudioState {
      return this.state;
    }
  }
  
  export default AudioManager;