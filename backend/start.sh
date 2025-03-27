#!/bin/bash
# Launch MSSQL and send to background
/opt/mssql/bin/sqlservr &
echo "Checking Database Engine is running..."
for i in {1..60};
do
    RESULT=`/opt/mssql-tools18/bin/sqlcmd -S tcp:localhost,1433 -U sa -P ${SA_PASSWORD} -C -Q "IF DB_ID('master') IS NOT NULL print 'YES'"`
    CODE=$?
    if [[ $RESULT == "YES" ]]
    then
        RESULT2=`/opt/mssql-tools18/bin/sqlcmd -S tcp:localhost,1433 -U sa -P ${SA_PASSWORD} -C -Q "IF DB_ID('${DB_NAME}') IS NOT NULL print 'YES'"`
        if [[ $RESULT2 == "YES" ]]
        then
            echo "Database ${DB_NAME} is already created."
            break
        else
            echo "Creating database: ${DB_NAME}"
            /opt/mssql-tools18/bin/sqlcmd -S tcp:localhost,1433 -U sa -P ${SA_PASSWORD} -C -Q "CREATE DATABASE ${DB_NAME}"
            break
        fi
    elif [[ $CODE -ne 0 ]] && [[ $RESULT == "" ]]
    then
        echo "Database not ready yet..."
        sleep 1
    fi
done
sleep infinity