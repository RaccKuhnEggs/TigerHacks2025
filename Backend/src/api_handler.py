from src import API__connection__status__, __URL__, __URL_BASE__
import requests
from dotenv import load_dotenv
from spacetrack import SpaceTrackClient
import os

if API__connection__status__: #connection check
    print(f"[API HANDLER] Connection status: {API__connection__status__}. Proceeding with API handler operations.")


# ----- SPACE TRACK SESSION LOG IN -----

stc_session = None # Global session variable

def API_login():
    login_url = __URL_BASE__ + "ajaxauth/login"
    response = requests.get(login_url)

    load_dotenv()

    username = os.getenv("SPACE_TRACK_USER")
    password = os.getenv("SPACE_TRACK_PASS")
    if not username or not password:
        print("[!API HANDLER ERROR!] Missing Space-Track credentials in .env file.")
        return None
    
    global stc_session

    if stc_session is not None:
        print("[API HANDLER] Already logged in.")
        return stc_session

    try:    
        stc_session = SpaceTrackClient(identity=username, password=password)
        stc_session.tle_latest(limit=1, format="json")
        print(f"[API HANDLER] Logged into Space-Track.org as user: {username}")
        return stc_session

    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during API login: {e}")
        return None

def get_stc():
    global stc_session
    if stc_session is None:
        stc_session = API_login()
    return stc_session

# ----- API DATA QUERIES -----
def get_all_active_SATCAT(limit=None):
    stc=get_stc()
    try:
        stc_general_response = stc.satcat(query="DECAY=nullval", format="json", limit=limit, predicates=["NORAD_CAT_ID", "OBJECT_NAME", "TYPE", "COUNTRY", "RCS", "PERIOD", "INCLINATION", "APOGEE", "PERIGEE","LAUNCH_DATE"])
        print(f"[API HANDLER] Retrieved SATCAT data. Number of records: {len(stc_general_response)}")
        return stc_general_response
    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during SATCAT query: {e}")
        return None
    
#  type based SATCAT queries 
def get_rocket_body_SATCAT(limit=None): #rocket bodies only
    stc=get_stc()
    try:
        stc_rocket_response = stc.satcat(query="OBJECT_TYPE='ROCKET BODY'&DECAY=nullval", format="json", limit=limit, predicates=["NORAD_CAT_ID", "OBJECT_NAME", "TYPE", "COUNTRY", "RCS", "PERIOD", "INCLINATION", "APOGEE", "PERIGEE","LAUNCH_DATE"])
        print(f"[API HANDLER] Retrieved Rocket Body SATCAT data. Number of records: {len(stc_rocket_response)}")
        return stc_rocket_response
    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during Rocket Body SATCAT query: {e}")
        return None
    
def get_payload_SATCAT(limit=None): #payload only
    stc=get_stc()
    try:
        stc_payload_response = stc.satcat(query="OBJECT_TYPE='PAYLOAD'&DECAY=nullval", format="json", limit=limit, predicates=["NORAD_CAT_ID", "OBJECT_NAME", "TYPE", "COUNTRY", "RCS", "PERIOD", "INCLINATION", "APOGEE", "PERIGEE","LAUNCH_DATE"])
        print(f"[API HANDLER] Retrieved Payload SATCAT data. Number of records: {len(stc_payload_response)}")
        return stc_payload_response
    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during Payload SATCAT query: {e}")
        return None

def get_debris_SATCAT(limit=None): #debris only
    stc=get_stc()
    try:
        stc_debris_response = stc.satcat(query="OBJECT_TYPE='DEBRIS'&DECAY=nullval", format="json", limit=limit, predicates=["NORAD_CAT_ID", "OBJECT_NAME", "TYPE", "COUNTRY", "RCS", "PERIOD", "INCLINATION", "APOGEE", "PERIGEE","LAUNCH_DATE"])
        print(f"[API HANDLER] Retrieved Debris SATCAT data. Number of records: {len(stc_debris_response)}")
        return stc_debris_response
    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during Debris SATCAT query: {e}")
        return None