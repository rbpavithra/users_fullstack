import React, { useEffect, useState } from 'react'

const SignUp = () => {
  const [id,setID] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [pw,setPw] = useState(0);
  const [users,setUsers] = useState([]);
  const [isEdit,setIsEdit]=useState(false);


  const url ="http://127.0.0.1:5000"

  const addUser=()=> {
      let user = {name,email,pw};
      fetch(url+"/signup",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(user)
      }).then((response)=>response.json())
      .then((data)=>getUsers(data))
  }

  const resetUser=()=>{
      setName("");
      setEmail("");
      setPw(0);
  }

  useEffect(()=>{
    getUsers();
},[])

  const getUsers=()=>{ 
    fetch(url+'/signup')
    .then((response)=>response.json())
    .then((data)=>setUsers(data))
    .catch((error)=>console.log(error))
}
  return (
    <div>
    <h1>Sign Up</h1>
    <label>Name:</label>
    <input type='text'placeholder='Enter Name' value={name} onChange={(event)=>setName(event.target.value)}></input><br/>
    <label>Email Id:</label>
    <input type='text'placeholder='Enter Email ID' value={email} onChange={(event)=>setEmail(event.target.value)}></input><br/>
    <label>Password:</label>
    <input type='text'placeholder='Enter Password' value={pw} onChange={(event)=>setPw(event.target.value)}></input><br/>
    <button onClick={addUser}>Add Product</button>
    </div>
  )
}

export default SignUp