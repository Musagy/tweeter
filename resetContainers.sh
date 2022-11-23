docker compose down

docker rmi tweeter-server
docker rmi tweeter-client

docker compose -f docker-compose.prod.yml up

docker compose build