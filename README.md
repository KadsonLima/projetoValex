
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

### Active a card

```http
PUT /card/
```

#### Request:

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `CVC`            | `string`   | **Required**.    CVC            |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |
| `password`       | `string`   | **Required**.    password       |

</br>

#### Response:

```json
{	
	"OK"
}
```

### getBalance a card

```http
GET /card/
```

#### Request:

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |

</br>

#### Response:

```json
{	
	{
  "balance": number,
  "transactions": [
    {},{}
  ],
  "recharges": [
    {},{}
  ]
}
```

### Block a card

```http
PUT /blockCard/
```

#### Request:

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |
| `password`       | `string`   | **Required**.    password       |

</br>

#### Response:

```json
{	
	
}
```

### Unblock a card

```http
PUT /unblockCard/
```

#### Request:

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |
| `password`       | `string`   | **Required**.    password       |

</br>

#### Response:

```json
{	
	
}
```

### Recharge a card

```http
POST /recharge/
```

#### Request:

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |
| `password`       | `string`   | **Required**.    password       |
| `amount`         | `integer`  | **Required**.    amount         |

</br>

#### Response:

```json
{	
	
}
```


### Payment with a card

```http
POST /payment/${businessId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `businessId` | `string` | **Required**.         |

####

| Body   	       | Type       | Description                     |
|:-----------------|:-----------|:--------------------------------|
| `cardHolderName` | `string`   | **Required**.    type           |
| `cardNumber`     | `string`   | **Required**.    Number 		  |
| `expirationDate` | `string`   | **Required**.    expirationDate |
| `amount`         | `integer`  | **Required**.    amount         |

</br>

#### Response:

```json
{	
	
}
```
