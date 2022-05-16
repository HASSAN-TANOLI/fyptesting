const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KtrvpHdrSJTSf3YXyh6tiSLgJVWqb6nQPWhQI6dBVnmJEiZrWzx93THbt0EI73jG0pvMR87yheU0aHwxllInBeB00SIDo31g2');




// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  //stripe has a intent mathod

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'pkr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})
