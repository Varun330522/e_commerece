"use client"
import { useState } from 'react';
import { CreatePost } from "~/app/_components/create-post";
import { Header } from "./_components/header";
import { SignUp } from "./pages/sign_up";
import { Login } from "./pages/login";

export default  function Home() {
  const [isSignedUp, setIsSignedUp] = useState(false); // Replace this with your actual condition

  return (
    <main>
      <Header />
      {isSignedUp ? <SignUp setIsSignedUp={setIsSignedUp}/> : <Login setIsSignedUp={setIsSignedUp}/>}
    </main>
  );
}

async function CrudShowcase() {
  // const latestPost = await api.post.getLatest();
  const latestPost = 1
  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p>Your most recent post: {'Hello'}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
    </div>
  );
}
