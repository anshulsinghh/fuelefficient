import mysql.connector

# Creates a database connection with the provided parameters, and returns it
#
# @return the new database connection


def connect_db():
    return mysql.connector.connect(
        host="test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com",
        user="root",
        passwd="***REMOVED***",
        database="fuelefficient-data"
    )
