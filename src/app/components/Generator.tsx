"use client";

import { useState } from "react";
const baseUrl = "http://localhost:3000";

const Generator = () => {
  const [prompt, setPrompt] = useState<string>('');

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
    const req = fetch(test).then((response) => response.json()).then(data => data);
    return req;
  }

  const onClick = async () => {
    await customGenerateAudio(prompt);
  };

  const onInputChange = (value: string) => {
    setTimeout(() => {
      setPrompt(value);
    }, 1000)
    
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{ fontSize: 32 }}>Generate a song</h1>
        <div>
          <label>Prompt a song: </label>
          <input style={{border: '1px solid black', padding: 5, borderRadius: 10}} onChange={e => onInputChange(e.target.value)} />
          <button style={{ backgroundColor: '#092139', color: 'white', margin: '10px', padding: 5, borderRadius: 10 }} onClick={onClick}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Generator;

//092139
