# This is a test script to extract the numbers and coordinate locations of 
# Tri-Met vehicles and to map the results onto Google Static Maps.

__author__ = "Kevin Saavedra"

import requests
import json
import hidden
#from hidden import APPID # Extracts all required keys from a hidden file. 
#from hidden import API_KEY
import webbrowser
import shutil

def trimet():
	"""
	Using a valid TriMet AppID, extracts the route, vehicle number, and lat/long 
	positions of all Tri-Met Vehicles presently in service at the time of query.
	
	Output:
	-------
	{Route Number : Vehicle Number, (latitude, longitude)}
	"""
	r = requests.get("https://developer.trimet.org/ws/v2/vehicles/appID=" + hidden.APPID)
	# The TriMet Key is the APPID	
	data = json.loads(r.text)

	useful = data['resultSet']['vehicle'] # These are the outermost dictionaries
	final_lst = []
	for item in useful: # Our data is a nested dictionary inside a list
		dct = {item['routeNumber'] : [item['vehicleID'], (item['latitude'], item['longitude'])]}				
		final_lst.append(dct)
	return(final_lst)

def positions_route(inpt_active, route_num):
	"""
	Test the extracted lat/long per vehicle on a given route.
	"""
	route_lst = []
	for item in inpt_active:
		for key in item:
			if key == int(route_num): #testing a single route only.
				for lst in item[key]:
					temp = [lst][0] #should yield lat/long tuples only
					route_lst.append(temp)
	print(route_lst)
	coord_only = []
	for item in route_lst:
		if type(item) == tuple:
			coord_only.append(item)
	return coord_only

def string_prep(inpt_list):
	"""
	Cleans the coordinate tuples into a string for parsing through google static 
	maps.
	"""
	str_coord = ""
	for tuples in inpt_list:
		lat_, long_ = tuples
		lat_ = str(lat_)
		long_ = str(long_)
		str_coord += lat_+ "," + long_ + " | "
	return str_coord

def google_request(input_coord):
	"""
	Maps the selected coordinates onto Google Maps.
	"""
	payload = {
	"size" : "640x640",
	"scale" : "1",
	"maptype" : "roadmap",
	"format" : "png",
	"visual_refresh" : "true",
	"markers" : input_coord,
	"key" : hidden.API_KEY
	}
	r = requests.post("https://maps.googleapis.com/maps/api/staticmap?", 
		params = payload, stream = True)
	with open('test.png', 'wb') as out_file:
		shutil.copyfileobj(r.raw, out_file)
	del r
	webbrowser.open('test.png')
	
def main():
	user_route = input("Input a route to map. >> ")
	active_lst = trimet()
	coordinates = positions_route(active_lst, user_route)
	cleaned = string_prep(coordinates)
	google_request(cleaned)

if __name__ == "__main__":
	main()

