from src import __connection__status__, __URL__, __URL_BASE__
import requests
from dotenv import load_dotenv
from spacetrack import SpaceTrackClient
import os

if __connection__status__:
    print(f"[API HANDLER] Connection status: {__connection__status__}. Proceeding with API handler operations.")

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