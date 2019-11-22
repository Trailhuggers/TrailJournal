# Trail Journal

The web application solves this problem by linking information from the All Trails API by location to provide a list of trail options with related information such as hike difficulty and trail conditions. The user will be able to save hikes for later retrieval. An image of the trail will be displayed with an option to get further detailed information.

## Problem Domain

Create an application that allows users to search local trails and save them for later personal use.

## Collaborators

- Natalie Alway
- Mark Swearingen
- Conor McCue
- Trevor Thompson

**Version**: 1.0.0 (Project Pitch)

## Required Assets

### Libraries

- jQuery
- EJS

### NPM Modules

- Express
- SuperAgent
- pg
- cors
- dotenv
- methodOverride
- eslint

## API Library

- Hiking Project API
- Google Maps Geocode API

## User Instructions

NPM Install:

- SuperAgent
- dotenv
- pg
- express
- methodOverride

## Attributions

Hamburger Menu:
https://codepen.io/erikterwan/pen/grOZxx

## API Sample Responses:
```

Google Maps
Location - longitude and latitude
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
Example:
{
"results" : [
{
  "address_components" : [
      {
        "long_name" : "1600",
        "short_name" : "1600",
        "types" : [ "street_number" ]
      },
      {
        "long_name" : "Amphitheatre Parkway",
        "short_name" : "Amphitheatre Pkwy",
        "types" : [ "route" ]
      },
      {
        "long_name" : "Mountain View",
        "short_name" : "Mountain View",
        "types" : [ "locality", "political" ]
      },
      {
        "long_name" : "Santa Clara County",
        "short_name" : "Santa Clara County",
        "types" : [ "administrative_area_level_2", "political" ]
      },
      {
        "long_name" : "California",
        "short_name" : "CA",
        "types" : [ "administrative_area_level_1", "political" ]
      },
      {
        "long_name" : "United States",
        "short_name" : "US",
        "types" : [ "country", "political" ]
      },
      {
        "long_name" : "94043",
        "short_name" : "94043",
        "types" : [ "postal_code" ]
      }
  ],
  "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
  "geometry" : {
      "location" : {
        "lat" : 37.4267861,
        "lng" : -122.0806032
      },
      "location_type" : "ROOFTOP",
      "viewport" : {
        "northeast" : {
            "lat" : 37.4281350802915,
            "lng" : -122.0792542197085
        },
        "southwest" : {
            "lat" : 37.4254371197085,
            "lng" : -122.0819521802915
        }
      }
  },
  "place_id" : "ChIJtYuu0V25j4ARwu5e4wwRYgE",
  "plus_code" : {
      "compound_code" : "CWC8+R3 Mountain View, California, United States",
      "global_code" : "849VCWC8+R3"
  },
  "types" : [ "street_address" ]
}
],
"status" : "OK"
}

Hiking Get Trails
https://www.hikingproject.com/data
longitude, latitude and miles from Search
https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=YOUR_API_KEY

Example:
{
"trails": [
{
"id": 7000130,
"name": "Bear Peak Out and Back",
"type": "Featured Hike",
"summary": "A must-do hike for Boulder locals and visitors alike!",
"difficulty": "blueBlack",
"stars": 4.6,
"starVotes": 109,
"location": "Boulder, Colorado",
"url": "https:\/\/www.hikingproject.com\/trail\/7000130\/bear-peak-out-and-back",
"imgSqSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_sqsmall_1554312030.jpg",
"imgSmall": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_small_1554312030.jpg",
"imgSmallMed": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_smallMed_1554312030.jpg",
"imgMedium": "https:\/\/cdn-files.apstatic.com\/hike\/7005382_medium_1554312030.jpg",
"length": 5.7,
"ascent": 2541,
"descent": -2540,
"high": 8342,
"low": 6103,
"longitude": -105.2755,
"latitude": 39.9787,
"conditionStatus": "All Clear",
"conditionDetails": "",
"conditionDate": "2019-08-10 16:37:58"
}
```
