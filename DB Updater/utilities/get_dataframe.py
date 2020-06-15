from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen
import pandas as pd

# Downloads the fuel economy dataset, and creates a pandas dataframe with the
# data and returns it
#
# @return the newly assembled dataframe


def get_dataframe():
    # Download the dataset
    resp = urlopen("http://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip")
    zipfile = ZipFile(BytesIO(resp.read()))

    # Open the dataset with pandas, pthen arse the appropriate columns
    cars = pd.read_csv(zipfile.open('vehicles.csv'), low_memory=False)
    cars = cars[['year', 'make', 'model', 'trany', 'comb08', 'fuelType']]

    # Convert the cars dataset into a dataframe and return it
    df = pd.DataFrame(cars)
    return df
