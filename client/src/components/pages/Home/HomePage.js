import SearchForm from '../../features/SearchForm/SearchForm';
import AdsSection from '../../features/AdsSection/AdsSection';
import BackgroundVideo from '../../features/BackgroundVideo/BackgroundVideo';
import Featured from '../../features/Featured/Featured';

const HomePage = () => (
  <div>
    <BackgroundVideo />
    <Featured />
    <SearchForm />
    <AdsSection />
  </div>
);

export default HomePage;
