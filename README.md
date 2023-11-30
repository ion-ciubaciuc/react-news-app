# Your App Name

Welcome to [Your App Name]! This repository contains a Dockerized setup for running the [Your App Name] app.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker: [Get Docker](https://docs.docker.com/get-docker/)

## Getting Started

Follow these steps to get the app up and running:

1. Clone this repository:

    ```bash
    git clone git@github.com:ion-ciubaciuc/react-news-app.git
    cd react-news-app
    ```

2. Build and start the Docker containers:

    ```bash
    docker-compose up -d --build
    ```

   This command will build the Docker image for the app and start the containers in the background.

3. Access the app in your browser:

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Stopping the App

To stop the app and remove the Docker containers, run:

```bash
docker-compose down
