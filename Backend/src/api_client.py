import requests

__URL_BASE__ = "https://www.space-track.org/"
REQUEST_CONTROLLER_ACTION = "basicspacedata/query/class/"

__URL__ = __URL_BASE__ + REQUEST_CONTROLLER_ACTION

def API_connection_test(URL):
    response = requests.get(URL)
    if response.status_code == 200: #connection successful
        data = response.json()
        print(f"[API CLIENT] API Client initialized successfully.\nData received: {data}")
        return True
    else: #connection failed
        print(f"[!API CLIENT ERROR!] Failed to initialize API Client. Status code: {response.status_code}: {response.text}")
        return False
    
def query_check():
    response = requests.get(__URL__)
    if response.status_code == 200:
        print(f"[API CLIENT] Data query successful.")
    if response.status_code == 204:
        print(f"[API CLIENT] Data query returned no content.")
    if response.status_code == 400:
        print(f"[!API CLIENT ERROR!] Data query bad request.")
    if response.status_code == 500:
        print(f"[!API CLIENT ERROR!] Data query server error.")