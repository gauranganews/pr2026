#!/bin/bash

# Example cURL request to get astrology forecast

curl -X POST http://localhost:3000/api/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthPlace": "Москва"
  }' | jq
