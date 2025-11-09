#LITEVIEW BACKEND
The LiteView Backend provides a FastAPI-based interface for querying, processing, and serving real-time satellite catalog (SATCAT) and orbital element (TLE) data from [Space-Track.org](https://www.space-track.org/).  
It handles API authentication, querying, merging of multiple datasets, and provides structured JSON responses that can be consumed by a frontend.

---

##Overview
The backend performs three main functions:

1. **Authenticate with Space-Track.org** using registered user credentials.  
2. **Fetch data** from two sources:
   - **SATCAT (Satellite Catalog):** General information (e.g., object type, country, launch date).  
   - **TLE (Two-Line Element Sets):** Orbital data (e.g., inclination, period, apogee, perigee).
3. **Merge both datasets** into unified JSON objects keyed by `NORAD_CAT_ID`.

---

##Tech stack
- **Language:** Python 3.11+
- **Framework:** FastAPI + Uvicorn
- **External API:** [Space-Track REST API](https://www.space-track.org/documentation)
- **Deployment:** Docker (or Coolify)
- **Environment Variables:** Managed via `.env` or Coolify environment panel

---
##Project structure
backend/
│
├── main.py # FastAPI app entry point
├── src/
│ ├── init.py
│ ├── api_handler.py # Space-Track API handling, merging, and data retrieval
│ └── api_client.py # Login and connection to Space-Track.org
│
├── Dockerfile # Container build config
├── requirements.txt # Dependencies
└── README.md

##Running docker with Vultr
- Build and stage changes: ```docker build -t liteview-backend .```
- Push changes to Vultr server: ```docker run -p 8000:8000 --env-file .env liteview-backend```
- environment variables must be manually inputted into Vultr
