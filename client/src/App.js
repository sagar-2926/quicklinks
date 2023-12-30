import React, { useEffect, useState } from 'react'
import './App.css'
import copyIcon from './icons8-copy-24.png'
import showToast from 'crunchy-toast';
import axios from 'axios'
import { set } from 'mongoose';
function App() {

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [links, setLinks] = useState([]);

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

  const loadlinks = async () => {
    const response = await axios.get('/api/links');
    setLinks(response?.data?.data);
  }

  useEffect(() =>{
    loadlinks();
  } , [links])
   
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
        <div className='all-links-container'>
          
          {
            links.map((linkojb, index)=>{
              const {url, slug, clicks} = linkojb;
              return(
                <div className='all-links-card'>
                <p className='card-url'> <b>URL :</b> {url}</p>
                <p className='card-slug'><b>Short URL : </b>{process.env.REACT_APP_BASE_URL}/{slug}</p>
                <p className='card-clicks'>Clicks :{clicks}</p>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default App