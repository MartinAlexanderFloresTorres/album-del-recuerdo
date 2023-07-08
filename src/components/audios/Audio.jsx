import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'

const Audio = ({ audio, isPlaying, currentAudio, playAudio }) => {
  const isSelect = currentAudio?.id === audio.id

  return (
    <div className='audio' onClick={() => playAudio(audio)}>
      <div className='audio__cover'>
        <img className='audio__img' src={audio.imagen} alt='cantante' />
        {isSelect && (
          <>
            {isPlaying ? (
              <button className='flex'>
                <BsFillPauseFill />
              </button>
            ) : (
              <button className='flex'>
                <BsFillPlayFill />
              </button>
            )}
          </>
        )}
      </div>
      <h3 className='audio__titulo'>{audio.nombre}</h3>
    </div>
  )
}

export default Audio
