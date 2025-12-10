"""
Admin User Setup Script
Run this script to make kamesh6592@gmail.com an admin user
"""
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
MONGODB_URI = os.getenv('MONGODB_URI')
if not MONGODB_URI:
    print("❌ Error: MONGODB_URI not found in environment variables")
    print("Please make sure your .env file exists and contains MONGODB_URI")
    exit(1)

try:
    mongo_client = MongoClient(MONGODB_URI)
    db = mongo_client.chat_db
    collection = db.users
    
    # Email to make admin
    admin_email = "kamesh6592@gmail.com"
    
    # Check if user exists
    user = collection.find_one({"email": admin_email})
    
    if not user:
        print(f"❌ User with email {admin_email} not found!")
        print("Please register this account first at: https://devo-chat-kohl.vercel.app")
        mongo_client.close()
        exit(1)
    
    # Check if already admin
    if user.get("admin", False):
        print(f"✓ {admin_email} is already an admin!")
    else:
        # Update user to admin
        result = collection.update_one(
            {"email": admin_email},
            {"$set": {"admin": True}}
        )
        
        if result.modified_count > 0:
            print(f"✓ Successfully made {admin_email} an admin!")
            print("\nNext steps:")
            print("1. Log out from the application")
            print("2. Log in again with kamesh6592@gmail.com")
            print("3. Visit https://devo-chat-kohl.vercel.app/admin to access admin panel")
        else:
            print(f"❌ Failed to update user")
    
    mongo_client.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
