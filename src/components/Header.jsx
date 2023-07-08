import { Link, useLocation } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { BiBook, BiCog, BiImage, BiLink } from 'react-icons/bi'
import { MdAudiotrack } from 'react-icons/md'
import { AiOutlineHome } from 'react-icons/ai'
import { TfiVideoClapper } from 'react-icons/tfi'
import { FaUserFriends } from 'react-icons/fa'
import { AiOutlineShareAlt } from 'react-icons/ai'
import BotonUpload from './BotonUpload'

const Header = () => {
  // USE LOCATION
  const { pathname } = useLocation()

  return (
    <header className='header'>
      <aside className='header__aside'>
        <div className='header__logo'>
          <Link to='/'>
            <img src='/logo.svg' alt='logo' />
          </Link>
        </div>
        <div className='header__pages'>
          <Tooltip id='tooltip-inicio' />
          <Link
            to='/'
            data-tooltip-id='tooltip-inicio'
            data-tooltip-content='Inicio'
            data-tooltip-place='right'
          >
            <AiOutlineHome />
          </Link>

          <Tooltip id='tooltip-imagenes' />
          <Link
            to='/imagenes'
            data-tooltip-id='tooltip-imagenes'
            data-tooltip-content='Imágenes'
            data-tooltip-place='right'
          >
            <BiImage />
          </Link>

          <Tooltip id='tooltip-videos' />
          <Link
            to='/videos'
            data-tooltip-id='tooltip-videos'
            data-tooltip-content='Videos'
            data-tooltip-place='right'
          >
            <TfiVideoClapper />
          </Link>

          <Tooltip id='tooltip-audios' />
          <Link
            to='/audios'
            data-tooltip-id='tooltip-audios'
            data-tooltip-content='Audios'
            data-tooltip-place='right'
          >
            <MdAudiotrack />
          </Link>

          <Tooltip id='tooltip-notas' />
          <Link
            to='/notas'
            data-tooltip-id='tooltip-notas'
            data-tooltip-content='Notas'
            data-tooltip-place='right'
          >
            <BiBook />
          </Link>

          <Tooltip id='tooltip-enlaces' />
          <Link
            to='/enlaces'
            data-tooltip-id='tooltip-enlaces'
            data-tooltip-content='Enlaces'
            data-tooltip-place='right'
          >
            <BiLink />
          </Link>

          <Tooltip id='tooltip-amigos' />
          <Link
            to='amigos'
            data-tooltip-id='tooltip-amigos'
            data-tooltip-content='Amigos'
            data-tooltip-place='right'
          >
            <FaUserFriends />
          </Link>

          <Tooltip id='tooltip-compartir' />
          <Link
            className='header__compartir'
            data-tooltip-id='tooltip-compartir'
            data-tooltip-content='Compartir con amigos'
            data-tooltip-place='right'
            to='/compartir'
          >
            <AiOutlineShareAlt />
          </Link>
        </div>

        <Tooltip id='tooltip-configuracion' />
        <Link
          className='header__configuracion'
          data-tooltip-id='tooltip-configuracion'
          data-tooltip-content='Configuración'
          data-tooltip-place='right'
          to='/configuracion'
        >
          <BiCog />
        </Link>
      </aside>

      <div className='header__navegacion'>
        <div className='header__left'>
          <h1 className='header__titulo'>
            {pathname === '/' ? 'INICIO' : pathname.slice(1).toLocaleUpperCase()}
          </h1>
        </div>
        <div className='header__rigth'>
          {pathname !== '/subir' && <BotonUpload />}

          <Tooltip id='tooltip-usuario' />
          <button
            className='header__usuario'
            data-tooltip-id='tooltip-usuario'
            data-tooltip-content='Usuario'
            data-tooltip-place='bottom'
          >
            <img className='header__avatar' src='/react.svg' alt='usuario' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
