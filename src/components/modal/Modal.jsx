import { GrFormClose } from 'react-icons/gr'
import './modal.css'

const Modal = ({ show, onHide, children }) => {
  if (!show) return null

  return (
    <div
      className='modal'
      onClick={(e) => {
        if (e.target.classList.contains('modal')) onHide()
      }}
    >
      {children}
    </div>
  )
}
const Card = ({ children, maxWidth = 500 }) => {
  return (
    <div className='modal-card' style={{ maxWidth }}>
      {children}
    </div>
  )
}

const Header = ({ children }) => {
  return <div className='modal-header'>{children}</div>
}

const Title = ({ children }) => {
  return <div className='modal-title'>{children}</div>
}

const CloseButton = ({ onHide }) => {
  return (
    <button className='modal-close-button' onClick={onHide}>
      <GrFormClose />
    </button>
  )
}

const Body = ({ children }) => {
  return <div className='modal-body'>{children}</div>
}

const BodyTitle = ({ children }) => {
  return <div className='modal-body-title'>{children}</div>
}

const BodyText = ({ children }) => {
  return <div className='modal-body-text'>{children}</div>
}

const Footer = ({ children }) => {
  return <div className='modal-footer'>{children}</div>
}

const Flex = ({ children }) => {
  return <div className='modal-flex'>{children}</div>
}

const Button = ({ children, variant, onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

Modal.Button = Button
Modal.Flex = Flex
Modal.Header = Header
Modal.Title = Title
Modal.CloseButton = CloseButton
Modal.Body = Body
Modal.Card = Card
Modal.Footer = Footer

Body.Text = BodyText
Body.Title = BodyTitle

export default Modal
