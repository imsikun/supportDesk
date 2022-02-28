import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BackButton = ({ url }) => {
  return (
    <div>
      <Link to={url} className='btn btn-reverse btn-back'>
        <FaArrowAltCircleLeft /> Back
      </Link>
    </div>
  );
};

export default BackButton;
