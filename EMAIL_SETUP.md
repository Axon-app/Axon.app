# Email Setup Guide

## EmailJS Configuration

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service

1. Go to Email Services
2. Add new service (Gmail, Outlook, etc.)
3. Configure your email credentials

### Step 3: Create Email Template

1. Go to Email Templates
2. Create new template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{subject}}`

### Step 4: Get Your Keys

1. Copy your Service ID
2. Copy your Template ID
3. Copy your Public Key

### Step 5: Update Environment

Add to your `.env` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Testing

Use the contact form to test email delivery.
