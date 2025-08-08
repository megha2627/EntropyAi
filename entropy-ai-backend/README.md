# Entropy AI Backend

A simplified Flask backend that uses Supabase for data storage.

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Create Environment File
Create a `.env` file in the backend directory with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

### 3. Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the following SQL to create the required table:

```sql
CREATE TABLE company_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain_name TEXT NOT NULL UNIQUE,
    tone TEXT NOT NULL,
    custom_tone TEXT,
    company_description TEXT NOT NULL,
    chatbot_expectations TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE company_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
CREATE POLICY "Allow all operations" ON company_details
    FOR ALL USING (true);
```

### 4. Run the Backend
```bash
python app.py
```

The backend will start on `http://localhost:5000`

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /free-trial` - Create a new trial entry

### Free Trial Endpoint
**POST** `/free-trial`

**Request Body:**
```json
{
    "domain_name": "example.com",
    "tone": "professional",
    "custom_tone": "friendly",
    "company_description": "A tech company",
    "chatbot_expectations": "Customer support"
}
```

**Response:**
```json
{
    "message": "Trial created successfully",
    "company_id": "uuid-here"
}
```

## Frontend Integration

The frontend is already configured to send data to `http://localhost:5000/free-trial`. Make sure the backend is running before testing the frontend. 