import React, { useState } from 'react'
import './App.css'
import copyIcon from './icons8-copy-24.png'
import showToast from 'crunchy-toast';
import axios from 'axios'
function App() {

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const  genratelink = async () => {
    const response = await axios.post('/link' ,{
    url,
    slug
    })
    setShortUrl(response?.data?.data?.shortUrl)
  }
  const copyShortUrl = ()=>{
    navigator.clipboard.writeText(shortUrl);
    showToast('copy to clickboard', 'success', 2000);
  }


  return (
    <div>
      <h1 className='main-container'>Quick Links</h1>
      <div className='app-container'>
        <div className='link-genration-card'>
          <h2>Link Genaration</h2>

          <input type='text'
            className='user-input'
            placeholder='URL'
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }} />

          <input type='text'
            className='user-input'
            placeholder='Slug (optional)'
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
            }} />

            <div className='shorturl'>
            <input type='text'
            className='user-shorturl'
            placeholder='Short URL'
            value={shortUrl}
            disabled
             />
             <img src={copyIcon} alt="Image" className='copy-icon'
             onClick={copyShortUrl}
             />

            </div>
            <button type='button' className="btn-link-genrate"
            onClick={genratelink}
            
            >Do Magik 🪄</button>

        </div>
        <div>
          <h2>All Links</h2>
        </div>
      </div>

    </div>
  )
}

export default App