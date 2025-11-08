__version__ = "0.1.0"
print(f"Backend package version: {__version__} | initialized.")

import math
from api_client import __URL__, API_connection_test

if not API_connection_test(__URL__): 
    print(f"API connection test failed during package initialization.")
else:
    print(f"API connection test succeeded during package initialization.")