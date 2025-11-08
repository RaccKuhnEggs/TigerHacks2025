import requests

URL_BASE = "https://www.space-track.org/"
REQUEST_CONTROLLER_ACTION = "basicspacedata/query/class/"

__URL__ = URL_BASE + REQUEST_CONTROLLER_ACTION

def API_connection_test(URL):
    response = requests.get(URL)
    if response.status_code == 200: #connection successful
        data = response.json()
        print(f"[API CLIENT] API Client initialized successfully.\nData received: {data}")
        return True
    else: #connection failed
        print(f"[!API CLIENT ERROR!] Failed to initialize API Client. Status code: {response.status_code}: {response.text}")
        return False