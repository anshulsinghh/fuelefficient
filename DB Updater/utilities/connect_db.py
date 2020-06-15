import mysql.connector

# Creates a database connection with the provided parameters, and returns it
#
# @return the new database connection


def connect_db():
    return mysql.connector.connect(
        host="",
        user="",
        passwd="",
        database=""
    )
