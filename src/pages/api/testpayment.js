const stripe = require('stripe')(
  'sk_test_51KWHDfCv9gKDdrr7sacgZr10Jk7Eja2fCK1DecTje12NRi0N5HQZmFctUiPcCcCInYLl60KgysddD6fJYchpEpIz00oN6cax6l'
);
const handler = async (req, res) => {
  const { amount, id, token } = req.body;
  console.log('hello', amount, id, token);
  const userEmail = 'test2@gmail.com';
  const userName = 'test2unique1';

  const customer = await stripe.customers.create({
    description: 'Creating a dummy customer for test purposes',
    email: userEmail,
    name: userName
    // metadata: { orderNumber: orderNumber }
  });
  console.log('New Customer Created: ', customer);

  console.log('attaching to source');

  const card = await stripe.customers.createSource(customer.id, { source: token });

  if (req.method === 'POST') {
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'random test',
        payment_method: id,
        confirm: true,
        customer: customer.id
      });
      console.log('payment Sent: Payment', payment);

      const retreivedCustomer = await stripe.customers.retrieve(customer.id);
      
      
      console.log('reterieed customer', retreivedCustomer);
      console.log('reterieed customer default source', retreivedCustomer.default_source);
      
      
      const retrievedCard = await stripe.customers.retrieveSource(retreivedCustomer.id, retreivedCustomer.default_source);
      
      console.log('reterieved card', retrievedCard);

      const charge = await stripe.charges.create({
			amount: amount,
			currency: 'USD',
			source: retrievedCard.id,
			// receipt_email: ownerEmail,
			customer: retrievedCard.customer
		});



      res.status(201).send({
        error: false,
        message: 'payment success',
        data: []
      });
    } catch (error) {
      console.log('Error,', error);
      res.status(403).send({
        error: true,
        message: error.message,
        data: []
      });
    }
  }
};
export default handler;
