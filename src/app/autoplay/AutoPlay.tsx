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
    <div
      style={{
        textAlign: 'center',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80vw'
      }}>
      {currentMedia ? (
        <>
          <h2 style={{ fontSize: 24, marginBottom: 12}}>Now Playing: {currentMedia.title}</h2>
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
            style={{ marginBottom: 10}}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold'}}>Lyrics: </p>
            <p style={{ width: '50%'}}>{currentMedia.lyric}</p>
          </div>
          <button style={{ backgroundColor: '#092139', color: 'white', margin: '10px', padding: 5, borderRadius: 35, width: 100, height: 60 }} onClick={playRandomMedia} className='hover-button'>Next</button>
        </>
      ) : (
        <p>No media items available</p>
      )}
    </div>
  );
};