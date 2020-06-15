# Uploads a provided dataframe to a given database, given the database's cursor
#
# @params df: the dataframe being read
# @params db: the database being written to
# @params cursor: the cursor in the database, used to write values to the database

def upload_dataframe(df, db, cursor):
    # Get each car and id from the dataframe
    for id, car in df.iterrows():
        if car.fuelType != "Electricity":
            # Get the year, make, model, variation, and mpg of the car
            year = str(car.year)
            make = str(car.make)
            model = str(car.model)
            variation = str(car.trany)
            mpg = str(car.comb08)

            # Create the car's unique identifier
            identifier = year + make + model + variation + mpg

            # Values to insert into the database
            vals = (year, make, model, variation, mpg, identifier)
            sql = f'REPLACE INTO vehicles (year, make, model, variation, mpg, identifier) VALUES({year}, "{make}", "{model}", "{variation}", {mpg}, "{identifier}")'

            # Execute the SQL query and commit changes to the database
            cursor.execute(sql)
            db.commit()

            print("Inserted: ", vals)
