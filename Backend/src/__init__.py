__version__ = "0.1.0"
print(f"[INIT] Backend package version: {__version__}: initialized.")

import math
from .api_client import API_connection_test, query_check, __URL__, __URL_BASE__, API_login, stc_session, get_stc

stc_session = get_stc()  # Attempt to log in upon initialization

if not API_connection_test(__URL_BASE__): 
    print(f"[!INIT ERROR!] API connection test failed during package initialization; Query check: {query_check()}")
    API__connection__status__ = False
else:
    print(f"[INIT] API connection test succeeded during package initialization.")
    API__connection__status__ = True