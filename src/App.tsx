import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import fetchPhotos from './fetchAPI';
import toast, { Toaster } from 'react-hot-toast';

interface Image {
  id: string;
  description: string | null;
  urls: {
    regular: string;
  };
  user: {
    name: string;
  };
}

interface CurrentImage {
  url: string;
  alt: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchingValue, setSearchingValue] = useState<string>('');
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<CurrentImage>({
    url: '',
    alt: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!searchingValue.trim()) return;

    const getPhotos = async (value: string) => {
      setError(false);
      setIsLoading(true);

      try {
        const data = await fetchPhotos(value, pageNumber);
        setImages((prevImages) =>
          pageNumber === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);

        if (data.total_pages === 0) {
          toast.error('Nothing was found for your request', {
            duration: 4000,
            position: 'top-right',
          });
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos(searchingValue);
  }, [searchingValue, pageNumber]);

  const handleSubmit = (userValue: string) => {
    setPageNumber(1);
    setSearchingValue(userValue);
  };

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          setCurrentImage={setCurrentImage}
        />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentImage={currentImage}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {totalPages > pageNumber && !isLoading && (
        <LoadMoreBtn handleClick={() => setPageNumber((prev) => prev + 1)} />
      )}
    </div>
  );
};

export default App;
