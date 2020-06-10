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
FuelEfficient sources vehicle data from the EPA's <a href="https://www.fueleconomy.gov/feg/download.shtml">Fuel Economy Dataset</a>. Each row in the dataset contains the year/make/model/variation/mpg of the car alongside other extraneous information. For calculations in each distance card (100mi/10,000mi/150,000mi) the factors below are used:

- CO<sub>2</sub> emissions are calculated by multiplying the MPG by <i>19.64</i> (lbs of CO<sub>2</sub> per gallon of gas) - <a href="https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-%20is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf">Source</a>
- The average household produces <i>7.5 tons</i> of CO<sub>2</sub> a year - <a href="https://www.ccfpd.org/Portals/0/Assets/PDF/Facts_Chart.pdf">Source</a>. This equates to <i>1,250lbs</i> per month
- An airliner releases <i>53lbs</i> of CO<sub>2</sub>  per mile - <a href="https://blueskymodel.org/air-mile">Source</a>. Since San Diego and Phoenix are <i>298.67mi</i> apart, this means that a flight between SD and PHX releases about <i>15,829.51lbs</i> of CO<sub>2</sub> - <a href="https://www.distance.to/Phoenix/San-Diego">Source</a>
- A tree absorbs approximately <i>1 ton</i> of CO<sub>2</sub> by the time it reaches 40 years old. This is equivalent to <i>2000lbs</i> of CO<sub>2</sub> absorbed per 40 year old tree - <a href="https://www.co2meter.com/blogs/news/could-global-co2-levels-be-reduced-by-planting-trees">Source</a>

## How It Works
FuelEfficient is built on a MySQL, Express, React, and NodeJS stack.
### DB
Test
### Frontend
Test
### Backend
| Route | Params |
| --- | --- |
| `/api/v1.0/years` | none |
| `/api/v1.0/makes` | year |
| `/api/v1.0/models` | year, make |
| `/api/v1.0/model-variations` | year, make, model |
| `/api/v1.0/fuel-data` | year, make, model, variation |


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
