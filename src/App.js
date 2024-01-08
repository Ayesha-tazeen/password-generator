import{useCallback,useEffect,useState,useRef} from 'react';
import './App.css';


function App() {
  const [length, setLength] = useState()
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (character) str += "?/.,-_~`@!$%^&*"

    for (let i = 1; i < length; i++) {
      let num = Math.floor(Math.random() * str.length + 1)
      console.log(num)
      pass += str.charAt(num)
    }
    setPassword(pass)

  }, [length, numberAllowed, character, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, character ,passwordGenerator])

  useRef()
  const passwordref = useRef(null)
  const copyToClipboard = useCallback(async () => {
    if (password) {
      passwordref.current.select();
      passwordref.current.setSelectionRange(0, password.length);
      await navigator.clipboard.writeText(password);
    }
  }, [passwordref, password]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#52b2cf', color: 'orange', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{ flexDirection: 'column', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', border: '5px solid white', borderRadius: '10px', padding: '15px' }}>
          <div style={{ fontSize: '30px' }}>
            <b>Password Generator</b>
          </div>
          <div style={{ marginTop: '20px' }} >
            <input ref={passwordref} style={{ fontSize: '25px', border: '3px solid black', marginLeft: "10px", borderRadius: '10px' }} type='text' value={password} placeholder='password' readOnly={!password}  ></input>
            <button onClick={copyToClipboard} style={{ backgroundColor: 'blue', borderRadius: "10px", color: 'white', marginLeft: '10px' }}>copy</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <input type='range' min={4} max={20} style={{ cursor: 'pointer', color: 'blue' }} onChange={(e) => { setLength(e.target.value) }}></input><label>Length: {length}</label>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberinput' onChange={() => { setNumberAllowed((Prev) => !Prev) }} style={{ padding: '10px', marginLeft: '10px' }}></input>
            <label htmlFor='numberinput'>Number</label>

            <input type='checkbox' defaultChecked={character} id="charinput" onChange={() => { setCharacter((Prev) => !Prev) }} style={{ padding: '10px', marginLeft: '10px' }}></input>
            <label htmlFor='charinput'>Special character</label>
          </div>

        </div>


      </div>



      

    </>

  )
}
export default App;
