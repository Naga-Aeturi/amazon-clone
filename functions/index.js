const functions =require('firebase-functions');
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')('sk_test_51NYxHMSDoiKHF49gG9Kqh8RrP9OLx6Z1XyZRAAXDQfMAIBUSF7nAyiZFsPaGAbaGoT3IgAilyrwibtrxJDpyBuiG00HODwNTSW');

const app=express();

app.use(cors({origin:true}));
app.use(express.json());

app.get('/',(request,response)=>response.status(200).send('hello world'));
app.post('/payments/create',async (request,response)=>{
    const total=parseInt(request.query.total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"inr"
    })
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})
exports.api=functions.https.onRequest(app);