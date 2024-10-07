import React, { useEffect, useState } from 'react'

const Login = () => {
  const [id,setID] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [pw,setPw] = useState(0);
  const [msg,setMsg] = useState([]);
  const [isEdit,setIsEdit]=useState(false);


  const url ="http://127.0.0.1:5000"


  const findUser = ()=>{
    let finduser= {name,email,pw}
    console.log("find user"+name+email+pw)
    fetch(url+"/login"+"/"+email+"/"+pw).then((response)=>response.json())
    .then((data)=>setMsg(data)).
    catch((error)=>setMsg("Incorrect details"))
    
}

  const resetUser=()=>{
      setName("");
      setEmail("");
      setPw(0);
  }

  return (
    <>
    <div>
    <h1>Login</h1>
    <label>Email:</label>
    <input type='text'placeholder='Enter Email ID' value={email} onChange={(event)=>setEmail(event.target.value)}></input><br/>
    <label>Password:</label>
    <input type='text'placeholder='Enter Password' value={pw} onChange={(event)=>setPw(event.target.value)}></input><br/>
    <button onClick={findUser}>Login</button>
    </div>
    <div>
        <p>{msg.message}</p>
    </div>
    </>
  )
}

export default Login


  
