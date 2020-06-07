from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen
import pandas as pd
from connect_db import connect_db

# Create the database connection with MySQL
db = connect_db()

# Cursor for inserting new vehicles
cursor = db.cursor()

resp = urlopen("http://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip")
zipfile = ZipFile(BytesIO(resp.read()))

cars = pd.read_csv(zipfile.open('vehicles.csv'), low_memory=False)
cars = cars[['year', 'make', 'model', 'trany', 'comb08', 'fuelType']]
df = pd.DataFrame(cars)

for id, car in df.iterrows():
    if car.fuelType != "Electricity":
        year = str(car.year)
        make = str(car.make)
        model = str(car.model)
        variation = str(car.trany)
        mpg = str(car.comb08)
        identifier = year + make + model + variation + mpg

        vals = (year, make, model, variation, mpg, identifier)

        sql = f'REPLACE INTO vehicles_copy (year, make, model, variation, mpg, identifier) VALUES({year}, "{make}", "{model}", "{variation}", {mpg}, "{identifier}")'
        cursor.execute(sql)
        db.commit()

        print("Inserted: ", vals)


print(cursor.rowcount, " rows inserted.")
