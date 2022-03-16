import React,{useState} from 'react';
import { useStripe,CardElement, useElements,CardNumberElement} from '@stripe/react-stripe-js';
import axiosInstance from 'src/APIs/axiosInstance';




const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [amountToPay,setAmountToPay]=useState(0);
  const [cardToken,setCardToken]=useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

      try {
      const cardNumberElement = elements.getElement(CardElement);
      const response = await stripe.createToken(cardNumberElement);
      console.log('response: ', response);
        if (response.token){
        console.log('token',response.token.id);        
        setCardToken(response.token.id)

      } 
        
      } catch (error) {
        
      console.log('ERROR: ', error.message);
      }
    
    if (!error) {
      try {
        const { id } = paymentMethod;
        const data = {
          amount: amountToPay*100,
          id,
          token:cardToken
        };
        const response = await axiosInstance.test(data);

        console.log('payment success');
        setSuccess(true);
      } catch (error) {
        console.log('Error,', error);
      }
    } else {
      console.log('Error,', error);
    }
  };
  return (
    <div>
      {!success ? (
        <form className='w-full mt-10' onSubmit={handleSubmit}>
          <fieldset className="w-50 m-auto">
            <div className="FormRow">
              <CardElement />
            </div>
          </fieldset>
          <input type="number" value={amountToPay} placeholder="Enter the amount to pay" onChange={(e)=>setAmountToPay(e.target.value)} />
          <button className='btn py-2 px-4 rounded-md mt-4'>Pay</button>
        </form>
      ) : (
        <h2>You just pay</h2>
      )}
    </div>
  );
};
export default PaymentForm;
