// frontend/src/components/Donation/Donate.js
import React, { useState } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import axios from 'axios';

const Donate = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const handleDonate = async () => {
        try {
            const response = await axios.post('/api/payments/create', { amount }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setClientSecret(response.data.clientSecret);
            // Proceed with Stripe.js to confirm payment
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };

    return (
        <Form>
            <Form.Field>
                <label>Donation Amount (USD)</label>
                <Input
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder='Enter amount'
                />
            </Form.Field>
            <Button color='green' onClick={handleDonate}>
                Donate
            </Button>
        </Form>
    );
};

export default Donate;
