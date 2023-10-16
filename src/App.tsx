import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import db from './firebase'
import { Timestamp, collection, getDocs } from 'firebase/firestore'

interface Posts {
  title: string
  text: string
  timeStamp: Timestamp
}

function App() {
  const [posts, setPosts] = useState<Posts[]>([])

  useEffect(() => {
    // データベースからデータを取得する。
    const postData = collection(db, 'posts')
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      const postArray: Posts[] = snapShot.docs.map((doc) => doc.data() as Posts) // データ型をPostに変換
      setPosts(postArray)
    })
  }, [])

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="App">
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
