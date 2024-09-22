import axios from 'axios';

interface Photo {
  id: string;
  description: string | null;
  urls: {
    regular: string;
  };
  user: {
    name: string;
  };
}

interface FetchPhotosResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

interface FetchPhotosError {
  results: Photo[];
  error: string;
}

const fetchPhotos = async (
  userRequest: string, 
  pageNumber: number = 1
): Promise<FetchPhotosResponse | FetchPhotosError> => {
  const params = {
    query: userRequest,
    page: pageNumber,
    orientation: 'landscape',
    per_page: 20,
  };

  try {
    const { data } = await axios.get<FetchPhotosResponse>(
      'https://api.unsplash.com/search/photos?client_id=A7YRUc57iXs06cE1X3dTKf3BBSG-taztQvX54TDLNgI',
      {
        params,
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return { results: [], error: 'Failed to fetch data' };
  }
};

export default fetchPhotos;
