from fastapi import FastAPI
from utils.apis import auth_routes
from utils.apis import file_upload
from fastapi.middleware.cors import CORSMiddleware

from utils.apis import  companydesc

app = FastAPI()
app.include_router(companydesc.router)
app.include_router(file_upload.router)
app.include_router(auth_routes.router, prefix="/auth")

@app.get("/")
def root():
    
    return {"message": "API is working"}


# Allow all origins (For Dev only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace * with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
