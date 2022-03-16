const stripe = require("stripe")('sk_test_51KWHDfCv9gKDdrr7sacgZr10Jk7Eja2fCK1DecTje12NRi0N5HQZmFctUiPcCcCInYLl60KgysddD6fJYchpEpIz00oN6cax6l')


const handler = async (req, res) => {

  if (req.method === 'GET') {
    console.log('creating a customer');
    const userEmail= 'test2@gmail.com';
    const userName= 'test2unique1'
    try {
      const customer = await stripe.customers.create({
        description: 'Creating a dummy customer for test purposes',
        email: userEmail,
        name: userName,
        // metadata: { orderNumber: orderNumber }
      });
      console.log('New Customer Created: ', customer);
      
      console.log('attaching to source');
      
      const card = await stripe.customers.createSource(customer.id, { source: cardToken });
      // const retreivedCustomer = await stripe.customers.retrieve(owner.customerId);

    //   const retrievedCard = await stripe.customers.retrieveSource(retreivedCustomer.id, owner.cardId);


      const charge = await stripe.charges.create({
			amount: 10*100,
			currency: 'USD',
			source: retrievedCardId,
			receipt_email: ownerEmail,
			customer: retreivedCustomerId
		});
    res.status(200).send({
      error:false,
      message:'User charged',
      data:[]
    })
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `could not create customer : ${error.message}`,
        data: []
      });
    }
  }
};
export default handler;
