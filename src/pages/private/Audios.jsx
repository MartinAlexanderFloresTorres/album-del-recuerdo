import { useRef, useState } from 'react'
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsRepeat,
  BsRepeat1
} from 'react-icons/bs'
import { BiShuffle } from 'react-icons/bi'
import { FiChevronLeft, FiChevronUp } from 'react-icons/fi'
import Audio from '../../components/audios/Audio'
import duration from '../../helpers/duration'

const Audios = () => {
  // ESTADOS
  const [showModalAudio, setShowModalAudio] = useState(false)
  const [currentAudio, setCurrenAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audios, setAudios] = useState([
    {
      id: 1,
      nombre: 'Cancion 1',
      artista: 'Artista 1',
      imagen: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duracion: 543
    },
    {
      id: 2,
      nombre: 'Cancion 2',
      artista: 'Artista 2',
      imagen: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      duracion: 1231
    },
    {
      id: 3,
      nombre: 'Cancion 3',
      artista: 'Artista 3',
      imagen: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      duracion: 123
    },
    {
      id: 4,
      nombre: 'Cancion 4',
      artista: 'Artista 4',
      imagen: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      duracion: 123
    }
  ])
  const [volume, setVolume] = useState(() =>
    localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 50
  )
  const [showVolume, setShowVolume] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoop, setIsLoop] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  // REF AUDIO
  const audioRef = useRef()

  // FUNCIONES
  const handleShowModalAudio = () => {
    setShowModalAudio(!showModalAudio)
  }

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    }

    if (!isPlaying) {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const playAudio = (data_audio) => {
    setCurrenAudio(data_audio)
    audioRef.current.src = data_audio.audio
    audioRef.current.volume = volume / 100
    audioRef.current.play()
    setIsPlaying(true)
  }

  const audioAletorio = () => {
    const index = Math.floor(Math.random() * audios.length)

    if (audios[index].id === currentAudio.id) {
      audioAletorio()
      return
    }

    playAudio(audios[index])
  }

  const handleLoop = () => {
    setIsLoop(!isLoop)
    setIsRepeat(false)
    setIsShuffle(false)
    audioRef.current.loop = false
    console.log(audioRef.current.loop)
  }

  const handleShuffle = () => {
    setIsShuffle(!isShuffle)
    setIsLoop(false)
    setIsRepeat(false)
  }

  const handleRepeat = () => {
    setIsRepeat(!isRepeat)
    setIsLoop(false)
    setIsShuffle(false)
    audioRef.current.loop = !isLoop
    console.log(audioRef.current.loop)
  }

  const handleShowVolume = () => {
    setShowVolume(!showVolume)
  }

  const nextAudio = () => {
    const index = audios.findIndex((audio) => audio.id === currentAudio.id)
    if (index + 1 > audios.length - 1) {
      playAudio(audios[0])
      return
    }

    playAudio(audios[index + 1])
  }

  const finishAudio = () => {
    if (!isShuffle && !isRepeat && !isLoop) {
      return
    }

    if (isRepeat) {
      playAudio(currentAudio)
      return
    }

    if (isShuffle) {
      audioAletorio()
      return
    }

    nextAudio()
  }

  const prevAudio = () => {
    const index = audios.findIndex((audio) => audio.id === currentAudio.id)
    if (index - 1 < 0) {
      playAudio(audios[audios.length - 1])
      return
    }

    playAudio(audios[index - 1])
  }

  const moveVolume = (e) => {
    const volume = Number(e.target.value)
    setVolume(volume)
    audioRef.current.volume = volume / 100

    localStorage.setItem('volume', volume)
  }

  const moveAudio = (e) => {
    const time = e.target.value
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  return (
    <>
      <audio
        style={{
          display: 'none'
        }}
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(Number(e.target.currentTime).toFixed(0))}
        onEnded={finishAudio}
      ></audio>

      <div className='audios'>
        {audios.map((audio) => (
          <Audio key={audio.id} audio={audio} playAudio={playAudio} currentAudio={currentAudio} />
        ))}
      </div>

      {currentAudio && (
        <div className={`audios__informacion ${showModalAudio ? 'audios__informacion--show' : ''}`}>
          {!showModalAudio && (
            <button className='flex audios__chevronUp' onClick={handleShowModalAudio}>
              <FiChevronUp />
            </button>
          )}

          {!showModalAudio && (
            <input
              className='rango'
              type='range'
              min={0}
              max={audioRef.current.duration || 0}
              step={1}
              value={currentTime}
              onChange={moveAudio}
            />
          )}

          <div className='audios__centro'>
            <div className='flex justify-between px-10 py-10'>
              {showModalAudio ? (
                <button className='flex btn' onClick={handleShowModalAudio}>
                  <FiChevronLeft />
                </button>
              ) : (
                <div></div>
              )}
              <h2 className='audios__titulo'>{currentAudio.nombre}</h2>
              <div></div>
            </div>
            {showModalAudio && (
              <>
                <h3 className='audios__artista'>{currentAudio.artista}</h3>
                <div className='audios__imagenContainer'>
                  <img className='audios__imagen' src={currentAudio.imagen} alt='imagen' />
                </div>
              </>
            )}
          </div>

          <div>
            {showModalAudio && (
              <div className='px-20 mb-10'>
                <input
                  className='rango'
                  type='range'
                  min={0}
                  max={audioRef.current.duration || 0}
                  step={1}
                  value={currentTime}
                  onChange={moveAudio}
                />
                <div className='flex justify-between mt-10'>
                  <div>{duration(currentTime)}</div>
                  <div> {duration(audioRef.current.duration || 0)}</div>
                </div>
              </div>
            )}

            <div className='audios__botones'>
              <div className='flex'>
                <button
                  className={`audios__boton ${isRepeat ? 'active' : ''}`}
                  onClick={handleRepeat}
                >
                  <BsRepeat1 />
                </button>
                <button className={`audios__boton ${isLoop ? 'active' : ''}`} onClick={handleLoop}>
                  <BsRepeat />
                </button>

                <button
                  className={`audios__boton ${isShuffle ? 'active' : ''}`}
                  onClick={handleShuffle}
                >
                  <BiShuffle />
                </button>
              </div>

              <div className='flex'>
                <button className='audios__boton' onClick={prevAudio}>
                  <BsFillSkipStartFill />
                </button>
                <button className='audios__boton' onClick={handlePlay}>
                  {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
                </button>
                <button className='audios__boton' onClick={nextAudio}>
                  <BsFillSkipEndFill />
                </button>
              </div>

              <div className='flex'>
                <div className='audios__volumen'>
                  {showVolume && (
                    <input
                      className='rango rango--rotate'
                      type='range'
                      min='0'
                      max='100'
                      step={1}
                      value={volume}
                      onChange={moveVolume}
                    />
                  )}

                  <button className='audios__boton' onClick={handleShowVolume}>
                    {volume === 0 ? (
                      <BsFillVolumeMuteFill />
                    ) : volume < 50 ? (
                      <BsFillVolumeDownFill />
                    ) : (
                      <BsFillVolumeUpFill />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Audios
