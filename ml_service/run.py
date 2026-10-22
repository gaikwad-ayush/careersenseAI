"""Runner script for CareerSense AI FastAPI ML Service."""
import sys
import uvicorn

if __name__ == "__main__":
    port = 8000
    host = "127.0.0.1"
    print(f"🚀 Starting CareerSense AI ML FastAPI Service on http://{host}:{port}")
    print(f"📖 OpenAPI / Swagger Docs: http://{host}:{port}/docs")
    uvicorn.run("ml_service.main:app", host=host, port=port, reload=True)
