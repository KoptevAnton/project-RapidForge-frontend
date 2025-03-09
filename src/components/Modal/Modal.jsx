import { useEffect } from 'react';
import s from './Modal.module.css';
import sprite from '../../assets/sprite.svg';

const Modal = ({ children, onClose }) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <button className={s.btn} onClick={handleCloseModal}>
            <svg className={s.icon} width="24" height="24">
              {/* <use href="/sprite.svg#icon-close"></use> */}
              <use xlinkHref={`${sprite}#icon-close`} />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
