import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const SingleTicket = () => {
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

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

      <div className='ticket-page'>
        <header className='ticket-header'>
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status statu-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className='ticket-desc'>
            <h3>Description of issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>

        {ticket.status !== 'closed' && (
          <button className='btn btn-block btn-danger' onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
};

export default SingleTicket;
