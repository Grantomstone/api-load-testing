from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
import random
import asyncio
import os

instance = os.getenv("INSTANCE_ID", default="Instance_Unknown")
app = FastAPI()

instrumentator = Instrumentator()
instrumentator.instrument(app)
instrumentator.expose(app)

@app.get("/")
async def getRoot():
	return {"status":"ok", "instance":instance}

@app.get("/api/compute")
async def compute():
	work_ms = random.randint(30,500)
	asyncio.sleep(work_ms /1000)
	return {"result": f"computed in {work_ms}ms", "instance":instance}

@app.get("/health")
async def health():
	return {"healthy": True}
