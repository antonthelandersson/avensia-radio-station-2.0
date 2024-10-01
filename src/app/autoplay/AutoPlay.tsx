import React, { useState, useEffect, useRef } from 'react';
import { Song } from '../songs/Songs';
//const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://avensia-radio-station-20.vercel.app';

export const AutoPlay: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchAllSongs();
  }, []);

  async function fetchAllSongs() {
    const url = `${baseUrl}/api/get`;
    const test = new Request(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const req = await fetch(test).then((response) => response.json()).then(data => data);
    setSongs(req);
    return req;
  }
  const [currentMedia, setCurrentMedia] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to select a random media item
  const playRandomMedia = () => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentMedia(songs[randomIndex]);
    }
  };

  // Auto-play the audio when `currentMedia` changes
  useEffect(() => {
    if (currentMedia && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentMedia]);

  // Handle media end event to play another random song
  const handleAudioEnded = () => {
    playRandomMedia();
  };

  // Set the initial media when component mounts
  useEffect(() => {
    playRandomMedia();
  }, [songs]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px',display: 'flex',
    flexDirection: 'column',
    alignItems: 'center' }}>
      {currentMedia ? (
        <>
          <h2>Now Playing: {currentMedia.title}</h2>
          <img
            src={currentMedia.image_url}
            alt={currentMedia.title}
            style={{ width: '200px', height: '200px' }}
          />
          <br />
          <audio
            ref={audioRef}
            src={currentMedia.audio_url}
            controls
            autoPlay
            onEnded={handleAudioEnded}
          />
          <p>Lyric: {currentMedia.lyric}</p>
          <button onClick={playRandomMedia}>Play Random Song</button>
        </>
      ) : (
        <p>No media items available</p>
      )}
    </div>
  );
};