import { useState, useEffect } from 'react'
import './App.css'

import bgVideo from "./assets/spirit_bros.mp4";
const introClip = "/src/assets/purge_intro.mp3"
const purgeClips = [
  "/src/assets/purge_bkb.mp3",
  "/src/assets/purge_classic_woo.mp3",
  "/src/assets/purge_defenders_gate.mp3",
  "/src/assets/purge_gates.mp3",
  "/src/assets/purge_lotus_pools.mp3",
  "/src/assets/purge_neutral_tokens.mp3",
  "/src/assets/purge_post_rosh_watchers.mp3",
  "/src/assets/purge_problems.mp3",
  "/src/assets/purge_tormentors.mp3",
  "/src/assets/purge_universal_heroes.mp3",
  "/src/assets/purge_watchers.mp3",
]

const songs = [
  "/src/assets/Lukrembo - Jay.mp3",
  "/src/assets/Lukrembo - Bread.mp3",
  "/src/assets/Lukrembo - Onion.mp3",
  "/src/assets/Lukrembo - Bake A Pie.mp3",
  "/src/assets/Lukrembo - Marshmallow.mp3",
]

function App() {
  let music = new Audio(songs[0]);
  const [currSong, setCurrSong] = useState('Nothing yet but good vibes to come :)')
  const [hasPlayedFirstSong, setHasPlayedFirstSong] = useState(false)
  music.volume = 0.3;
  music.onended = () => {
    const song = songs[Math.floor(Math.random() * songs.length)]
    setCurrSong(song.split('/').pop())
    music.src = song;
    music.load();
    music.play();
  }
  let lofiPurge = new Audio(introClip);
  let hasIntroPlayed = false;
  let interval;

  lofiPurge.onplay = () => { hasIntroPlayed = true };
  const getRandomPurgeClip = () => {
    const selectedClip = hasIntroPlayed ? purgeClips[Math.floor(Math.random() * purgeClips.length)] : introClip;
    console.log('playing', selectedClip, hasIntroPlayed)
    lofiPurge.src = selectedClip;
    lofiPurge.load()
  }

  const playPurgeSoundbite = () => {
    setTimeout(() => {
      getRandomPurgeClip();
      lofiPurge.play();
      playPurgeSoundbite()
    },
      hasIntroPlayed ? (40000 + Math.random() * 50000) : 15000)
  }
  const musicStart = () => {
    if (!hasPlayedFirstSong) {
      setHasPlayedFirstSong(true);
      setCurrSong(songs[0].split('/').pop())
    }
    music.play()
    console.log('playin.')

    playPurgeSoundbite();
  }

  const musicStop = () => {
    console.log('pausin.')
    music.pause();
    lofiPurge.pause();
    console.log('paused.')


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
