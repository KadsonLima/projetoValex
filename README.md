
## Install

    npm install

## Run the app

    npm start or npm run dev

# Valex API 

## Get list of Things

### Create a card

```http
POST /card/${employeeId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `employeeId` | `string` | **Required**.         |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body   | Type       | Description             |
| :----- | :--------- | :---------------------- |
| `typeCard` | `string` | **Required**.    type |

`Valid types: [groceries, restaurant, transport, education, health]`

</br>

#### Response:

```json
{	
	"cardholderName": "NAME N NAME",
	"cvc": "111"
	"number": "1111 1111 1111 1111",
	"expirationDate": "01/27"
}
```

