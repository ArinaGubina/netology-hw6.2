
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://localhost/backend',{
      "method" : "GET",
      "mode" : "cors",
      "headers": {
      'Content-Type': 'text/html; charset=UTF-8'
    }
    })
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  console.log(posts);

  return (
    <>
      
    </>
  )
}

export default App
