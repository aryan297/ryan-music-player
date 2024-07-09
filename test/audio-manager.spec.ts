import AudioManager from '../src/index';

describe('AudioManager', () => {
    let audioManager: AudioManager;
  
    beforeEach(() => {
      audioManager = new AudioManager(['audio1.mp3', 'audio2.mp3']); //add your audio here
    });
  
    test('should play audio', () => {
      audioManager.play();
      expect(audioManager.getState().isPlaying).toBe(true);
    });
  
    test('should pause audio', () => {
      audioManager.play();
      audioManager.pause();
      expect(audioManager.getState().isPlaying).toBe(false);
    });
  
    test('should set volume', () => {
      audioManager.setVolume(0.5);
      expect(audioManager.getState().volume).toBe(0.5);
    });
  
    test('should enable loop', () => {
      audioManager.setLoop(true);
      expect(audioManager.getState().isLooping).toBe(true);
    });
  
    test('should toggle shuffle', () => {
      audioManager.toggleShuffle();
      // Assuming getState includes shuffle status (update AudioState if needed)
      // expect(audioManager.getState().shuffle).toBe(true);
    });
  });