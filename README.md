# <div align="center">🌿 FuelEfficient</div>
<div align="center">A full-stack website, where users can see their car's emissions. <a href="http://fuelefficient.info">View the project!</a></div>  
<br/>

## Background
FuelEfficient allows users to understand their vehicle's emissions through a simple car selector tool.

The tool allows users to input the year, make, model, and variation of any vehicle and then displays personalized feedback. An example is shown below (this was run on a 2005 Suzuki Grand Vitara Automatic 4-spd):
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/577336178643042334/720185360151216148/unknown.png" alt="Personalized Feedback">
</p>

## Data Sources
FuelEfficient sources vehicle data from the EPA's <a href="https://www.fueleconomy.gov/feg/download.shtml">Fuel Economy Dataset</a>. Each row in the dataset contains the year/make/model/variation/mpg of the car alongside other extraneous information. For calculations in each distance card (100mi/10,000mi/150,000mi) the factors below are used:

- CO<sub>2</sub> emissions are calculated by multiplying the MPG by <i>19.64</i> (lbs of CO<sub>2</sub> per gallon of gas) - <a href="https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-%20is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf">Source</a>
- The average household produces <i>7.5 tons</i> of CO<sub>2</sub> a year - <a href="https://www.ccfpd.org/Portals/0/Assets/PDF/Facts_Chart.pdf">Source</a>. This equates to <i>1,250lbs</i> per month
- An airliner releases <i>53lbs</i> of CO<sub>2</sub>  per mile - <a href="https://blueskymodel.org/air-mile">Source</a>. Since San Diego and Phoenix are <i>298.67mi</i> apart, this means that a flight between SD and PHX releases about <i>15,829.51lbs</i> of CO<sub>2</sub> - <a href="https://www.distance.to/Phoenix/San-Diego">Source</a>
- A tree absorbs approximately <i>1 ton</i> of CO<sub>2</sub> by the time it reaches 40 years old. This is equivalent to <i>2000lbs</i> of CO<sub>2</sub> absorbed per 40 year old tree - <a href="https://www.co2meter.com/blogs/news/could-global-co2-levels-be-reduced-by-planting-trees">Source</a>

## How It Works
FuelEfficient is built on a MySQL, Express, React, and NodeJS stack. A Python script is used to populate and update the DB using the EPA Fuel Economy Dataset.

### DB
The DB Updater Python script (found in `./DB Updater`) takes the following steps to populate the MySQL database with vehicles from the Fuel Economy dataset:
1. Create a connection to the MySQL DB
2. Create a cursor for MySQL DB insertions
3. Download and parse appropriate fields in the Fuel Economy dataset using Pandas (without writing to disk)
4. Parse Pandas dataframe and upload each row to the DB, updating any rows if they already exist in the DB
5. Close up connection to DB

### Backend
REST API routes were created using Express (code in `./Server`). The server works with the MySQL DB to serve appropriate responses to each request (given the appropriate parameters). The route table is shown below:

| Route | Params | Type | Description |
| --- | --- | -- | -- |
| `/api/v1.0/years` | none | `GET` | Retrieve all unique car years in the DB |
| `/api/v1.0/makes` | year | `GET` | Retrieve all possible makes for a given year |
| `/api/v1.0/models` | year, make | `GET` | Retrieve all models for a given year and make |
| `/api/v1.0/model-variations` | year, make, model | `GET` | Retrieve all model variations for a given year/make/model |
| `/api/v1.0/fuel-data` | year, make, model, variation | `GET` | Retrieve the MPG and mile calculations for a given year/make/model/variation |

### Frontend
The frontend was built using React, and was built with a component based design process. The selector in particular is responsible for querying the appropriate routes in the Server. 

For example, when the user selects the year of his car the frontend queries the makes given the year the user selected. It then displays the makes available for the given year for the user to choose.

Frontend code and implementation can be found in `./Client`.

## Deployment
### Docker
FuelEfficient uses Docker to create a containerized production build of FuelEfficient. The Dockerfile for creating the production build can be found in `./Deployment`. The Dockerfile performs the following actions to build the project:
1. Copy the client to a `./Client` folder in the working directory
2. Remove any existing node_modules or build files from the copied client files
3. Run `npm install` and `npm run build` to install Client dependencies, and create a production version of the React client
4. Copy over the server code to the working directory (no subfolder)
5. Install the server dependencies with `npm install`
6. Expose port 4000 of the container
7. Set the NODE_ENV environment variable to production, and start the server

In the production version of FuelEfficient, the Server and Client are combined. The Server serves the built version of the client on routes that are not used by existing API routes. The client queries the API routes while it's being run. 

### AWS
The Dockerfile was built into an image, which was pushed onto Docker Hub. The Docker Hub image was used in the `./Deployment/Dockerrun.aws.json` file, which contains instructions for AWS Elastic Beanstalk on which Docker Hub image to use, and what container port to host port passthroughs to use. The `Dockerrun.aws.json` file was locally uploaded to AWS Elastic Beanstalk to deploy the FuelEfficient code.

The database for FuelEfficient was deployed beforehand, and runs on a simple AWS RDS MySQL instance. The database was populated by running the `./DB Updater` script locally.

## Running the Code
### MySQL Setup
To run the code, you must have a MySQL database running (this can be either locally or remotely). The following SQL code sets up a vehicles table for FuelEfficient to store and retrieve vehicle information:

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

After setting up the table in the MySQL DB, run the `./DB Updater/script.py` script to populate the database with vehicles from the fuel economy dataset (make sure to install the dependencies in `./DB Updater/requirements.txt`, and input MySQL connection details in `./DB Updater/utilities/connect_db.py` beforehand).

Now that the DB is ready, you can choose to run FuelEfficient's server and client in isolated processes - or run FuelEfficient in its production version, where the server and client are merged.

Make sure to fill in MySQL connection details in `./Server/server.js` beforehand.

### Isolated Processes
1. Run `npm install` in both `./Server` and `./Client` to install required dependencies
2. Modify `./Server/server.js` to point to the MySQL DB instance
3. Run `npm start` in `./Server`, and query a server route to make sure it's running (it defaults to port 4000)
4. Modify the `./Client/src/api/index.js` file's url variable to point to the url of the server (make sure to append the `/api/v1.0` tag to the end of the new url)
5. Run `npm start` in the `./Client` folder and view FuelEfficient in your browser

### Production
1. Run `docker build -t [INSERT IMAGE TAG HERE] -f Deployment/Dockerfile .` in the root level of FuelEfficient
2. Run the built image by running `docker run -p 4000:4000 [IMAGE TAG HERE]` in the root level of FuelEfficient
3. Navigate to `localhost:4000` to view FuelEfficient in your browser!

### Deployment
1. If you're going to deploy FuelEfficient on your own, make sure to push the built Docker image onto Docker Hub (follow step 1 of the Production section beforehand)
2. Put the username/image details in the `./Deployment/Dockerrun.aws.json` file
3. Upload the `./Deployment/Dockerrun.aws.json` file to Elastic Beanstalk and deploy FuelEfficient to AWS

## Packages Used
### Backend
- ExpressJS - used for setting REST API routes
- MySQL2 - used for DB queries
- Morgan - used for monitoring API queries

### Frontend
- ReactJS - used for state management and component orchestration
- MaterialUI - used for creating/styling basic components and site layout
- Axios - used for querying the backend API
- React-scroll-to-component - used for scrolling to data cards on mobile layouts

### DB Updater
- Pandas - used for creating data frames from the Fuel Economy Dataset
- Mysql-connector - used for connecting and querying the DB
