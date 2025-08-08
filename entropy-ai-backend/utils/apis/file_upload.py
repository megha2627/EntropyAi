from fastapi import APIRouter, File, UploadFile, HTTPException
from supabase import create_client, Client
import os
import uuid

router = APIRouter()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
SUPABASE_BUCKET = "user-uploads"
@router.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"

        # Upload to Supabase Storage
        response = supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=unique_filename,
            file=contents,
            file_options={"content-type": file.content_type}
        )

        # Get the public URL of the uploaded file
        file_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(unique_filename)

        return {
            "message": "File uploaded successfully",
            "filename": unique_filename,
            "public_url": file_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))