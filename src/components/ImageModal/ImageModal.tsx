import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '80%',
    maxWidth: '900px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

interface CurrentImage {
  url: string;
  alt: string;
}

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  currentImage: CurrentImage;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  currentImage,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <button className={css.closeButton} onClick={closeModal}>
        &times;
      </button>
      <img
        className={css.photo}
        src={currentImage.url}
        alt={currentImage.alt}
      />
      <p className={css.description}>{currentImage.alt}</p>
    </Modal>
  );
};

export default ImageModal;
