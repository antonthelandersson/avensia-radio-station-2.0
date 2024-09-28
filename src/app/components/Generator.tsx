'use client';

const Generator = () => {
  const baseUrl = 'http://localhost:3000';

async function customGenerateAudio(payload?: any) {
  const url = `${baseUrl}/api/generate`;
  const data = {
    prompt:
      "A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.",
    make_instrumental: false,
    wait_audio: false,
  };
  const test = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      prompt:
      "A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.",
    make_instrumental: false,
    wait_audio: false,
    }),
    headers: {"Content-Type": "application/json"},
  })
  const what = fetch(test).then((response) => { console.log(response)});
}
  
  const onClick = async () => {
    await customGenerateAudio();
  }
  

  const onInputChange = () => { };

  return (
    <>
      <div>
        <h1>Generate song</h1>
        <button onClick={onClick}>Send</button> 
      </div>
    </>
  )
}

export default Generator;