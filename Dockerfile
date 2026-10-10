FROM alpine:latest

WORKDIR /app

# Pobierz PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.25/pocketbase_linux_amd64.zip && \
    unzip pocketbase_linux_amd64.zip && \
    rm pocketbase_linux_amd64.zip && \
    chmod +x pocketbase

# Utwórz katalog na dane
RUN mkdir -p pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]