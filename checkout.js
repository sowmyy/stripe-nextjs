import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}) {
    let stripePromise = null;

    const getStripe  = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_API_KEY}`)
        }
        return stripePromise;
    }

    const stripe = await getStripe()



    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}? session_id={CHECKOUT_SESSION_ID}/successPurchase`,
        cancelUrl: window.location.origin
    })

    await stripe.retrievePaymentIntent('{PAYMENT_INTENT_CLIENT_SECRET}')
        .then(function(result) {
        console.log('result', result)
        // Handle result.error or result.paymentIntent
    });
 }