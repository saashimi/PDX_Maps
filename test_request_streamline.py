# This is a test script to extract the numbers and coordinate locations of 
# Tri-Met vehicles.

__author__ = "Kevin Saavedra"

import requests
import json
from hidden import APPID

def trimet():
	"""
	Using a valid AppID, extracts the route, vehicle number, and lat/long 
	positions of all Tri-Met Vehicles presently in service at the time of query.
	
	Output:
	-------
	{Route Number : Vehicle Number, (latitude, longitude)}
	"""
	r = requests.post("https://developer.trimet.org/ws/v2/vehicles/appID=" + APPID)
	data = json.loads(r.text)
	#print(data)

	useful = data['resultSet']['vehicle'] # These are the outermost dictionaries
	final_lst = []
	for item in useful: # Our data is a nested dictionary inside a list
		dct = { item['routeNumber'] : [item['vehicleID'], 
			   'latitude' : item['latitude'], 
			   'longitude' : item['longitude'] }				
		final_lst.append(dct)		
	print(final_lst)
	return(final_lst)

if __name__ == "__main__":
	trimet()

