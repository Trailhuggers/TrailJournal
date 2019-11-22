DROP TABLE IF EXISTS trail;

CREATE TABLE trail (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  summary VARCHAR(255),
  trail_id INT,
  difficulty VARCHAR(255),
  stars DECIMAL(3,1),
  img_small VARCHAR(255),
  latitude  DECIMAL (12,7),
  longitude DECIMAL (12,7),
  length DECIMAL(4,1),
  conditionstatus TEXT,
  conditiondetails TEXT
);

INSERT INTO TRAIL (name, summary, trail_id, difficulty, stars, img_small, latitude, longitude,length, conditionstatus, conditiondetails) VALUES ('Shevlin Loop Trail',
    'An after work special for the Bend 9-to-5er or a tune-up time trial for the dedicated racer.',7009092,'green',
4.2,'https://cdn-files.apstatic.com/hike/7007179_sqsmall_1554322332.jpg',44.0818,-121.3784,4.8,'Unknown',
'null');

INSERT INTO TRAIL (name, summary, trail_id, difficulty, stars, img_small, latitude, longitude,length, conditionstatus, conditiondetails) VALUES ('Deschutes River Hiking Trail',
    'Needs Summary',7073493,'green',
5,'https://cdn-files.apstatic.com/hike/7056730_sqsmall_1555945367.jpg',44.0221,-121.3633,14.5,'All Clear',
'Mostly Dry, Some Mud');

INSERT INTO TRAIL (name, summary, trail_id, difficulty, stars, img_small, latitude, longitude,length, conditionstatus, conditiondetails) VALUES (
'Tiddlywinks Lower',
    'An easy climb connecting to other trails.',7035581,'blueBlack',
5,'https://cdn-files.apstatic.com/hike/7035792_sqsmall_1555020892.jpg',43.9783,-121.4684,4.1,'Unknown',
'null');

INSERT INTO TRAIL (name, summary, trail_id, difficulty, stars, img_small, latitude, longitude,length, conditionstatus, conditiondetails) VALUES ('Pilot Butte Trail',
    'A steep, short climb with great views.',7005256,'greenBlue',
3.9,'https://cdn-files.apstatic.com/hike/7004532_sqsmall_1554245535.jpg',44.0579,-121.2786,0.9,'Unknown',
'null');

