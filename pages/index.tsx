import React from 'react'
import Head from 'next/head'

const RunJS = class extends React.Component {
  componentDidMount() {
    if (typeof window === 'undefined') return

    const getNewImage = () => {
      fetch("https://www.tweetjs.com/API.aspx", {
        body: JSON.stringify({
          Action: "ListTweetsOnUserTimeline",
          ScreenName: "cloudyconway"
        }),
        method: "POST"
      })
      .then(r => r.json())
      .then(tweets => {
        const first = (tweets as any[]).find(t =>  t.entities && t.entities.media && t.entities.media.length)
        if (first) {
          const image = first.entities.media[0]
          console.log(image)
          const url = `${image.media_url_https}?format=png&name=large`
          const ourImage:any = document.getElementById("background")
          ourImage.src = url
        }
      })
    }

    getNewImage()

    const hourMs = 1000 * 60 * 60
    setInterval(getNewImage, hourMs)

    const restartBrowser = () => {
      document.location.reload()
    }

    const dayMs = hourMs * 24
    setTimeout(restartBrowser, dayMs)
  }

  render() {
    return null
  }
}

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <img id="background" src="" />

    <script src="https://polyfill.io/v3/polyfill.min.js?features=fetch" />
    <RunJS />

    <style jsx global>{`
      body { 
        padding: 0;
        margin: 0;
      }
      
      img {
        height: 100%;
        position: absolute;
        image-rendering: auto;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
      }

      div {
        height: 100%;
      }
    `}</style>
  </div>
)

export default Home
