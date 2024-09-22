import css from './ImageCard.module.css';

interface ImageUrl {
  small: string;
  full: string;
}

interface ImageCardProps {
  title: string | null;
  url: ImageUrl;
  likes: number;
  openModal: () => void;
  setCurrentImage: (image: { url: string; alt: string }) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  url,
  likes,
  openModal,
  setCurrentImage,
}) => {
  const handleClick = () => {
    setCurrentImage({ url: url.full, alt: title || 'Image' });
    openModal();
  };

  return (
    <div onClick={handleClick} className={css.card}>
      <img className={css.image} src={url.small} alt={title || 'Image'} />
      <div className={css.info}>
        <p className={css.likes}>Likes: {likes}</p>
        <p className={css.title}>{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
