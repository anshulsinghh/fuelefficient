# <div align="center">🌿 FuelEfficient</div>
<div align="center">A full-stack website, where users can see their car's emissions. <a href="http://fuelefficient.info">View the project!</a></div>  
<br/>

## Background
FuelEfficient allows users to understand their vehicle's emissions through a simple car selector tool.

The tool allows users to input the year, make, model, and variation of any vehicle and then displays personalized feedback. An example is shown below (this was run on a 2005 Suzuki Grand Vitara Automatic 4-spd):
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/577336178643042334/720185360151216148/unknown.png" alt="Personalized Feedback">
</p>

## How is Data Sourced?
FuelEfficient sources vehicle data from the EPA's <a href="https://www.fueleconomy.gov/feg/download.shtml">Fuel Economy Dataset</a>. Each row in the dataset contains the year/make/model/variation/mpg of the car alongside other extraneous information

- CO<sub>2</sub> emissions are calculated by multiplying a vehicle's MPG by <i>19.64</i> (lbs of CO<sub>2</sub> released from burning 1 gallon of gas) <a href="https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-%20is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf">Source</a>

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
