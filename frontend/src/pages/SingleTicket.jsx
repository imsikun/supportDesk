import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const SingleTicket = () => {
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <>
        <BackButton url={'/tickets'} />
        <h3>Something went wrong</h3>
      </>
    );
  }

  return (
    <>
      <BackButton url={'/tickets'} />

      <div>
        <h1>Ticketsection</h1>
      </div>
    </>
  );
};

export default SingleTicket;
