from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
from dotenv import load_dotenv
from jose import jwt
from datetime import datetime, timedelta

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter()

SECRET_KEY = "your_super_secret_key"
ALGORITHM = "HS256"

# ---------------- Models ----------------
class RegisterRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

class LoginRequest(BaseModel):
    email: str
    password: str

# ---------------- Register Route ----------------
@router.post("/register")
def register_user(user: RegisterRequest):
    existing_user = supabase.table("users").select("email").eq("email", user.email).execute()

    # 🛑 Check if user already exists
    if existing_user.data and len(existing_user.data) > 0:
        raise HTTPException(status_code=400, detail="User already exists")

    # ✅ Register New User
    supabase.table("users").insert({
        "email": user.email,
        "password": user.password,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": "user"
    }).execute()
    
    return {"message": "User registered successfully"}

# ---------------- Login Route ----------------
@router.post("/login")
def login_user(credentials: LoginRequest):
    user_data = supabase.table("users").select("*").eq("email", credentials.email).execute()

    # 🛑 Email does not exist
    if not user_data.data or len(user_data.data) == 0:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user = user_data.data[0]

    # 🛑 Password does not match
    if user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # ✅ Generate JWT Token
    payload = {
        "sub": user["email"],
        "user_id": user["id"],
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "role": user["role"]
        }
    }


from fastapi import Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

@router.post("/logout")
def logout_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials  # Extract token from Authorization header
    return {
        "message": "Logout successful. Please remove token on client side.",
        "token_invalidated": True
    }
