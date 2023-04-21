import { useState } from 'react'
import './App.css'

import bgVideo from "./assets/spirit_bros.mp4";

const introClip = "/assets/purge_intro.mp3?url"
const purgeClips = [
  "/assets/purge_bkb.mp3?url",
  "/assets/purge_classic_woo.mp3?url",
  "/assets/purge_defenders_gate.mp3?url",
  "/assets/purge_gates.mp3?url",
  "/assets/purge_lotus_pools.mp3?url",
  "/assets/purge_neutral_tokens.mp3?url",
  "/assets/purge_post_rosh_watchers.mp3?url",
  "/assets/purge_problems.mp3?url",
  "/assets/purge_tormentors.mp3?url",
  "/assets/purge_universal_heroes.mp3?url",
  "/assets/purge_watchers.mp3?url",
]

const songs = [
  "/assets/Lukrembo - Jay.mp3?url",
  "/assets/Lukrembo - Bread.mp3?url",
  "/assets/Lukrembo - Onion.mp3?url",
  "/assets/Lukrembo - Bake A Pie.mp3?url",
  "/assets/Lukrembo - Marshmallow.mp3?url",
]

let music = new Audio(songs[0]);
let timeout;
function App() {

  const [currSong, setCurrSong] = useState('Nothing yet but good vibes to come :)')
  const [hasPlayedFirstSong, setHasPlayedFirstSong] = useState(false)
  music.volume = 0.3;
  music.onended = () => {
    const song = songs[Math.floor(Math.random() * songs.length)]
    setCurrSong(song.split('/').pop().split('?')[0])
    music.src = song;
    music.load();
    music.play();
  }
  let lofiPurge = new Audio(introClip);
  let hasIntroPlayed = false;

  lofiPurge.onplay = () => { hasIntroPlayed = true };
  const getRandomPurgeClip = () => {
    const selectedClip = hasIntroPlayed ? purgeClips[Math.floor(Math.random() * purgeClips.length)] : introClip;
    lofiPurge.src = selectedClip;
    lofiPurge.load()
  }

  const playPurgeSoundbite = () => {
    timeout = setTimeout(() => {
      getRandomPurgeClip();
      lofiPurge.play();
      playPurgeSoundbite()
    },
      hasIntroPlayed ? (40000 + Math.random() * 50000) : 15000)
  }
  const musicStart = () => {
    if (!hasPlayedFirstSong) {
      setHasPlayedFirstSong(true);
      setCurrSong(songs[0].split('/').pop().split('?')[0])
    }
    clearTimeout(timeout);
    music.play()

    playPurgeSoundbite();
  }

  const musicStop = () => {
    console.log('pausin.')
    try {
      music.pause();
      lofiPurge.pause();
    } catch (error) {
      console.warn('error', error)
    }

  }

  return (

    <div>
      <video className='video-player' autoPlay loop muted>
        <source src={bgVideo} type='video/mp4' />

      </video>
      <div className='HContainer'>
        <p style={{ marginRight: '1ch' }}> Now Playing: </p>
        <div style={{ overflow: 'hidden' }}>
          <p className='text-scroller'> {currSong}</p>
        </div>
      </div>
      < div >
        <button onClick={musicStart}>▶️</button>
        <button onClick={musicStop}>⏸️</button>
      </div >

      <div>
        <p>Music sourced from: <a href="https://freetouse.com/music/lukrembo"> this lovely fellow</a></p>
        <p>Background video can be found: <a href="https://livewallpapers4free.com/the-spirit-brothers-dota-2-game-pixel-art-4k-quality/"> here</a></p>

      </div>

    </div>

  );
}

export default App
