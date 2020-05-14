import dload
import os
import pandas as pd

print("Downloading EPA vehicles dataset")
dload.save_unzip("http://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip", "./")
print("Finished downloading dataset")

cars = pd.read_csv("vehicles.csv", low_memory=False)
cars = cars[['year', 'make', 'model', 'trany', 'comb08']]

# print(cars[50])
# print(cars.head())

for key, value in cars.iteritems(): 
    print(key, value) 
    print() 

os.remove("vehicles.csv")