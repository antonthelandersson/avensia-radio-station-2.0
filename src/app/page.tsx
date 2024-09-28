import Generator from "./components/Generator";

export default function Home() {

  
// Suno API currently mainly implements the following APIs:

// \`\`\`bash
// - \`/api/generate\`: Generate music
// - \`/v1/chat/completions\`: Generate music - Call the generate API in a format 
//   that works with OpenAI’s API.
// - \`/api/custom_generate\`: Generate music (Custom Mode, support setting lyrics, 
//   music style, title, etc.)
// - \`/api/generate_lyrics\`: Generate lyrics based on prompt
// - \`/api/get\`: Get music list
// - \`/api/get?ids=\`: Get music Info by id, separate multiple id with ",".
// - \`/api/get_limit\`: Get quota Info
// - \`/api/extend_audio\`: Extend audio length
// - \`/api/concat\`: Generate the whole song from extensions
// \`\`\`

//For more detailed documentation, please check out the demo site:

//👉 [suno.gcui.ai/docs](https://suno.gcui.ai/docs)

  return (
    <>
      <Generator />
    </>
  )
}
