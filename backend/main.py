from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MissionRequest(BaseModel):
    time: int
    activity: str
    energy: str


@app.get("/")
def home():
    return {
        "message": "TouchGrass AI backend is running 🌱"
    }


@app.post("/generate-mission")
def generate_mission(request: MissionRequest):

    prompt = f"""
You are TouchGrass AI.

Your job is to create a simple outdoor mission
that gets the user away from their screen.

User has:
- {request.time} minutes
- Preferred activity: {request.activity}
- Energy level: {request.energy}

Create a safe and enjoyable outdoor mission.

Give:
1. A mission title
2. 3 to 5 simple steps
3. A final reminder to put the phone away.

Keep it concise.
"""

    response = ollama.chat(
        model="gemma3:4b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "mission": response["message"]["content"]
    }