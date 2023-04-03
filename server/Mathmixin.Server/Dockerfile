# Base

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base

# Build

FROM base AS build

WORKDIR /app

COPY . .
RUN dotnet restore "Mathmixin.Server.csproj"
RUN dotnet build "Mathmixin.Server.csproj" -c Release -o /app/build

# Publish

FROM build AS publish

RUN dotnet publish "Mathmixin.Server.csproj" -c Release -o /app/publish

# Run

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5001
ENV ASPNETCORE_URLS=http://+:5001

ENTRYPOINT ["dotnet", "Mathmixin.Server.dll"]
