# Database Configuration Guide

## Setting up SQL Server with Docker

Our project uses Microsoft SQL Server 2022 running in Docker. Follow these steps to set up the database environment:

### Prerequisites

- Docker and Docker Compose installed on your system
- Make sure port 7071 is available (used for SQL Server)

### Database Setup Steps

1. **Start the database container:**

```bash
docker-compose up
```
OR
```bash
docker-compose up db
```

2. **Verify the container is running:**

```bash
docker ps
```

You should see a container named `item_rental_database`.

3. **Database connection details:**

- Server: `localhost`
- Port: `7071`
- Database name: `rentaldb`
- Username: `SA`
- Password: `StrongRoot1` (use the password configured in docker-compose.yml)

### Troubleshooting Common Issues

If you encounter errors starting the database container:

#### Permission Issues with start.sh

```bash
chmod 777 start.sh
```

#### SQL Server Connection Problems

- Ensure the SQL Server container has fully initialized (this can take up to a minute)
- Verify your password meets SQL Server complexity requirements (must include uppercase, lowercase, numbers, and special characters)
- Check that port 7071 is not being used by another application

#### Container Crashes or Exits

Reset the container and volume:

```bash
docker-compose down
docker volume prune  # Only if you want to delete all unused volumes
docker-compose up
```

### Accessing the Database

You can connect to the database using:

1. **SQL Server Management Studio (SSMS)** - Connect to `localhost,7071` with the SA credentials
2. **Azure Data Studio** - Connect using the same details
3. **From your application** - Use the connection string in your application properties:
   spring.datasource.url=jdbc:sqlserver://localhost:7071;databaseName=rentaldb;encrypt=true;trustServerCertificate=true spring.datasource.username=sa spring.datasource.password=StrongRoot1


### Database Schema and Initial Data

The database will be automatically initialized with the name `rentaldb`. Any additional schema setup and data seeding is handled by your application's JPA configurations.