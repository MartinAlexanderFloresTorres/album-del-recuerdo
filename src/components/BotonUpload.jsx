import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const BotonUpload = () => {
  return (
    <>
      <Tooltip id='tooltip-subir-recuerdo' />
      <Link
        className='btn btn-primary flex btn-upload'
        to={'/subir'}
        data-tooltip-id='tooltip-subir-recuerdo'
        data-tooltip-content='Subir Recuerdo 🥳'
        data-tooltip-place='bottom'
      >
        <AiOutlineCloudUpload /> <span>Subir Recuerdo</span>
      </Link>
    </>
  )
}

export default BotonUpload
