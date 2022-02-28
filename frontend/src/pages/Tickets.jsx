import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/tickets/ticketSlice';

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const disptach = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        disptach(reset());
      }
    };
  }, [disptach, isSuccess]);

  useEffect(() => {
    disptach(getTickets());
  }, [disptach]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={'/'} />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
