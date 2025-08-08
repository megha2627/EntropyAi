from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
from dotenv import load_dotenv
import asyncio

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter()

# ---------------- Models ----------------
class CompanyDetailsRequest(BaseModel):
    domain_name: str
    custom_tone: str
    tone: str
    company_description: str
    chatbot_expectations: str

# ---------------- Add Company Details ----------------
@router.post("/add-company-details")
async def add_company_details(details: CompanyDetailsRequest):
    loop = asyncio.get_event_loop()

    try:
        existing_company = await loop.run_in_executor(
            None,
            lambda: supabase.table("company_details").select("domain_name").eq("domain_name", details.domain_name).execute()
        )

        if existing_company.data and len(existing_company.data) > 0:
            raise HTTPException(status_code=400, detail="Company with this domain already exists")

        response = await loop.run_in_executor(
            None,
            lambda: supabase.table("company_details").insert({
                "domain_name": details.domain_name,
                "custom_tone": details.custom_tone,
                "tone": details.tone,
                "company_description": details.company_description,
                "chatbot_expectations": details.chatbot_expectations
            }).execute()
        )

        return {"message": "Company details added successfully", "data": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/company_details")
def get_company_details():
    try:
        response = supabase.table("company_details").select("*").execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))