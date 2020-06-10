# <div align="center">🌿 FuelEfficient</div>
<div align="center">A full-stack website, where users can see their car's emissions. <a href="http://fuelefficient.info">View the project!</a></div>  
<br/>

## Background
FuelEfficient allows users to input the year, make, model, and variation of any vehicle and then displays the following:
- Displays the vehicle's MPG alongside a personalized reaction (depending on how good/bad the MPG was)
- Displays 3 cards each for various distances (100 miles, 10,000 miles, 150,000 miles)
- Each of the 3 cards shows how much C0<sub>2</sub> the car releases, and how many homes' monthly emissions it's equivalent to, how many flights from SD to PHX it's equivalent to, and how many 40 y/o trees needed to offset the carbon emissions


FuelEfficient sources vehicle MPG data from the EPA's <a href="https://www.fueleconomy.gov/feg/download.shtml">Fuel Economy Dataset</a>. Each row in the dataset contains the year/make/model/variation of the car, as well as the car's MPG. This data is parsed and used by FuelEfficient 
## How It Works
FuelEfficient is built on a MySQL, Express, React, and NodeJS stack.
### DB
Test
### Frontend
Test
### Backend
Test


## Deployment
```
CREATE TABLE `vehicles` (
  `year` int(5) unsigned NOT NULL,
  `make` varchar(30) NOT NULL DEFAULT '',
  `model` varchar(30) NOT NULL DEFAULT '',
  `variation` varchar(40) NOT NULL DEFAULT '',
  `mpg` int(11) NOT NULL,
  `identifier` varchar(150) NOT NULL DEFAULT '',
  PRIMARY KEY (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
## Running the Code
