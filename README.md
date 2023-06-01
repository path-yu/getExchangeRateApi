# API Documentation
## Overview
The API endpoint https://salty-stoat-76.deno.dev accepts a query parameter start and returns the exchange rate of the target currency to Chinese Yuan (CNY).

## Request
The API accepts a GET request with the following query parameter:

* start: The target currency code (e.g. USD, EUR, GBP). The default is USD
Example request:

```shell
GET https://salty-stoat-76.deno.dev?start=USD
```
## Response
The API returns a plain text response with the exchange rate of the target currency to CNY.
Example response:
```json
{
  "target_currency": "USD",
  "exchange_rate": 6.3859
}
```

## Errors
If the start parameter is not provided, the API will return a HTTP 400 Bad Request error with the message "Missing start parameter".

If the start parameter is invalid or the exchange rate cannot be retrieved for some reason, the API will return a HTTP 500 Internal Server Error with the message "Error retrieving exchange rate".
