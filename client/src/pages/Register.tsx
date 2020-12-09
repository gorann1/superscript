import React, { useState } from 'react';

interface Props {}
  
  
  export const Register: React.FC<Props> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



  return <form onSubmit={e => {
    e.preventDefault()
    console.log('form submitted');
    console.log(email, password);
  }} action="">
    <div>
      <input 
      value={email} 
      placeholder="email" 
      onChange={e => {
        setEmail(e.target.value)
      }}
      />
    </div>
    <div>
      <input 
      value={password} 
      type="tepasword" 
      placeholder="password" 
      onChange={e => {
        setPassword(e.target.value)
      }}
      />
    </div>
    <button type="submit">Register</button>
  </form>;
}

