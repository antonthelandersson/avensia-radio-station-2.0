import React, { useEffect, useState } from 'react';
//const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://avensia-radio-station-20.vercel.app';

export interface Song {
  id: string;
  title: string;
  image_url: string;
  lyric: string;
  audio_url: string;
  video_url: string;
  created_at: string;
  model_name: string;
  status: string;
  gpt_description_prompt: string;
  prompt: string;
  type: string;
  tags: string;
}

const SongsList: React.FC = () => {
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

  return (
    <div>
      <h1>Media Library</h1>
      <div
        style={{
          display: 'grid',
          gridGap: 10,
          height: '80vh',
          width: '80vw',
          }}
        className='songlist-container-grid'
      >
      {songs.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <img src={item.image_url} alt={item.title} />
          <audio controls src={item.audio_url}></audio>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SongsList;