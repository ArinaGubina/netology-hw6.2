
import './App.css'

import { useState, useEffect } from 'react';

import PostsList from './components/PostsList';

import exchange from '/exchange.png'
import send from '/send.png'


function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const exchangeItems = () => {
    fetch('https://localhost/backend/',{
      "method" : "GET",
      "headers": {
      'Content-Type': 'text/html; charset=UTF-8'
    }
    })
       .then((res) => res.json())
       .then((data) => {
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }

  useEffect(() => {
    exchangeItems();
  }, []);

  const deleteItem = (event : React.MouseEvent<HTMLElement>) => {
    const element = event.target;
    if (element instanceof Element) {  
      fetch('https://localhost/backend/?delete='+element.getAttribute("data-uid"),
      {
        "method" : "GET",
        "headers": {
        'Content-Type': 'text/html; charset=UTF-8'
        }
      })
       .then((res) => res.json())
       .then((data) => {
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
    }    
  }

  const sendItem = () => {
    fetch('https://localhost/backend/',
      {
        "method" : "POST",
        "headers": {
        'Content-Type': 'application/json'
        },
        "body" : JSON.stringify({
          id: 0,
          content: content
        }),
      })
       .then((res) => res.json())
       .then((data) => {
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }

  const setValue = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }

  return (
    <div className='container'>
      <div className='exchange'>Notes
        <button className='btn' onClick={exchangeItems}><img src={exchange}/></button>
      </div>
      <PostsList items={posts} deleteItem={deleteItem}/>
      <div className='new-note-label'>New note</div>
      <label className='send'>
        <textarea className='note-textarea' value={content} onChange={setValue}/>
        <button className='btn' onClick={sendItem}><img src={send}/></button>
      </label>
    </div>
  )
}

export default App
