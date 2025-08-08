# Razorpay Payment Integration Setup

This guide will help you set up Razorpay payment integration for the EntropyAI application.

## 🚀 Features Implemented

- **Secure Payment Processing**: Full Razorpay integration with signature verification
- **Beautiful Payment Modal**: Modern UI with loading states and success/error handling
- **Plan Selection**: Three subscription tiers (Starter, Professional, Enterprise)
- **Payment Verification**: Backend verification with HMAC signature validation
- **Subscription Management**: Automatic subscription activation after successful payment

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **Test API Keys**: Get your test keys from Razorpay Dashboard
3. **Supabase Database**: For storing subscription data

## 🔧 Setup Instructions

### 1. Environment Variables

Add these variables to your `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=your_test_secret_key

# Existing Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 2. Install Dependencies

```bash
pip install razorpay==1.4.1
```

### 3. Supabase Database Setup

Create a `subscriptions` table in your Supabase database:

```sql
CREATE TABLE subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    payment_id TEXT NOT NULL,
    order_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_expires_at ON subscriptions(expires_at);
```

### 4. Frontend Configuration

Update the Razorpay key in `PricingSection.jsx`:

```javascript
// Replace with your actual Razorpay test key
key: "rzp_test_YOUR_KEY_HERE",
```

## 🎯 API Endpoints

### 1. Create Order
- **URL**: `POST /api/create-order`
- **Purpose**: Creates a Razorpay order for payment
- **Request Body**:
```json
{
  "planId": "starter",
  "amount": 99900,
  "currency": "INR",
  "userId": "user123"
}
```

### 2. Verify Payment
- **URL**: `POST /api/verify-payment`
- **Purpose**: Verifies payment signature and activates subscription
- **Request Body**:
```json
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature_xxx"
}
```

### 3. Payment Status
- **URL**: `GET /api/payment-status/<payment_id>`
- **Purpose**: Get payment details from Razorpay

## 💳 Payment Flow

1. **User selects a plan** → Payment modal opens
2. **User clicks "Pay with Razorpay"** → Backend creates order
3. **Razorpay popup opens** → User completes payment
4. **Payment success** → Backend verifies signature
5. **Subscription activated** → User gets access to paid features

## 🔒 Security Features

- **HMAC Signature Verification**: Ensures payment authenticity
- **Amount Validation**: Prevents payment tampering
- **Order ID Tracking**: Prevents duplicate payments
- **Error Handling**: Comprehensive error management

## 🎨 UI Features

- **Loading States**: Spinner during payment processing
- **Success Animation**: Celebration emoji and confirmation
- **Error Handling**: Clear error messages with retry option
- **Responsive Design**: Works on all device sizes
- **Modern Styling**: Gradient backgrounds and smooth animations

## 🧪 Testing

### Test Cards (Razorpay Test Mode)

| Card Type | Card Number | CVV | Expiry |
|-----------|-------------|-----|--------|
| Success | 4111 1111 1111 1111 | 123 | Any future date |
| Failure | 4000 0000 0000 0002 | 123 | Any future date |
| UPI | success@upi | - | - |

### Test UPI IDs
- `success@upi` - Successful payment
- `failure@upi` - Failed payment

## 🚨 Important Notes

1. **Test Mode**: Use test keys for development
2. **Production**: Switch to live keys for production
3. **Webhook**: Set up webhooks for production (optional but recommended)
4. **Error Logging**: Monitor payment failures in production
5. **Refund Policy**: Implement refund handling if needed

## 🔧 Customization

### Plan Configuration
Edit the `plans` array in `PricingSection.jsx`:

```javascript
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    amount: 99900, // Amount in paise
    // ... other properties
  }
];
```

### Styling
The payment modal uses Tailwind CSS classes. Customize colors and styling as needed.

### Error Messages
Update error messages in the frontend component for better user experience.

## 📞 Support

For issues with:
- **Razorpay Integration**: Check Razorpay documentation
- **Payment Failures**: Verify API keys and network connectivity
- **UI Issues**: Check browser console for JavaScript errors

## 🎉 Success!

Your EntropyAI application now has a complete Razorpay payment integration with:
- ✅ Secure payment processing
- ✅ Beautiful user interface
- ✅ Comprehensive error handling
- ✅ Subscription management
- ✅ Production-ready code

Users can now seamlessly upgrade their plans and access premium features! 