import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
  likes: number;
}

interface ImageGalleryProps {
  images: Image[];
  openModal: () => void;
  setCurrentImage: (image: { url: string; alt: string }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  openModal,
  setCurrentImage,
}) => {
  return (
    <ul className={css.list}>
      {images.map((card) => (
        <li className={css.listItem} key={card.id}>
          <ImageCard
            openModal={openModal}
            setCurrentImage={setCurrentImage}
            title={card.alt_description}
            url={card.urls}
            likes={card.likes}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
