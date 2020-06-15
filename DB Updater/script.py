from utilities.connect_db import connect_db
from utilities.get_dataframe import get_dataframe
from utilities.upload_dataframe import upload_dataframe

# The following script uploads the EPA's fuel economy dataset into the vehicles
# table of a MySQL database

# Create the database connection with MySQL
print("Connecting to MySQL Database")
db = connect_db()

# Cursor for inserting new vehicles
print("Creating cursor for MySQL uploads")
cursor = db.cursor()

# Downloads the Fuel Economy dataset, formats it, and stores it in a pandas dataframe
print("Downloading and parsing Fuel Economy dataset.")
df = get_dataframe()

# Uploads the dataset to the MySQL database
print("Uploading EPA dataset to MySQL database")
upload_dataframe(df, db, cursor)

# Close the DB connection
print("Closing database connection")
db.close()

print("Finished uploading EPA Fuel Economy dataset to MySQL")
