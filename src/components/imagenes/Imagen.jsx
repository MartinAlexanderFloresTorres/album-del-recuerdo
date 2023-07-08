import { GiSaveArrow } from 'react-icons/gi'
import downloadImage from '../../helpers/downloadImage'

const Imagen = ({ handleClick, ...props }) => {
  return (
    <div className='contenedor__item' {...props}>
      <img
        width='100'
        height='100'
        className='contenedor__img'
        src={`/imagen.webp`}
        alt='imagen'
        onClick={handleClick}
      />

      <div className='contenedor__description'>
        <button
          className='contenedor__descargar'
          title='Descargar imagen'
          onClick={() => downloadImage('', 'imagen')}
        >
          <GiSaveArrow />
        </button>

        <div className='contenedor__user'>
          <img
            width='100'
            height='100'
            className='contenedor__userImg'
            src={`/imagen.webp`}
            alt={`user`}
          />
          <p className='contendor__userText webkit-box-1'>{'Usuario Desconocido'}</p>
        </div>
      </div>
    </div>
  )
}

export default Imagen
