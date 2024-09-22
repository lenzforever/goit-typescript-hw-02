import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.loaderWrapper}>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        glassColor="#c0efff"
        color="rgb(84, 65, 196)"
      />
    </div>
  );
};

export default Loader;
