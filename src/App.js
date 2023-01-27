import {useState} from 'react'
import {  Configuration, OpenAIApi } from "openai"

function App() {
  const configuration =new Configuration({
    apiKey:"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"
  });

  const openai=new OpenAIApi(configuration);

  const [prompt,setPrompt] = useState("");
  const [result,setResult] = useState("")
  const [loading,setLoading] = useState(false)


  const handleClick = async() =>{
    setLoading(true)
    try {
      const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: prompt,
        temperature:0.5,
        max_tokens:1000,
      })
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div className="App">
    
      <div className='main'>
      <p style={{
        fontSize:'20px',
        textAlign:'center',
        fontWeight:'bold',
        color:'rgb(54, 54, 54)',

      
      }}>Texty.FU</p>
       <textarea
       
       type="text"
       value={prompt}
       onChange={(e)=> setPrompt(e.target.value)}
       placeholder="Write your prompt"
       className='textarea'
       ></textarea>
       <div className='btn-div'>
       <button
       onClick={handleClick}
       disabled={loading || prompt.length ===0 }
       className="btn"
       >
       {loading ? "Generating..." : "Generate"}
       </button>
       </div>
       <div className='report'>
       <pre className='result'>{result}</pre>
       </div>
       
      </div>
    </div>
  );
}

export default App;
