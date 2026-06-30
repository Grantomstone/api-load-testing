FROM python:3.14-alpine

WORKDIR /src
COPY requirements.txt ./
COPY main.py .

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "uvicorn", "--workers", "4", "--host", "0.0.0.0", "main:app" ]
