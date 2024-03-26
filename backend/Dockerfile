FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install pipenv
RUN pip install pipenv

# Install the dependencies
RUN pipenv install --deploy --ignore-pipfile

# Set the environment variable
ENV DJANGO_ENV "production"

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the application
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]