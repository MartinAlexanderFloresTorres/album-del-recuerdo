import { useState } from 'react'
import { flushSync } from 'react-dom'
import { AiOutlineShareAlt, AiOutlineFieldTime } from 'react-icons/ai'
import { IoCalendarOutline } from 'react-icons/io5'
import { SiMega } from 'react-icons/si'
import { BsPlusCircleFill, BsTrash } from 'react-icons/bs'
import Video from '../../components/videos/Video'
import Modal from '../../components/modal/Modal'
import downloadVideo from '../../helpers/downloadVideo'
import { MdRemoveCircle } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

const Videos = () => {
  // ESTADOS
  const [showModal, setShowModal] = useState(false)
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [showModalCompartir, setShowModalCompartir] = useState(false)

  // FUNCIONES
  const abrirModalVideo = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModal(true)
        })
      })
    } else {
      setShowModal(true)
    }
  }

  const cerrarModalVideo = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModal(false)
        })
      })
    } else {
      setShowModal(false)
    }
  }

  const abrirModalCompartir = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModalCompartir(true)
        })
      })
    } else {
      setShowModalCompartir(true)
    }
  }

  const cerrarModalCompartir = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModalCompartir(false)
        })
      })
    } else {
      setShowModalCompartir(false)
    }
  }

  const abrirModalEliminar = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModalEliminar(true)
        })
      })
    } else {
      setShowModalEliminar(true)
    }
  }

  const cerrarModalEliminar = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setShowModalEliminar(false)
        })
      })
    } else {
      setShowModalEliminar(false)
    }
  }

  const handleCompartirCon = () => {
    console.log('Compartir con')
    cerrarModalCompartir()
  }

  const handleEliminar = () => {
    console.log('Eliminar')
    cerrarModalEliminar()
  }

  return (
    <>
      <div className='contenedor__imagenes'>
        <Video onClick={abrirModalVideo} />
        <Video onClick={abrirModalVideo} />
        <Video onClick={abrirModalVideo} />
        <Video onClick={abrirModalVideo} />
        <Video onClick={abrirModalVideo} />
        <Video onClick={abrirModalVideo} />
      </div>
      <Modal show={showModal} onHide={cerrarModalVideo}>
        <Modal.Card maxWidth={1200}>
          <Modal.Header>
            <div className='modal__usuario'>
              <img className='modal__imagenUsuario' src={`/imagen.webp`} alt='user' />
              <div>
                <p className='modal__userText webkit-box-1'>{'Usuario Desconocido'}</p>
                <p className='modal__arroba webkit-box-1'>{'@Usuario Desconocido'}</p>
              </div>
            </div>

            <div className='modal__opciones'>
              <button
                onClick={() => downloadVideo('', 'imagen')}
                className='btn btn-success flex'
                title='Descargar imagen'
              >
                <BiSave />
                <span>Descargar</span>
              </button>

              <Modal.CloseButton onHide={cerrarModalVideo} />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className='modal__imagen'>
              <div className={`modal__image`}>
                <video src={`/video.mp4`} controls muted />
              </div>
            </div>

            <div className='modal__bottom'>
              <div className='modal__descripcion'>
                <div>
                  <p className='modal__destiTulo'>
                    <IoCalendarOutline />
                    <b>Fecha:</b>
                  </p>
                  <span className='modal__descText'>17/03/2023</span>
                </div>
                <div>
                  <p className='modal__destiTulo'>
                    <AiOutlineFieldTime />
                    <b>Duracion:</b>
                  </p>
                  <span className='modal__descText'>47s</span>
                </div>
                <div>
                  <p className='modal__destiTulo'>
                    <SiMega />
                    <b>Peso:</b>
                  </p>
                  <span className='modal__descText'>101MB</span>
                </div>
              </div>
              <div className='modal__botones'>
                <button className='modal__btn btn btn-danger' onClick={abrirModalEliminar}>
                  <BsTrash />
                  <span>Eliminar</span>
                </button>
                <button className='modal__btn btn btn-primary' onClick={abrirModalCompartir}>
                  <AiOutlineShareAlt />
                  <span>Compartidos</span>
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Card>
      </Modal>

      <Modal show={showModalCompartir} onHide={cerrarModalCompartir}>
        <Modal.Card maxWidth={500}>
          <Modal.Header>
            <h3 className='modal__titulo'>Compartir con</h3>
            <Modal.CloseButton onHide={cerrarModalCompartir} />
          </Modal.Header>
          <Modal.Body>
            <div className='modal__compartir'>
              <div className='modal__compartir__item'>
                <input
                  type='text'
                  className='modal__compartir__input'
                  placeholder='Buscar usuario @'
                  autoFocus
                  autoComplete='off'
                />
              </div>
            </div>

            <div className='modal__compartir__usuarios'>
              <div className='modal__compartir__usuario'>
                <img className='modal__compartir__imagenUsuario' src={`/imagen.webp`} alt='user' />
                <div>
                  <p className='modal__compartir__userText webkit-box-1'>{'Usuario Desconocido'}</p>
                  <p className='modal__compartir__arroba webkit-box-1'>{'@Usuario Desconocido'}</p>
                </div>

                <button className='text-succes text-succes-hover'>
                  <BsPlusCircleFill />
                </button>
              </div>

              <div className='modal__compartir__usuario'>
                <img className='modal__compartir__imagenUsuario' src={`/imagen.webp`} alt='user' />
                <div>
                  <p className='modal__compartir__userText webkit-box-1'>{'Usuario Desconocido'}</p>
                  <p className='modal__compartir__arroba webkit-box-1'>{'@Usuario Desconocido'}</p>
                </div>

                <button className='text-danger text-danger-hover'>
                  <MdRemoveCircle />
                </button>
              </div>
            </div>

            <div className='modal__enlace mt-10'>
              <pre className='webkit-box-1 break-all'>{window.location.href + `?view=${123}`}</pre>
              <button className=''>Copiar</button>
            </div>

            <div className='modal__info mt-10'>
              <b>Nota:</b> <span>Los usuarios que se agreguen podran ver esta imagen.</span>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className='btn btn-success flex modal__compartir__btn'
              onClick={handleCompartirCon}
            >
              <BiSave /> Guardar
            </button>
          </Modal.Footer>
        </Modal.Card>
      </Modal>

      <Modal show={showModalEliminar} onHide={cerrarModalEliminar}>
        <Modal.Card maxWidth={500}>
          <Modal.Header>
            <h3 className='modal__titulo'>Eliminar</h3>

            <Modal.CloseButton onHide={cerrarModalEliminar} />
          </Modal.Header>
          <Modal.Body>
            <Modal.Body.Text>¿Estas seguro que deseas eliminar este archivo?</Modal.Body.Text>
          </Modal.Body>

          <Modal.Footer>
            <button className='btn btn-danger flex' onClick={handleEliminar}>
              <BsTrash /> Eliminar
            </button>
          </Modal.Footer>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default Videos
