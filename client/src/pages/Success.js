import React from 'react';
import {useSearchParams} from 'react-router-dom';

const Success = () => {

  const [query] = useSearchParams();

  console.log(query.get('payment_id'));
  return (
    <div className='text-center min-h-screen flex justify-content items-center text-2xl font-bold'>
        <div>
          <h3>Congratulations</h3><br />
          Your payment id: {query && query.get('payment_id')};
        </div>
    </div>
  )
}

export default Success;