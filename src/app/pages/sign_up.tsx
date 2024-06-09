import React, { useState } from 'react';

interface SignUpProps {
  onVerification: (email: string, name: string, password: string) => void;
  onLogin: () => void;
}

export function SignUp({ onVerification, onLogin }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    onVerification(email, name, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
