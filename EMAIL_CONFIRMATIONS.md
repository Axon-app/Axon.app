# Email Confirmations

## Confirmation Templates

### Success Message

```
Thank you for your message!
We have received your inquiry and will respond within 24 hours.

Best regards,
Axon Team
```

### Auto-Reply Template

```
Subject: Thank you for contacting Axon.App

Dear {{from_name}},

Thank you for reaching out to us. We have received your message:

"{{message}}"

Our team will review your inquiry and respond within 24 hours.

Best regards,
The Axon Team
```

## Email Validation Rules

- Valid email format required
- Message minimum 10 characters
- Name minimum 2 characters
- Subject minimum 5 characters

## Delivery Status

- Success: Green confirmation message
- Error: Red error message with retry option
- Pending: Loading spinner during submission
