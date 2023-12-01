 'use client'
 import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
  const [text,setText] = useState('');
  const router = useRouter();

  function submit() {
    router.push('/'+text);
  }

  return(
    <div className=" bg-gradient-to-b from-[#000000] to-[#130F40] min-h-screen cont">
      <div className="cont2">
        <center className="sync">SyncPulse</center>
        <h1>Next-Gen Collaboration and Productivity platform</h1>
      <input type="text" placeholder="Room Code" required name="name" value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={submit}>Join</button>
      </div>
    </div>
  )
}