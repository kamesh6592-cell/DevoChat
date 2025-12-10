# Admin Configuration Guide

## How to Make kamesh6592@gmail.com an Admin

### Option 1: Using MongoDB Atlas UI (Easiest)

1. Go to https://cloud.mongodb.com/
2. Sign in to your MongoDB Atlas account
3. Navigate to your cluster → Click "Browse Collections"
4. Select database: `chat_db`
5. Select collection: `users`
6. Find the user document with email `kamesh6592@gmail.com`
7. Click "Edit Document"
8. Change the field: `"admin": false` → `"admin": true`
9. Click "Update"

### Option 2: Using MongoDB Shell/Compass

```javascript
// Connect to your MongoDB and run this command:
db.users.updateOne(
  { "email": "kamesh6592@gmail.com" },
  { $set: { "admin": true } }
)
```

### Option 3: Using Python Script

Create a file `make_admin.py` in the backend folder:

```python
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_client = MongoClient(os.getenv('MONGODB_URI'))
db = mongo_client.chat_db
collection = db.users

# Update user to admin
result = collection.update_one(
    {"email": "kamesh6592@gmail.com"},
    {"$set": {"admin": True}}
)

if result.modified_count > 0:
    print("✓ Successfully made kamesh6592@gmail.com an admin!")
else:
    print("✗ User not found or already an admin")

mongo_client.close()
```

Then run:
```bash
cd backend
python make_admin.py
```

### Verify Admin Access

1. Log in with kamesh6592@gmail.com
2. Navigate to: https://devo-chat-kohl.vercel.app/admin
3. You should now see the admin panel with user statistics

## Admin Privileges

As an admin user, you will have:
- Access to `/admin` page with user statistics
- No file size limits (regular users: 10MB)
- No text extraction limits (regular users: 20,000 chars)
- Access to premium AI models without billing restrictions
- Ability to use MCP servers marked as admin-only
- No trial period limitations

## Current Admin Features

### File Upload
- Regular users: 10MB limit per file
- Admin users: No limit

### Text Extraction
- Regular users: 20,000 character limit
- Admin users: No limit

### Model Access
- Regular users: Limited by trial/billing
- Admin users: Full access to all models

### MCP Servers
- Can mark servers as admin-only in configuration
- Only admins can use admin-restricted servers

## Security Note

The admin status is stored in:
1. MongoDB user document (`admin` field)
2. JWT token (included in `admin` claim)

When you update the admin status in MongoDB, the user needs to:
1. Log out
2. Log in again (to get new JWT token with admin claim)
