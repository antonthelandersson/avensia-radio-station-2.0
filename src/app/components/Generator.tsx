"use client";

import { useEffect, useState } from "react";
//change when using 
// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://avensia-radio-station-20.vercel.app';

const Generator = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [promptSent, setPromptSent] = useState<boolean>(false);
  const [noPrompt, setNoPrompt] = useState<boolean>(false);
  const [lastSongId, setLastSongId] = useState<string>('');
  const [inputCount, setInputCount] = useState<number>(0);

  async function customGenerateAudio(prompt?: string) {
    const url = `${baseUrl}/api/generate`;
    const test = new Request(url, {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        make_instrumental: false,
        wait_audio: false,
        model: "chirp-v3-5|chirp-v3-0",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const req = await fetch(test).then((response) => response.json()).then(data => data);
    return req;
  }
  
  const onClick = async () => {
    if (prompt === '') {
      setNoPrompt(true);
      return;
    }
    const data: any = await customGenerateAudio(prompt);
    setLastSongId(data[0]?.id);
    setPromptSent(true);
    setPrompt('');
  };

  const onInputChange = (value: string) => {
    setInputCount(value?.length);
    setPrompt(value);
  };

  useEffect(() => {
    if (promptSent) {
      setTimeout(() => {
        setPromptSent(false);
      }, 3000);
    }
    if (noPrompt) {
      setTimeout(() => {
        setNoPrompt(false);
      }, 3000)
    }
  }, [promptSent, noPrompt]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{ fontSize: 32 }}>Generate a song</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label>Prompt a song: </label>
          <div>
            <textarea maxLength={250} style={{ border: '1px solid black', padding: 5, borderRadius: 10, height: 200, width: '50vw' }} onChange={e => onInputChange(e.target.value)} value={prompt} />
          </div>
          <span>{inputCount} / 250</span>
          <button 
            style={{ backgroundColor: promptSent ? 'darkgreen' : '#092139', color: 'white', margin: '10px', padding: 5, borderRadius: 10, width: 70 }} 
            onClick={onClick}
          >
            {promptSent ? '✔' : 'Send'}
          </button>
        </div>
        {
          noPrompt && <div style={{ color: 'red' }}>A prompt is needed</div>
        }
      </div>
      <div>
        {
          lastSongId && <a style={{ fontSize: 16, textDecoration: 'underline' }} href={`https://suno.com/song/${lastSongId}`} target='_blank' >Listen the generated song here</a>
        }
        <audio />
      </div>
    </>
  );
};

export default Generator;
