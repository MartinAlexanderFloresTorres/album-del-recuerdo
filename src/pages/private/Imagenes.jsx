import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { SiMega } from 'react-icons/si'
import { MdRemoveCircle } from 'react-icons/md'
import { IoCalendarOutline } from 'react-icons/io5'
import { BiSave } from 'react-icons/bi'
import { BsTrash, BsPlusCircleFill } from 'react-icons/bs'
import Imagen from '../../components/imagenes/Imagen'
import Modal from '../../components/modal/Modal'
import downloadImage from '../../helpers/downloadImage'

const Imagenes = () => {
  // ESTADOS
  const [showModal, setShowModal] = useState(false)
  const [showModalCompartir, setShowModalCompartir] = useState(false)
  const [showModalEliminar, setShowModalEliminar] = useState(false)

  const [screen, setScrenn] = useState(false)

  // REF
  const imagenRef = useRef()

  // USEEFFECT
  useEffect(() => {
    if (!imagenRef.current) return

    if (screen) {
      imagenRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [screen])

  // FUNCIONES
  const abrirModalImagen = () => {
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

  const cerrarModalImagen = () => {
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
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
        <Imagen handleClick={abrirModalImagen} />
      </div>

      <Modal show={showModal} onHide={cerrarModalImagen}>
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
                onClick={() => downloadImage('', 'imagen')}
                className='btn btn-success flex'
                title='Descargar imagen'
              >
                <BiSave />
                <span>Descargar</span>
              </button>

              <Modal.CloseButton onHide={cerrarModalImagen} />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className='modal__imagen'>
              <div ref={imagenRef} className={`${screen ? 'modal__image active' : 'modal__image'}`}>
                <img src={'/imagen.webp'} alt='imagen' />

                <div className='moda__fullScreen'>
                  <span className='fullScreen' onClick={() => setScrenn(true)}>
                    <BiFullscreen />
                  </span>
                  <span className='exitScreen' onClick={() => setScrenn(false)}>
                    <BiExitFullscreen />
                  </span>
                </div>
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
                    <SiMega />
                    <b>Peso:</b>
                  </p>
                  <span className='modal__descText'>101MB</span>
                </div>
              </div>
              <div className='modal__botones'>
                <button className='modal__btn btn btn-danger' onClick={abrirModalEliminar}>
                  <BsTrash /> Eliminar
                </button>
                <button className='modal__btn btn btn-primary' onClick={abrirModalCompartir}>
                  <AiOutlineShareAlt /> Compartidos
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

export default Imagenes
