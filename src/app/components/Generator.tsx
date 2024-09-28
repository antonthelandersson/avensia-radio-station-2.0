"use client";

import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3000";

const Generator = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [promptSent, setPromptSent] = useState<boolean>(false);
  const [noPrompt, setNoPrompt] = useState<boolean>(false);

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
    if (prompt === '') {
      setNoPrompt(true);
      return;
    }
    await customGenerateAudio(prompt);
    setPromptSent(true);
    setPrompt('');
  };

  const onInputChange = (value: string) => {
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
        <div>
          <label>Prompt a song: </label>
          <input style={{border: '1px solid black', padding: 5, borderRadius: 10}} onChange={e => onInputChange(e.target.value)} value={prompt} />
          <button 
            style={{ backgroundColor: promptSent ? 'darkgreen' : '#092139', color: 'white', margin: '10px', padding: 5, borderRadius: 10, width: 70 }} 
            onClick={onClick}
          >
             {promptSent ? '✔' : 'Send'}
          </button>
        </div>
        {
          noPrompt && <div style={{color: 'red'}}>A prompt is needed</div>
        }
      </div>
    </>
  );
};

export default Generator;

//092139
