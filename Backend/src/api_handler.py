from src import API__connection__status__, __URL__, __URL_BASE__, get_stc, API_login
import requests
import json
from skyfield.api import EarthSatellite
from dotenv import load_dotenv
from spacetrack import SpaceTrackClient
import os

if API__connection__status__: #connection check
    print(f"[API HANDLER] Connection status: {API__connection__status__}. Proceeding with API handler operations.")


# ----- HELPER FUNCTIONS -----
def tle_to_json(raw_input):
    # Step 1: Parse the outer JSON
    outer_data = json.loads(raw_input)

    # Step 2: Parse the inner JSON string
    sat_list = json.loads(outer_data["satcat_data"])

    # Step 3: Convert each to a structured dict (here adding placeholders for TLE lines)
    structured_data = []
    for sat in sat_list:
        structured_data.append({
            "NORAD_CAT_ID": sat["NORAD_CAT_ID"],
            "PERIOD": sat["PERIOD"],
            "INCLINATION": sat["INCLINATION"],
            "APOGEE": sat["APOGEE"],
            "PERIGEE": sat["PERIGEE"],
            "TLE": {
                "line1": None,
                "line2": None
            }
        })

    # Step 4: Save as JSON
    with open("satellite_data.json", "w") as f:
        json.dump(structured_data, f, indent=2)

    return structured_data
    
#  type based queries
def get_satcat_type(limit=None, type_name="PAYLOAD"):
    stc=get_stc()
    type_name=type_name.upper()

    try:
        satcat_data = stc.satcat(object_type=type_name, decay = "null-val", format="json", limit=limit, predicates=["NORAD_CAT_ID", "OBJECT_NAME", "TYPE", "COUNTRY", "RCS_SIZE", "LAUNCH"])
        
        if isinstance(satcat_data, str):
            satcat_data = json.loads(satcat_data)
        norad_ids = [item['NORAD_CAT_ID'] for item in satcat_data]

        tle_data = stc.tle_latest(norad_cat_id=norad_ids, format="json", limit=limit, predicates=["NORAD_CAT_ID", "PERIOD", "INCLINATION", "APOGEE", "PERIGEE"])
        
        
        print(f"[API HANDLER] Retrieved {type_name} SATCAT data. Number of records: {len(satcat_data)}")
        return tle_data
    except Exception as e:
        print(f"[!API HANDLER ERROR!] Exception during {type_name} SATCAT query: {e}")
        return None
    
