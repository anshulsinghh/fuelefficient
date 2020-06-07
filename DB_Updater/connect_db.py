import mysql.connector


def connect_db():
    return mysql.connector.connect(
        host="test-db-2.crpalwy0pful.us-west-1.rds.amazonaws.com",
        user="root",
        passwd="***REMOVED***",
        database="fuelefficient-data"
    )
