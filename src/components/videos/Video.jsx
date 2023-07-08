import { BsFillPlayCircleFill } from 'react-icons/bs'

const Video = ({ ...props }) => {
  return (
    <div className='contenedor__item' {...props}>
      <img width='100' height='100' className='contenedor__img' src={`/imagen.webp`} alt='imagen' />

      <div className='contenedor__description'>
        <button className='verVideo boton' title='Ver Video' {...props}>
          <BsFillPlayCircleFill />
        </button>

        <div className='contenedor__user'>
          <img
            width='100'
            height='100'
            className='contenedor__userImg'
            src={`/imagen.webp`}
            alt={`user`}
          />
          <p className='contendor__userText'>{'Usuario Desconocido'}</p>
        </div>
      </div>
    </div>
  )
}

export default Video
