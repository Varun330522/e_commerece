import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { Header } from "./_components/header";

export default async function Home() {
  return (
    <main >
        <Header />
        <CrudShowcase />
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
