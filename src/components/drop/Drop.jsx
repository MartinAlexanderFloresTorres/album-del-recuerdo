import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsTrash } from 'react-icons/bs'
import generarId from '../../helpers/generarId'
import Modal from '../modal/Modal'
import './drop.css'

const Drop = () => {
  // Estados del drop
  const [drop, setDrop] = useState(false)
  const [dropEnter, setDropEnter] = useState(false)
  const [noValid, setNoValid] = useState(false)
  const [imagenes, setImagenes] = useState([])
  const [videos, setVideos] = useState([])
  const [audios, setAudios] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [nameData, setNameData] = useState('imagenes')

  useEffect(() => {
    if (imagenes.length > 0 || videos.length > 0 || audios.length > 0) {
      setShowModal(true)
    }

    if (imagenes.length === 0 && nameData === 'imagenes') {
      setShowModal(false)
      if (videos.length > 0) {
        setNameData('videos')
      } else if (audios.length > 0) {
        setNameData('audios')
      }
    } else if (videos.length === 0 && nameData === 'videos') {
      setShowModal(false)
      if (imagenes.length > 0) {
        setNameData('imagenes')
      } else if (audios.length > 0) {
        setNameData('audios')
      }
    } else if (audios.length === 0 && nameData === 'audios') {
      setShowModal(false)
      if (videos.length > 0) {
        setNameData('videos')
      } else if (imagenes.length > 0) {
        setNameData('imagenes')
      }
    }
  }, [imagenes, videos, audios, nameData])

  // Function menssage warning
  const warning = (message) => {
    // Mostrar mensaje de warning
    setNoValid(true)
    toast.error(message)
  }

  // Function que agregara la imagen al state
  const addFileState = (file) => {
    file.id = generarId() // Generar un id
    file.url = URL.createObjectURL(file) // generar una url

    if (file.type.includes('image')) {
      console.log('imagen')
      setImagenes((prevState) => [...prevState, file])
    } else if (file.type.includes('video')) {
      console.log('video')
      setVideos((prevState) => [...prevState, file])
    } else if (file.type.includes('audio')) {
      console.log('audio')
      setAudios((prevState) => [...prevState, file])
    }
  }

  // Function que recorre los folders
  const iterableFolder = (entry) => {
    entry.createReader().readEntries((entries) => {
      // Recorrer los archivos
      entries.forEach((entry) => {
        // Si es un archivo file
        if (entry.isFile) {
          // Obtener el archivo
          entry.file((file) => {
            // Si es una imagen
            if (file.type.includes('image')) {
              addFileState(file)
            }
            // Si es un video
            else if (file.type.includes('video')) {
              addFileState(file)
            }
            // Si es un audio
            else if (file.type.includes('audio')) {
              addFileState(file)
            } else {
              // Mostrar mensaje de warning
              warning(`El archivo no fue valido ${file.name}`)
            }
          })
        }
        // si es un directorio
        else if (entry.isDirectory) {
          iterableFolder(entry)
        } else {
          // Mostrar mensaje de warning
          warning(`El archivo no fue valido ${entry.name}`)
        }
      })
    })
  }

  // Handle para capturar el archivo
  const handleDrop = async (e) => {
    const { files } = e.dataTransfer
    const items = e.dataTransfer.items[0]

    // Si no es un file mostramos un mensaje
    if (items.kind === 'string' || items.kind !== 'file') {
      warning('Solo se permiten imagenes, videos o audios.')
      return
    }

    // Recorrer los files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // si es una imagen
      if (
        file.type.includes('image') ||
        file.type.includes('video') ||
        file.type.includes('audio')
      ) {
        addFileState(file)
      } else if (items.webkitGetAsEntry().isDirectory) {
        // Recorrer la carpeta
        iterableFolder(items.webkitGetAsEntry())
      } else {
        // mostrar mensaje de warning
        warning('Solo se permiten imagenes, videos o audios.')
        setNoValid(true)
      }
    }
  }

  // Handle input file
  const handleInput = (e) => {
    const { files } = e.target
    // Recorrer los files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // si es una imagen
      if (file.type.includes('image')) {
        addFileState(file)
      } // si es un video
      else if (file.type.includes('video')) {
        addFileState(file)
      } // si es un audio
      else if (file.type.includes('audio')) {
        addFileState(file)
      } else {
        // mostrar mensaje de warning
        warning('Solo se permiten imagenes, videos o audios')
        setNoValid(true)
      }
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (nameData === 'imagenes') {
      setImagenes(imagenes.filter((img) => img.id !== id))
    } else if (nameData === 'videos') {
      setVideos(videos.filter((img) => img.id !== id))
    } else if (nameData === 'audios') {
      setAudios(audios.filter((img) => img.id !== id))
    }
  }

  const handleReset = () => {
    setImagenes([])
    setVideos([])
    setAudios([])
    setNameData('imagenes')
    handleClose()
  }

  const handleSave = () => {
    console.log({ imagenes, videos, audios })
    handleReset()
  }

  return (
    <>
      <section className='drop-overflow'>
        <section
          className={`drop container ${drop ? 'dragging' : ''} ${dropEnter ? 'active' : ''} ${
            noValid ? 'no-valid' : ''
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setDrop(true)
            toast.dismiss()
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setDrop(false)
            setNoValid(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setDrop(false)
            setDropEnter(false)
          }}
        >
          <section className='drop-bottom'>
            <h2>
              Arrastrar y soltar. <span className='sky'>Está en línea.</span>{' '}
            </h2>
            <p className='mb-20'>
              Coloque una carpeta con las imagenes, videos, audios para subir.
              <span className='sky'> Arrastre y suelte</span> o
              <span className='sky'> haga clic</span> para seleccionar.
            </p>

            <div className='flex'>
              {imagenes.length > 0 && (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setShowModal(true)
                    setNameData('imagenes')
                  }}
                >
                  Mostrar imagenes
                </button>
              )}

              {videos.length > 0 && (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setShowModal(true)
                    setNameData('videos')
                  }}
                >
                  Mostrar videos
                </button>
              )}

              {audios.length > 0 && (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setShowModal(true)
                    setNameData('audios')
                  }}
                >
                  Mostrar audios
                </button>
              )}

              {(imagenes.length > 0 || videos.length > 0 || audios.length > 0) && (
                <>
                  <button className='btn btn-danger' onClick={handleReset}>
                    Limpiar
                  </button>
                  <button className='btn btn-success' onClick={handleSave}>
                    Guardar
                  </button>
                </>
              )}
            </div>
          </section>

          <div className='drop-contenedor'>
            <div>
              <section className='drop-box-center'>
                <div
                  className='drop-box-item'
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDropEnter(true)
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    setDropEnter(false)
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDropEnter(false)
                    handleDrop(e)
                  }}
                >
                  <svg
                    className='drop-box-svg-circle'
                    xmlns='http://www.w3.org/2000/svg'
                    width='100%'
                  >
                    <rect
                      width='100%'
                      height='100%'
                      fill='none'
                      rx='200'
                      ry='200'
                      stroke='var(--drop-color-svg)'
                      strokeWidth='8'
                      strokeDasharray='.15%,5%'
                      strokeDashoffset='0'
                      strokeLinecap='square'
                    />
                  </svg>

                  <div className='drop-box-content'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='69'
                      height='51'
                      viewBox='0 0 69 51'
                      className='dropzone-content__image'
                    >
                      <defs>
                        <linearGradient
                          id='a'
                          x1='34.5'
                          y1='48.67'
                          x2='34.5'
                          y2='0.19'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop offset='0.67' stopColor='#112caf'></stop>
                          <stop offset='0.77' stopColor='#2250f4'></stop>
                        </linearGradient>
                      </defs>
                      <path
                        d='M62.93 6.8H37.11L29.84.19H6.07a3.53 3.53 0 0 0-3.53 3.53v41.42a3.53 3.53 0 0 0 3.53 3.53h56.86a3.53 3.53 0 0 0 3.53-3.53V10.33a3.53 3.53 0 0 0-3.53-3.53Z'
                        fill='url(#a)'
                      ></path>
                      <path fill='#ffdd73' d='M6.83 12.56h53.01V35.1H6.83z'></path>
                      <path fill='#fff6d0' d='M10.27 9.83h53.01v22.54H10.27z'></path>
                      <path
                        d='M63.17 50.81H5.83a3.46 3.46 0 0 1-3.5-3.06l-2.07-29a3.25 3.25 0 0 1 3.29-3.51h61.9a3.25 3.25 0 0 1 3.29 3.51l-2.07 29a3.46 3.46 0 0 1-3.5 3.06Z'
                        fill='#a6bffd'
                      ></path>
                    </svg>

                    <h2>Arrastre y suelte aqui</h2>
                    <p>
                      O bien,{' '}
                      <label htmlFor='subir-recuerdo'>
                        <input
                          type='file'
                          multiple
                          accept='image/*,video/*,audio/*'
                          id='subir-recuerdo'
                          name='subir-recuerdo'
                          onChange={handleInput}
                        />{' '}
                        navegue para carga
                      </label>
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className='drop-ring'></div>
            <div className='drop-ring'></div>
            <div className='drop-ring'></div>
          </div>
        </section>
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Card maxWidth={1000}>
          <Modal.Header>
            <Modal.Title>Subir Recuerdos</Modal.Title>
            <Modal.CloseButton onHide={handleClose} />
          </Modal.Header>

          <Modal.Body>
            <div className='uploads'>
              <div className='uploads__navegacion'>
                {imagenes.length > 0 && (
                  <button
                    className={`btn btn-primary ${nameData === 'imagenes' ? 'active' : ''}`}
                    onClick={() => setNameData('imagenes')}
                  >
                    Imagenes
                  </button>
                )}
                {videos.length > 0 && (
                  <button
                    className={`btn btn-primary ${nameData === 'videos' ? 'active' : ''}`}
                    onClick={() => setNameData('videos')}
                  >
                    Videos
                  </button>
                )}
                {audios.length > 0 && (
                  <button
                    className={`btn btn-primary ${nameData === 'audios' ? 'active' : ''}`}
                    onClick={() => setNameData('audios')}
                  >
                    Audios
                  </button>
                )}
              </div>

              {nameData === 'imagenes' && (
                <div className='uploads__contenido'>
                  {imagenes.map((imagen) => (
                    <div className='uploads__item' key={imagen.id}>
                      <button
                        className='btn btn-danger uploads__item-delete'
                        onClick={() => handleDelete(imagen.id)}
                      >
                        <BsTrash />
                      </button>
                      <img src={imagen.url} alt='react' />
                    </div>
                  ))}
                </div>
              )}

              {nameData === 'videos' && (
                <div className='uploads__contenido'>
                  {videos.map((video) => (
                    <div className='uploads__item' key={video.id}>
                      <button
                        className='btn btn-danger uploads__item-delete'
                        onClick={() => handleDelete(video.id)}
                      >
                        <BsTrash />
                      </button>
                      <video controls>
                        <source src={video.url} type='video/mp4' />
                      </video>
                    </div>
                  ))}
                </div>
              )}

              {nameData === 'audios' && (
                <div className='uploads__contenido'>
                  {audios.map((audio) => (
                    <div className='uploads__item' key={audio.id}>
                      <button
                        className='btn btn-danger uploads__item-delete'
                        onClick={() => handleDelete(audio.id)}
                      >
                        <BsTrash />
                      </button>
                      <audio controls>
                        <source src={audio.url} type='audio/mp3' />
                      </audio>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Flex>
              <Modal.Button variant='secondary' onClick={handleClose}>
                Cerrar
              </Modal.Button>
              <Modal.Button variant='danger' onClick={handleReset}>
                Limpiar
              </Modal.Button>
              <Modal.Button variant='primary' onClick={handleSave}>
                Subir
              </Modal.Button>
            </Modal.Flex>
          </Modal.Footer>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default Drop
