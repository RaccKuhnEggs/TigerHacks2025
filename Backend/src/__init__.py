__version__ = "0.1.0"
print(f"[INIT] Backend package version: {__version__}: initialized.")

import math
from api_client import __URL_BASE__, __URL__, API_connection_test

if not API_connection_test(__URL__): 
    print(f"[!INIT ERROR!] API connection test failed during package initialization.\n")
    API__connection__status__ = False
else:
    print(f"[INIT] API connection test succeeded during package initialization.")
    API__connection__status__ = True