import BasicButton from '../components/basicButton';
import { useNavigation } from 'react-router-dom';

const EventsPage = () => {
    return (
      <div>
        <BasicButton buttonName={"Create Event"} type="submit" />
      </div>
    );
  };
export default EventsPage;

