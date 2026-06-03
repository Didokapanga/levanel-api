---
title: Levannel API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="levannel-api">Levannel API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API REST de gestion d’agence de voyage développée avec Node.js, Express, TypeScript et PostgreSQL.

Base URLs:

* <a href="http://localhost:5000">http://localhost:5000</a>

* <a href="https://levanel-api.onrender.com">https://levanel-api.onrender.com</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="levannel-api-users">Users</h1>

Gestion des utilisateurs

## post__api_users

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/users HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "username": "john",
  "full_name": "John Doe",
  "email": "john@test.com",
  "password": 123456,
  "role": "admin"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/users`

*Créer un utilisateur*

Création d'un nouvel utilisateur.

> Body parameter

```json
{
  "username": "john",
  "full_name": "John Doe",
  "email": "john@test.com",
  "password": 123456,
  "role": "admin"
}
```

<h3 id="post__api_users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» username|body|string|true|none|
|» full_name|body|string|true|none|
|» email|body|string(email)|true|none|
|» password|body|string|true|none|
|» role|body|string|true|none|

<h3 id="post__api_users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Utilisateur créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_users

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/users \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/users HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/users`

*Liste des utilisateurs*

Retourne tous les utilisateurs enregistrés.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "username": "dido",
      "full_name": "Dido Kapanga",
      "email": "kapangadido@gmail.com",
      "role": "admin",
      "is_active": true
    }
  ]
}
```

<h3 id="get__api_users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_users-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» username|string|false|none|none|
|»» full_name|string|false|none|none|
|»» email|string|false|none|none|
|»» role|string|false|none|none|
|»» is_active|boolean|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_users_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/users/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/users/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "username": "john",
  "full_name": "John Doe",
  "email": "john@test.com",
  "password": "NewPassword123",
  "role": "manager",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/users/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/users/{id}`

*Modifier un utilisateur*

Met à jour les informations d'un utilisateur.

> Body parameter

```json
{
  "username": "john",
  "full_name": "John Doe",
  "email": "john@test.com",
  "password": "NewPassword123",
  "role": "manager",
  "is_active": true
}
```

<h3 id="put__api_users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant utilisateur|
|body|body|object|true|none|
|» username|body|string|false|none|
|» full_name|body|string|false|none|
|» email|body|string(email)|false|none|
|» password|body|string|false|none|
|» role|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Utilisateur modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Utilisateur introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_users_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/users/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/users/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/users/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/users/{id}`

*Supprimer un utilisateur*

Supprime un utilisateur existant.

<h3 id="delete__api_users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant utilisateur|

<h3 id="delete__api_users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Utilisateur supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Utilisateur introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-ticket-adjustments">Ticket Adjustments</h1>

Gestion des modifications, remboursements et ajustements de billets

## post__api_ticket-adjustments

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/ticket-adjustments \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/ticket-adjustments HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "item_id": "UUID",
  "adjustment_type": "modification",
  "airline_fee": 100,
  "agency_fee": 30,
  "refund_amount": 0,
  "new_debit_balance": 900,
  "notes": "Modification date de voyage"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/ticket-adjustments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/ticket-adjustments',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/ticket-adjustments', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/ticket-adjustments', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/ticket-adjustments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/ticket-adjustments", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/ticket-adjustments`

*Créer un ajustement de billet*

Crée un ajustement lié à un billet existant (modification, remboursement ou autre ajustement).

> Body parameter

```json
{
  "item_id": "UUID",
  "adjustment_type": "modification",
  "airline_fee": 100,
  "agency_fee": 30,
  "refund_amount": 0,
  "new_debit_balance": 900,
  "notes": "Modification date de voyage"
}
```

<h3 id="post__api_ticket-adjustments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» item_id|body|string(uuid)|true|none|
|» adjustment_type|body|string|true|none|
|» airline_fee|body|number|false|none|
|» agency_fee|body|number|false|none|
|» refund_amount|body|number|false|none|
|» new_debit_balance|body|number|false|none|
|» notes|body|string|false|none|

<h3 id="post__api_ticket-adjustments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Ajustement créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et agents|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_ticket-adjustments

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/ticket-adjustments \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/ticket-adjustments HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/ticket-adjustments',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/ticket-adjustments',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/ticket-adjustments', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/ticket-adjustments', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/ticket-adjustments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/ticket-adjustments", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/ticket-adjustments`

*Liste des ajustements*

Retourne la liste paginée des ajustements de billets.

<h3 id="get__api_ticket-adjustments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|adjustment_type|query|string|false|Filtrer par type d'ajustement|
|search|query|string|false|Recherche par numéro de billet, client, PNR ou référence d'ajustement|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Adjustments retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "item_id": "4d8cd62e-a579-4dae-af8c-3172f96f8f7c",
        "adjustment_reference": "ADJ-20260521-001",
        "adjustment_type": "modification",
        "ticket_number": "ET1234567890",
        "customer_name": "John Doe",
        "pnr": "ABC123",
        "airline_fee": 100,
        "agency_fee": 30,
        "refund_amount": 0,
        "new_debit_balance": 900,
        "notes": "Modification date de voyage",
        "created_at": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 0,
    "page": 1,
    "limit": 10,
    "total_pages": 0
  }
}
```

<h3 id="get__api_ticket-adjustments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_ticket-adjustments-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» item_id|string(uuid)|false|none|none|
|»»» adjustment_reference|string|false|none|none|
|»»» adjustment_type|string|false|none|none|
|»»» ticket_number|string|false|none|none|
|»»» customer_name|string|false|none|none|
|»»» pnr|string|false|none|none|
|»»» airline_fee|number|false|none|none|
|»»» agency_fee|number|false|none|none|
|»»» refund_amount|number|false|none|none|
|»»» new_debit_balance|number|false|none|none|
|»»» notes|string|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_ticket-adjustments_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/ticket-adjustments/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/ticket-adjustments/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "airline_fee": 150,
  "agency_fee": 50,
  "refund_amount": 0,
  "new_debit_balance": 850,
  "notes": "Ajustement après modification du billet"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/ticket-adjustments/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/ticket-adjustments/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/ticket-adjustments/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/ticket-adjustments/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/ticket-adjustments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/ticket-adjustments/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/ticket-adjustments/{id}`

*Modifier un ajustement*

Met à jour les frais et informations d'un ajustement existant.

> Body parameter

```json
{
  "airline_fee": 150,
  "agency_fee": 50,
  "refund_amount": 0,
  "new_debit_balance": 850,
  "notes": "Ajustement après modification du billet"
}
```

<h3 id="put__api_ticket-adjustments_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de l'ajustement|
|body|body|object|true|none|
|» airline_fee|body|number|false|none|
|» agency_fee|body|number|false|none|
|» refund_amount|body|number|false|none|
|» new_debit_balance|body|number|false|none|
|» notes|body|string|false|none|

<h3 id="put__api_ticket-adjustments_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ajustement modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Ajustement introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_ticket-adjustments_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/ticket-adjustments/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/ticket-adjustments/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/ticket-adjustments/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/ticket-adjustments/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/ticket-adjustments/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/ticket-adjustments/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/ticket-adjustments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/ticket-adjustments/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/ticket-adjustments/{id}`

*Supprimer un ajustement*

Effectue une suppression logique d'un ajustement.

<h3 id="delete__api_ticket-adjustments_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de l'ajustement|

<h3 id="delete__api_ticket-adjustments_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ajustement supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Ajustement introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-systems">Systems</h1>

Gestion des systèmes de réservation et plateformes partenaires

## post__api_systems

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/systems \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/systems HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Amadeus",
  "initial": "AMA",
  "description": "Global Distribution System"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/systems',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/systems',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/systems', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/systems', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/systems");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/systems", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/systems`

*Créer un système*

Crée un nouveau système de réservation ou plateforme partenaire.

> Body parameter

```json
{
  "name": "Amadeus",
  "initial": "AMA",
  "description": "Global Distribution System"
}
```

<h3 id="post__api_systems-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» initial|body|string|true|Code unique du système|
|» description|body|string|false|none|

<h3 id="post__api_systems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Système créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Initial déjà existant ou données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et agents|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_systems

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/systems \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/systems HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/systems',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/systems',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/systems', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/systems', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/systems");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/systems", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/systems`

*Liste des systèmes*

Retourne tous les systèmes enregistrés.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Systems retrieved successfully",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "Amadeus",
      "initial": "AMA",
      "description": "Global Distribution System",
      "is_active": true,
      "created_at": "2026-05-20T13:04:58.623Z",
      "updated_at": "2026-05-20T13:04:58.623Z"
    }
  ]
}
```

<h3 id="get__api_systems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_systems-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» initial|string|false|none|none|
|»» description|string|false|none|none|
|»» is_active|boolean|false|none|none|
|»» created_at|string(date-time)|false|none|none|
|»» updated_at|string(date-time)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_systems_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/systems/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/systems/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Amadeus",
  "initial": "AMA",
  "description": "Global Distribution System",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/systems/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/systems/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/systems/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/systems/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/systems/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/systems/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/systems/{id}`

*Modifier un système*

Met à jour les informations d'un système.

> Body parameter

```json
{
  "name": "Amadeus",
  "initial": "AMA",
  "description": "Global Distribution System",
  "is_active": true
}
```

<h3 id="put__api_systems_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du système|
|body|body|object|true|none|
|» name|body|string|false|none|
|» initial|body|string|false|none|
|» description|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_systems_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Système modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et agents|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Système introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_systems_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/systems/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/systems/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/systems/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/systems/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/systems/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/systems/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/systems/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/systems/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/systems/{id}`

*Supprimer un système*

Effectue une suppression logique d'un système.

<h3 id="delete__api_systems_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du système|

<h3 id="delete__api_systems_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Système supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Système introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-stocks">Stocks</h1>

Gestion des stocks de billets associés aux contrats partenaires

## post__api_stocks

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/stocks \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/stocks HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "contract_id": "CONTRACT_UUID",
  "amount_initial": 10000,
  "currency": "USD",
  "purchased_at": "2026-05-21",
  "notes": "Stock principal émission billets"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/stocks',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/stocks',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/stocks', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/stocks', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/stocks");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/stocks", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/stocks`

*Créer un stock*

Crée un nouveau stock associé à un contrat de type stock_only ou caution_stock.

> Body parameter

```json
{
  "contract_id": "CONTRACT_UUID",
  "amount_initial": 10000,
  "currency": "USD",
  "purchased_at": "2026-05-21",
  "notes": "Stock principal émission billets"
}
```

<h3 id="post__api_stocks-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» contract_id|body|string(uuid)|true|none|
|» amount_initial|body|number|true|none|
|» currency|body|string|true|none|
|» purchased_at|body|string(date)|false|none|
|» notes|body|string|false|none|

<h3 id="post__api_stocks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Stock créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Contrat invalide ou données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Contrat introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_stocks

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/stocks \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/stocks HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/stocks',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/stocks',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/stocks', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/stocks', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/stocks");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/stocks", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/stocks`

*Liste des stocks*

Retourne la liste paginée des stocks avec filtres de recherche.

<h3 id="get__api_stocks-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|search|query|string|false|Recherche sur les stocks|
|contract_type|query|string|false|Filtrer par type de contrat|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Stocks retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "contract_id": "9aafc1a8-e497-46c9-ba0b-bd5b03c353e4",
        "partner_name": "Congo Airways",
        "contract_type": "caution_stock",
        "amount_initial": "10000.00",
        "amount_remaining": "10000.00",
        "currency": "USD",
        "purchased_at": "2026-05-20T23:00:00.000Z",
        "notes": "Stock principal émission billets",
        "is_active": true,
        "created_at": "2026-05-21T15:09:23.566Z",
        "updated_at": "2026-05-21T15:09:23.566Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_stocks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_stocks-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» contract_id|string(uuid)|false|none|none|
|»»» partner_name|string|false|none|none|
|»»» contract_type|string|false|none|none|
|»»» amount_initial|string|false|none|none|
|»»» amount_remaining|string|false|none|none|
|»»» currency|string|false|none|none|
|»»» purchased_at|string(date-time)|false|none|none|
|»»» notes|string|false|none|none|
|»»» is_active|boolean|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»»» updated_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_stocks_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/stocks/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/stocks/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "amount_remaining": 8500,
  "notes": "Ajustement après émission",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/stocks/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/stocks/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/stocks/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/stocks/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/stocks/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/stocks/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/stocks/{id}`

*Modifier un stock*

Met à jour un stock. Un stock dont le montant restant atteint zéro est automatiquement désactivé.

> Body parameter

```json
{
  "amount_remaining": 8500,
  "notes": "Ajustement après émission",
  "is_active": true
}
```

<h3 id="put__api_stocks_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du stock|
|body|body|object|true|none|
|» amount_remaining|body|number|false|none|
|» notes|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_stocks_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Stock modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Stock introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_stocks_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/stocks/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/stocks/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/stocks/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/stocks/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/stocks/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/stocks/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/stocks/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/stocks/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/stocks/{id}`

*Supprimer un stock*

Effectue une suppression logique d'un stock.

<h3 id="delete__api_stocks_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du stock|

<h3 id="delete__api_stocks_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Stock supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Stock introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-services">Services</h1>

Gestion des services proposés par l'agence

## post__api_services

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/services \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/services HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Billetterie",
  "description": "Gestion des billets",
  "color": "#2563EB",
  "icon": "plane"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/services',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/services',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/services', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/services', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/services");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/services", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/services`

*Créer un service*

Crée un nouveau service métier. Une référence interne est automatiquement générée.

> Body parameter

```json
{
  "name": "Billetterie",
  "description": "Gestion des billets",
  "color": "#2563EB",
  "icon": "plane"
}
```

<h3 id="post__api_services-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» description|body|string|false|none|
|» color|body|string|false|none|
|» icon|body|string|false|none|

<h3 id="post__api_services-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Service créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et agents|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_services

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/services \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/services HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/services',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/services',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/services', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/services', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/services");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/services", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/services`

*Liste des services*

Retourne tous les services disponibles.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "Billetterie",
      "initial": "BIL",
      "description": "Gestion des billets",
      "color": "#2563EB",
      "icon": "plane",
      "is_active": true,
      "created_at": "2026-05-20T12:50:38.156Z",
      "updated_at": "2026-05-20T12:50:38.156Z"
    }
  ]
}
```

<h3 id="get__api_services-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_services-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» initial|string|false|none|none|
|»» description|string|false|none|none|
|»» color|string|false|none|none|
|»» icon|string|false|none|none|
|»» is_active|boolean|false|none|none|
|»» created_at|string(date-time)|false|none|none|
|»» updated_at|string(date-time)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_services_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/services/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/services/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Billetterie",
  "description": "Gestion des billets internationaux",
  "color": "#2563EB",
  "icon": "plane",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/services/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/services/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/services/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/services/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/services/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/services/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/services/{id}`

*Modifier un service*

Met à jour les informations d'un service.

> Body parameter

```json
{
  "name": "Billetterie",
  "description": "Gestion des billets internationaux",
  "color": "#2563EB",
  "icon": "plane",
  "is_active": true
}
```

<h3 id="put__api_services_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du service|
|body|body|object|true|none|
|» name|body|string|false|none|
|» description|body|string|false|none|
|» color|body|string|false|none|
|» icon|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_services_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Service modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et agents|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_services_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/services/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/services/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/services/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/services/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/services/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/services/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/services/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/services/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/services/{id}`

*Supprimer un service*

Effectue une suppression logique d'un service.

<h3 id="delete__api_services_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Identifiant du service|

<h3 id="delete__api_services_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Service supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service introuvable|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-service-requests">Service Requests</h1>

Gestion des demandes de services clients

## post__api_service-requests

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/service-requests \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/service-requests HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "client_id": "CLIENT_UUID",
  "service_id": "SERVICE_UUID",
  "partner_id": "PARTNER_UUID",
  "contract_id": "CONTRACT_UUID",
  "request_type": "ticketing",
  "currency": "USD",
  "observation": "Mission Bruxelles juin 2026"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-requests',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/service-requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/service-requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/service-requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/service-requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/service-requests`

*Créer une demande de service*

Crée une nouvelle demande de service associée à un client, un service et éventuellement un partenaire.

> Body parameter

```json
{
  "client_id": "CLIENT_UUID",
  "service_id": "SERVICE_UUID",
  "partner_id": "PARTNER_UUID",
  "contract_id": "CONTRACT_UUID",
  "request_type": "ticketing",
  "currency": "USD",
  "observation": "Mission Bruxelles juin 2026"
}
```

<h3 id="post__api_service-requests-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» client_id|body|string(uuid)|true|none|
|» service_id|body|string(uuid)|true|none|
|» partner_id|body|string(uuid)|false|none|
|» contract_id|body|string(uuid)|false|none|
|» request_type|body|string|true|none|
|» currency|body|string|true|none|
|» observation|body|string|false|none|

<h3 id="post__api_service-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Demande créée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_service-requests

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/service-requests \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/service-requests HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-requests',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/service-requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/service-requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/service-requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/service-requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/service-requests`

*Liste des demandes de services*

Retourne la liste paginée des demandes de services.

<h3 id="get__api_service-requests-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|search|query|string|false|Recherche par référence, client ou observation|
|status|query|string|false|Filtrer par statut|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Requests retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "request_reference": "SR-1779449061291-1711",
        "client_id": "5b3fa7ba-57d3-4017-a65b-d57dcd2db643",
        "client_name": "Equity BCDC",
        "service_id": "641e839f-864e-4cce-98f9-40f6cbb3e9e0",
        "service_name": "Billetterie",
        "partner_id": "6a3a39f6-861b-4a48-b868-5de838400e06",
        "partner_name": "Congo Airways",
        "contract_id": "9aafc1a8-e497-46c9-ba0b-bd5b03c353e4",
        "request_type": "ticketing",
        "status": "pending",
        "total_amount": "1900.00",
        "amount_paid": "500.00",
        "remaining_amount": 1400,
        "service_revenue": "51.40",
        "external_cost": "1848.60",
        "currency": "USD",
        "observation": "Mission Bruxelles juin 2026",
        "requested_at": "2026-05-22T11:24:21.331Z",
        "completed_at": null,
        "created_at": "2019-08-24T14:15:22Z",
        "updated_at": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_service-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_service-requests-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» request_reference|string|false|none|none|
|»»» client_id|string(uuid)|false|none|none|
|»»» client_name|string|false|none|none|
|»»» service_id|string(uuid)|false|none|none|
|»»» service_name|string|false|none|none|
|»»» partner_id|string(uuid)|false|none|none|
|»»» partner_name|string|false|none|none|
|»»» contract_id|string(uuid)|false|none|none|
|»»» request_type|string|false|none|none|
|»»» status|string|false|none|none|
|»»» total_amount|string|false|none|none|
|»»» amount_paid|string|false|none|none|
|»»» remaining_amount|number|false|none|none|
|»»» service_revenue|string|false|none|none|
|»»» external_cost|string|false|none|none|
|»»» currency|string|false|none|none|
|»»» observation|string|false|none|none|
|»»» requested_at|string(date-time)|false|none|none|
|»»» completed_at|string¦null|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»»» updated_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_service-requests_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/service-requests/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/service-requests/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "status": "completed",
  "observation": "Voyage confirmé et billet émis",
  "completed_at": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-requests/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/service-requests/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/service-requests/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/service-requests/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-requests/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/service-requests/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/service-requests/{id}`

*Modifier une demande de service*

Met à jour une demande de service existante.

> Body parameter

```json
{
  "status": "completed",
  "observation": "Voyage confirmé et billet émis",
  "completed_at": "2019-08-24T14:15:22Z"
}
```

<h3 id="put__api_service-requests_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de la demande|
|body|body|object|true|none|
|» status|body|string|false|none|
|» observation|body|string|false|none|
|» completed_at|body|string(date-time)|false|none|

<h3 id="put__api_service-requests_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Demande modifiée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Demande introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_service-requests_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/service-requests/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/service-requests/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-requests/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/service-requests/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/service-requests/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/service-requests/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-requests/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/service-requests/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/service-requests/{id}`

*Supprimer une demande de service*

Effectue une suppression logique d'une demande de service.

<h3 id="delete__api_service-requests_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de la demande|

<h3 id="delete__api_service-requests_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Demande supprimée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Demande introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-service-request-items">Service Request Items</h1>

Gestion des éléments associés aux demandes de services (billets, réservations, prestations)

## post__api_service-request-items

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/service-request-items \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/service-request-items HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "request_id": "74fc86a4-f66f-4e8e-a047-684c23033355",
  "item_type": "ticket",
  "customer_name": "John Doe",
  "airline_id": "0cac5b29-f6e7-4a51-a60a-24172182177a",
  "system_id": "03a1b653-0a8b-4d59-b2e5-02a351d7bdb6",
  "ticket_number": 821234567890,
  "pnr": "KQ82LP",
  "route": "Kinshasa - Bruxelles",
  "travel_class": "Economy",
  "departure_date": "2026-06-15T08:00:00Z",
  "issued_at": "2026-05-22T10:00:00Z",
  "tht_amount": 800,
  "tax_amount": 150,
  "partner_service_fee": 0,
  "service_fee": 0,
  "commission_amount": 25.7,
  "notes": "Mission entreprise"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-request-items',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/service-request-items',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/service-request-items', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/service-request-items', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-request-items");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/service-request-items", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/service-request-items`

*Créer un élément de demande*

Ajoute un billet ou une prestation à une demande de service.

> Body parameter

```json
{
  "request_id": "74fc86a4-f66f-4e8e-a047-684c23033355",
  "item_type": "ticket",
  "customer_name": "John Doe",
  "airline_id": "0cac5b29-f6e7-4a51-a60a-24172182177a",
  "system_id": "03a1b653-0a8b-4d59-b2e5-02a351d7bdb6",
  "ticket_number": 821234567890,
  "pnr": "KQ82LP",
  "route": "Kinshasa - Bruxelles",
  "travel_class": "Economy",
  "departure_date": "2026-06-15T08:00:00Z",
  "issued_at": "2026-05-22T10:00:00Z",
  "tht_amount": 800,
  "tax_amount": 150,
  "partner_service_fee": 0,
  "service_fee": 0,
  "commission_amount": 25.7,
  "notes": "Mission entreprise"
}
```

<h3 id="post__api_service-request-items-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» request_id|body|string(uuid)|true|none|
|» item_type|body|string|true|none|
|» customer_name|body|string|true|none|
|» airline_id|body|string(uuid)|false|none|
|» system_id|body|string(uuid)|false|none|
|» ticket_number|body|string|false|none|
|» pnr|body|string|false|none|
|» route|body|string|false|none|
|» travel_class|body|string|false|none|
|» departure_date|body|string(date-time)|false|none|
|» issued_at|body|string(date-time)|false|none|
|» tht_amount|body|number|false|none|
|» tax_amount|body|number|false|none|
|» partner_service_fee|body|number|false|none|
|» service_fee|body|number|false|none|
|» commission_amount|body|number|false|none|
|» notes|body|string|false|none|

<h3 id="post__api_service-request-items-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Élément créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_service-request-items

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/service-request-items \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/service-request-items HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-request-items',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/service-request-items',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/service-request-items', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/service-request-items', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-request-items");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/service-request-items", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/service-request-items`

*Liste des éléments de demandes*

Retourne la liste paginée des éléments liés aux demandes de services.

<h3 id="get__api_service-request-items-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|search|query|string|false|Recherche par ticket, client, PNR ou référence|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "request_id": "266ea41d-adf5-480b-af50-15b940c2b846",
        "item_reference": "ITEM-1779454549397-3740",
        "item_type": "ticket",
        "item_status": "active",
        "customer_name": "John Doe",
        "airline_id": "b4fc44d9-e74b-49b3-a5e3-b52f2272c20a",
        "system_id": "6ed1f7c4-3772-4fa8-92a5-defb7f18dbc4",
        "ticket_number": 821234567890,
        "pnr": "KQ82LP",
        "route": "Kinshasa - Bruxelles",
        "travel_class": "Economy",
        "departure_date": "2019-08-24T14:15:22Z",
        "issued_at": "2019-08-24T14:15:22Z",
        "tht_amount": "800.00",
        "tax_amount": "150.00",
        "partner_service_fee": "0.00",
        "service_fee": "0.00",
        "cancellation_fee": "0.00",
        "modification_fee": "0.00",
        "commission_amount": "25.70",
        "ttc_amount": "950.00",
        "debit_balance": "924.30",
        "notes": "Mission entreprise",
        "created_at": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_service-request-items-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_service-request-items-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» request_id|string(uuid)|false|none|none|
|»»» item_reference|string|false|none|none|
|»»» item_type|string|false|none|none|
|»»» item_status|string|false|none|none|
|»»» customer_name|string|false|none|none|
|»»» airline_id|string(uuid)|false|none|none|
|»»» system_id|string(uuid)|false|none|none|
|»»» ticket_number|string|false|none|none|
|»»» pnr|string|false|none|none|
|»»» route|string|false|none|none|
|»»» travel_class|string|false|none|none|
|»»» departure_date|string(date-time)|false|none|none|
|»»» issued_at|string(date-time)|false|none|none|
|»»» tht_amount|string|false|none|none|
|»»» tax_amount|string|false|none|none|
|»»» partner_service_fee|string|false|none|none|
|»»» service_fee|string|false|none|none|
|»»» cancellation_fee|string|false|none|none|
|»»» modification_fee|string|false|none|none|
|»»» commission_amount|string|false|none|none|
|»»» ttc_amount|string|false|none|none|
|»»» debit_balance|string|false|none|none|
|»»» notes|string|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_service-request-items_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/service-request-items/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/service-request-items/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-request-items/{id}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/service-request-items/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/service-request-items/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/service-request-items/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-request-items/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/service-request-items/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/service-request-items/{id}`

*Modifier un élément*

Met à jour un billet ou une prestation associée à une demande.

<h3 id="put__api_service-request-items_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de l'élément|

<h3 id="put__api_service-request-items_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Élément modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Élément introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_service-request-items_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/service-request-items/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/service-request-items/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/service-request-items/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/service-request-items/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/service-request-items/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/service-request-items/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/service-request-items/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/service-request-items/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/service-request-items/{id}`

*Supprimer un élément*

Effectue une suppression logique d'un élément de demande.

<h3 id="delete__api_service-request-items_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de l'élément|

<h3 id="delete__api_service-request-items_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Élément supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Élément introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-partners">Partners</h1>

Gestion des partenaires commerciaux et compagnies partenaires

## post__api_partners

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/partners \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/partners HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Congo Airways",
  "type": "company"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/partners',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/partners',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/partners', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/partners', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/partners");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/partners", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/partners`

*Créer un partenaire*

Crée un nouveau partenaire commercial.

> Body parameter

```json
{
  "name": "Congo Airways",
  "type": "company"
}
```

<h3 id="post__api_partners-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» type|body|string|true|company ou individual|

<h3 id="post__api_partners-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Partenaire créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et agents|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_partners

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/partners \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/partners HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/partners',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/partners',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/partners', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/partners', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/partners");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/partners", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/partners`

*Liste des partenaires*

Retourne la liste de tous les partenaires actifs.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Partners retrieved successfully",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "Congo Airways",
      "type": "company",
      "is_active": true,
      "created_at": "2026-05-20T13:45:05.096Z",
      "updated_at": "2026-05-20T13:45:05.096Z"
    }
  ]
}
```

<h3 id="get__api_partners-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_partners-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» name|string|false|none|none|
|»» type|string|false|none|none|
|»» is_active|boolean|false|none|none|
|»» created_at|string(date-time)|false|none|none|
|»» updated_at|string(date-time)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_partners_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/partners/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/partners/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Congo Airways",
  "type": "company",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/partners/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/partners/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/partners/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/partners/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/partners/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/partners/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/partners/{id}`

*Modifier un partenaire*

Met à jour les informations d'un partenaire.

> Body parameter

```json
{
  "name": "Congo Airways",
  "type": "company",
  "is_active": true
}
```

<h3 id="put__api_partners_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du partenaire|
|body|body|object|true|none|
|» name|body|string|false|none|
|» type|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_partners_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Partenaire modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et agents|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Partenaire introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_partners_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/partners/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/partners/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/partners/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/partners/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/partners/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/partners/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/partners/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/partners/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/partners/{id}`

*Supprimer un partenaire*

Effectue une suppression logique d'un partenaire.

<h3 id="delete__api_partners_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du partenaire|

<h3 id="delete__api_partners_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Partenaire supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Partenaire introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-financial-ledger">Financial Ledger</h1>

Consultation des écritures comptables et mouvements financiers

## get__api_financial-ledger

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-ledger \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-ledger HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-ledger',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-ledger',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-ledger', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-ledger', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-ledger");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-ledger", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-ledger`

*Liste des écritures comptables*

Retourne la liste paginée des mouvements financiers enregistrés dans le grand livre.

<h3 id="get__api_financial-ledger-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|search|query|string|false|none|
|request_reference|query|string|false|none|
|entry_type|query|string|false|none|
|direction|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Financial ledger retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "request_id": "266ea41d-adf5-480b-af50-15b940c2b846",
        "item_id": "4d8cd62e-a579-4dae-af8c-3172f96f8f7c",
        "payment_id": "d43b87f9-9e28-4802-8eaa-6ee91a40ea71",
        "service_id": "641e839f-864e-4cce-98f9-40f6cbb3e9e0",
        "partner_id": "6a3a39f6-861b-4a48-b868-5de838400e06",
        "client_id": "5b3fa7ba-57d3-4017-a65b-d57dcd2db643",
        "contract_id": "9aafc1a8-e497-46c9-ba0b-bd5b03c353e4",
        "ledger_reference": "LEDGER-20260522-001",
        "request_reference": "SR-1779449061291-1711",
        "source_module": "customer_payment",
        "operation_type": "payment",
        "entry_type": "revenue",
        "direction": "income",
        "amount": "500.00",
        "currency": "USD",
        "client_name": "Equity BCDC",
        "service_name": "Billetterie",
        "partner_name": "Congo Airways",
        "description": "Paiement client enregistré",
        "created_at": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
    "total_pages": 3
  }
}
```

<h3 id="get__api_financial-ledger-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Écritures récupérées avec succès|Inline|

<h3 id="get__api_financial-ledger-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» request_id|string(uuid)|false|none|none|
|»»» item_id|string(uuid)¦null|false|none|none|
|»»» payment_id|string(uuid)¦null|false|none|none|
|»»» service_id|string(uuid)|false|none|none|
|»»» partner_id|string(uuid)|false|none|none|
|»»» client_id|string(uuid)|false|none|none|
|»»» contract_id|string(uuid)|false|none|none|
|»»» ledger_reference|string|false|none|none|
|»»» request_reference|string|false|none|none|
|»»» source_module|string|false|none|none|
|»»» operation_type|string|false|none|none|
|»»» entry_type|string|false|none|none|
|»»» direction|string|false|none|none|
|»»» amount|string|false|none|none|
|»»» currency|string|false|none|none|
|»»» client_name|string|false|none|none|
|»»» service_name|string|false|none|none|
|»»» partner_name|string|false|none|none|
|»»» description|string|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-ledger_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-ledger/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-ledger/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-ledger/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-ledger/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-ledger/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-ledger/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-ledger/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-ledger/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-ledger/{id}`

*Détail d'une écriture comptable*

Retourne les informations détaillées d'une écriture du grand livre financier.

<h3 id="get__api_financial-ledger_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de l'écriture comptable|

<h3 id="get__api_financial-ledger_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Écriture récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Écriture introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-financial-consistency">Financial Consistency</h1>

Outils d'audit et de contrôle de cohérence financière

## get__api_financial-consistency_check

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/check \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/check HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/check',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/check',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/check', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/check', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/check");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/check", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/check`

*Vérification globale*

Exécute tous les contrôles de cohérence financière et retourne les anomalies détectées.

<h3 id="get__api_financial-consistency_check-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Vérification effectuée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_overpaid-requests

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/overpaid-requests \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/overpaid-requests HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/overpaid-requests',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/overpaid-requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/overpaid-requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/overpaid-requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/overpaid-requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/overpaid-requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/overpaid-requests`

*Dossiers trop payés*

Retourne les demandes dont le montant payé dépasse le montant total dû.

<h3 id="get__api_financial-consistency_overpaid-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_negative-balances

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/negative-balances \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/negative-balances HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/negative-balances',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/negative-balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/negative-balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/negative-balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/negative-balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/negative-balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/negative-balances`

*Soldes négatifs*

Retourne les demandes présentant un solde restant négatif.

<h3 id="get__api_financial-consistency_negative-balances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_invalid-completed-requests

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/invalid-completed-requests \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/invalid-completed-requests HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/invalid-completed-requests',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/invalid-completed-requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/invalid-completed-requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/invalid-completed-requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/invalid-completed-requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/invalid-completed-requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/invalid-completed-requests`

*Dossiers terminés incohérents*

Retourne les demandes marquées comme completed alors qu'un solde reste à payer.

<h3 id="get__api_financial-consistency_invalid-completed-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_invalid-pending-requests

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/invalid-pending-requests \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/invalid-pending-requests HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/invalid-pending-requests',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/invalid-pending-requests',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/invalid-pending-requests', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/invalid-pending-requests', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/invalid-pending-requests");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/invalid-pending-requests", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/invalid-pending-requests`

*Dossiers pending incohérents*

Retourne les demandes marquées pending alors qu'aucun solde n'est dû.

<h3 id="get__api_financial-consistency_invalid-pending-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_missing-payment-ledgers

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/missing-payment-ledgers \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/missing-payment-ledgers HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/missing-payment-ledgers',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/missing-payment-ledgers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/missing-payment-ledgers', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/missing-payment-ledgers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/missing-payment-ledgers");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/missing-payment-ledgers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/missing-payment-ledgers`

*Paiements sans écriture comptable*

Retourne les paiements clients ne possédant aucune entrée dans le grand livre financier.

<h3 id="get__api_financial-consistency_missing-payment-ledgers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_negative-caution-balances

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/negative-caution-balances \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/negative-caution-balances HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/negative-caution-balances',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/negative-caution-balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/negative-caution-balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/negative-caution-balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/negative-caution-balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/negative-caution-balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/negative-caution-balances`

*Cautions négatives*

Retourne les cautions dont le montant restant est inférieur à zéro.

<h3 id="get__api_financial-consistency_negative-caution-balances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_negative-stock-balances

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/negative-stock-balances \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/negative-stock-balances HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/negative-stock-balances',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/negative-stock-balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/negative-stock-balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/negative-stock-balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/negative-stock-balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/negative-stock-balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/negative-stock-balances`

*Stocks négatifs*

Retourne les stocks dont le montant restant est inférieur à zéro.

<h3 id="get__api_financial-consistency_negative-stock-balances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_cancelled-without-adjustment

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/cancelled-without-adjustment \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/cancelled-without-adjustment HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/cancelled-without-adjustment',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/cancelled-without-adjustment',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/cancelled-without-adjustment', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/cancelled-without-adjustment', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/cancelled-without-adjustment");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/cancelled-without-adjustment", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/cancelled-without-adjustment`

*Tickets annulés sans ajustement*

Retourne les billets annulés qui ne possèdent aucun ajustement associé.

<h3 id="get__api_financial-consistency_cancelled-without-adjustment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_financial-consistency_refund-without-expense-ledger

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/financial-consistency/refund-without-expense-ledger \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/financial-consistency/refund-without-expense-ledger HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/financial-consistency/refund-without-expense-ledger',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/financial-consistency/refund-without-expense-ledger',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/financial-consistency/refund-without-expense-ledger', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/financial-consistency/refund-without-expense-ledger', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/financial-consistency/refund-without-expense-ledger");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/financial-consistency/refund-without-expense-ledger", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/financial-consistency/refund-without-expense-ledger`

*Remboursements sans écriture de dépense*

Retourne les remboursements clients qui ne possèdent aucune écriture comptable de type expense.

<h3 id="get__api_financial-consistency_refund-without-expense-ledger-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-dashboard">Dashboard</h1>

Statistiques, indicateurs financiers et tableaux de bord

## get__api_dashboard_overview

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/overview \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/overview HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/overview',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/overview',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/overview', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/overview', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/overview");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/overview", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/overview`

*Tableau de bord global*

Retourne l'ensemble des indicateurs financiers, opérationnels et commerciaux.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Dashboard retrieved successfully",
  "data": {}
}
```

<h3 id="get__api_dashboard_overview-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Dashboard récupéré avec succès|Inline|

<h3 id="get__api_dashboard_overview-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_monthly-revenue

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/monthly-revenue \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/monthly-revenue HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/monthly-revenue',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/monthly-revenue',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/monthly-revenue', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/monthly-revenue', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/monthly-revenue");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/monthly-revenue", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/monthly-revenue`

*Revenus mensuels*

Retourne les revenus regroupés par mois.

> Example responses

> 200 Response

```json
{
  "success": true,
  "data": [
    {
      "month": "2026-01",
      "income": "12000.00"
    }
  ]
}
```

<h3 id="get__api_dashboard_monthly-revenue-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Revenus récupérés avec succès|Inline|

<h3 id="get__api_dashboard_monthly-revenue-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» data|[object]|false|none|none|
|»» month|string|false|none|none|
|»» income|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_monthly-cashflow

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/monthly-cashflow \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/monthly-cashflow HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/monthly-cashflow',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/monthly-cashflow',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/monthly-cashflow', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/monthly-cashflow', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/monthly-cashflow");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/monthly-cashflow", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/monthly-cashflow`

*Cashflow mensuel*

Retourne les revenus, dépenses et cashflow net par mois.

> Example responses

> 200 Response

```json
{
  "success": true,
  "data": [
    {
      "month": "2026-01",
      "total_income": "12000.00",
      "total_expense": "4000.00",
      "net_cashflow": "8000.00"
    }
  ]
}
```

<h3 id="get__api_dashboard_monthly-cashflow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Cashflow récupéré avec succès|Inline|

<h3 id="get__api_dashboard_monthly-cashflow-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» data|[object]|false|none|none|
|»» month|string|false|none|none|
|»» total_income|string|false|none|none|
|»» total_expense|string|false|none|none|
|»» net_cashflow|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_daily-revenue-chart

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/daily-revenue-chart \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/daily-revenue-chart HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/daily-revenue-chart',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/daily-revenue-chart',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/daily-revenue-chart', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/daily-revenue-chart', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/daily-revenue-chart");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/daily-revenue-chart", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/daily-revenue-chart`

*Revenus journaliers*

Retourne les revenus journaliers pour affichage graphique.

> Example responses

> 200 Response

```json
{
  "success": true,
  "data": [
    {
      "day": "2026-05-01",
      "revenue": "900.00"
    }
  ]
}
```

<h3 id="get__api_dashboard_daily-revenue-chart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Données récupérées avec succès|Inline|

<h3 id="get__api_dashboard_daily-revenue-chart-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» data|[object]|false|none|none|
|»» day|string|false|none|none|
|»» revenue|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_airline-profits

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/airline-profits \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/airline-profits HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/airline-profits',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/airline-profits',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/airline-profits', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/airline-profits', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/airline-profits");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/airline-profits", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/airline-profits`

*Profit par compagnie*

Retourne les profits générés par compagnie aérienne.

> Example responses

> 200 Response

```json
{
  "success": true,
  "data": [
    {
      "name": "Ethiopian Airlines",
      "profit": "4500.00"
    }
  ]
}
```

<h3 id="get__api_dashboard_airline-profits-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Données récupérées avec succès|Inline|

<h3 id="get__api_dashboard_airline-profits-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» data|[object]|false|none|none|
|»» name|string|false|none|none|
|»» profit|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_cancellation-losses

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/cancellation-losses \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/cancellation-losses HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/cancellation-losses',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/cancellation-losses',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/cancellation-losses', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/cancellation-losses', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/cancellation-losses");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/cancellation-losses", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/cancellation-losses`

*Pertes liées aux annulations*

Retourne le montant total des pertes liées aux annulations.

> Example responses

> 200 Response

```json
{
  "success": true,
  "data": {
    "cancellation_losses": "1200.00"
  }
}
```

<h3 id="get__api_dashboard_cancellation-losses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Données récupérées avec succès|Inline|

<h3 id="get__api_dashboard_cancellation-losses-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» data|object|false|none|none|
|»» cancellation_losses|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_critical-alerts

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/critical-alerts \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/critical-alerts HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/critical-alerts',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/critical-alerts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/critical-alerts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/critical-alerts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/critical-alerts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/critical-alerts", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/critical-alerts`

*Alertes critiques*

Retourne les alertes nécessitant une intervention.

<h3 id="get__api_dashboard_critical-alerts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_top-airlines

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/top-airlines \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/top-airlines HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/top-airlines',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/top-airlines',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/top-airlines', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/top-airlines', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/top-airlines");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/top-airlines", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/top-airlines`

*Top compagnies aériennes*

Classement des compagnies générant le plus d'activité.

<h3 id="get__api_dashboard_top-airlines-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_top-clients

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/top-clients \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/top-clients HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/top-clients',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/top-clients',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/top-clients', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/top-clients', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/top-clients");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/top-clients", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/top-clients`

*Top clients*

Classement des clients générant le plus de chiffre d'affaires.

<h3 id="get__api_dashboard_top-clients-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_dashboard_low-balances

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/dashboard/low-balances \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/dashboard/low-balances HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/dashboard/low-balances',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/dashboard/low-balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/dashboard/low-balances', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/dashboard/low-balances', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/dashboard/low-balances");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/dashboard/low-balances", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/dashboard/low-balances`

*Contrats à faible solde*

Retourne les contrats dont la caution ou le stock approche de zéro.

<h3 id="get__api_dashboard_low-balances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-customer-payments">Customer Payments</h1>

Gestion des paiements et remboursements clients

## post__api_customer-payments

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/customer-payments \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/customer-payments HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "request_id": "REQUEST_UUID",
  "payment_method": "cash",
  "payment_type": "payment",
  "amount": 500,
  "currency": "USD",
  "observation": "Premier acompte"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/customer-payments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/customer-payments',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/customer-payments', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/customer-payments', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/customer-payments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/customer-payments", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/customer-payments`

*Enregistrer un paiement client*

Enregistre un paiement ou un remboursement associé à une demande de service.

> Body parameter

```json
{
  "request_id": "REQUEST_UUID",
  "payment_method": "cash",
  "payment_type": "payment",
  "amount": 500,
  "currency": "USD",
  "observation": "Premier acompte"
}
```

<h3 id="post__api_customer-payments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» request_id|body|string(uuid)|true|none|
|» payment_method|body|string|true|none|
|» payment_type|body|string|true|payment ou refund|
|» amount|body|number|true|none|
|» currency|body|string|true|none|
|» observation|body|string|false|none|

<h3 id="post__api_customer-payments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Paiement enregistré avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_customer-payments

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/customer-payments \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/customer-payments HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/customer-payments',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/customer-payments',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/customer-payments', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/customer-payments', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/customer-payments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/customer-payments", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/customer-payments`

*Liste des paiements clients*

Retourne la liste paginée des paiements et remboursements enregistrés.

<h3 id="get__api_customer-payments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|search|query|string|false|Recherche par référence de paiement|
|payment_type|query|string|false|payment ou refund|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Payments retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "request_id": "266ea41d-adf5-480b-af50-15b940c2b846",
        "payment_reference": "PAY-1779456533364-7560",
        "payment_method": "cash",
        "payment_type": "payment",
        "amount": "500.00",
        "currency": "USD",
        "payment_date": "2026-05-22T13:28:53.408Z",
        "observation": "Premier acompte",
        "created_at": "2026-05-22T13:28:53.408Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_customer-payments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Paiements récupérés avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_customer-payments-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» request_id|string(uuid)|false|none|none|
|»»» payment_reference|string|false|none|none|
|»»» payment_method|string|false|none|none|
|»»» payment_type|string|false|none|none|
|»»» amount|string|false|none|none|
|»»» currency|string|false|none|none|
|»»» payment_date|string(date-time)|false|none|none|
|»»» observation|string|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_customer-payments_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/customer-payments/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/customer-payments/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "payment_method": "bank_transfer",
  "amount": 750,
  "observation": "Paiement corrigé après rapprochement bancaire"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/customer-payments/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/customer-payments/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/customer-payments/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/customer-payments/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/customer-payments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/customer-payments/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/customer-payments/{id}`

*Modifier un paiement client*

Met à jour les informations d'un paiement ou remboursement.

> Body parameter

```json
{
  "payment_method": "bank_transfer",
  "amount": 750,
  "observation": "Paiement corrigé après rapprochement bancaire"
}
```

<h3 id="put__api_customer-payments_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du paiement|
|body|body|object|true|none|
|» payment_method|body|string|false|none|
|» amount|body|number|false|none|
|» observation|body|string|false|none|

<h3 id="put__api_customer-payments_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Paiement modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Paiement introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_customer-payments_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/customer-payments/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/customer-payments/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/customer-payments/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/customer-payments/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/customer-payments/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/customer-payments/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/customer-payments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/customer-payments/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/customer-payments/{id}`

*Supprimer un paiement client*

Effectue une suppression logique d'un paiement ou remboursement.

<h3 id="delete__api_customer-payments_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du paiement|

<h3 id="delete__api_customer-payments_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Paiement supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès refusé|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Paiement introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-contracts">Contracts</h1>

Gestion des contrats partenaires

## post__api_contracts

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/contracts \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/contracts HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "partner_id": "PARTNER_UUID",
  "contract_type": "caution_stock",
  "status": "active",
  "start_date": "2026-05-20",
  "end_date": "2027-05-20",
  "description": "Contrat principal billetterie"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/contracts',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/contracts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/contracts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/contracts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/contracts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/contracts", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/contracts`

*Créer un contrat*

Crée un nouveau contrat associé à un partenaire.

> Body parameter

```json
{
  "partner_id": "PARTNER_UUID",
  "contract_type": "caution_stock",
  "status": "active",
  "start_date": "2026-05-20",
  "end_date": "2027-05-20",
  "description": "Contrat principal billetterie"
}
```

<h3 id="post__api_contracts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» partner_id|body|string(uuid)|true|none|
|» contract_type|body|string|true|caution_only, stock_only ou caution_stock|
|» status|body|string|true|none|
|» start_date|body|string(date)|true|none|
|» end_date|body|string(date)|false|none|
|» description|body|string|false|none|

<h3 id="post__api_contracts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Contrat créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_contracts

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/contracts \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/contracts HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/contracts',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/contracts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/contracts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/contracts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/contracts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/contracts", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/contracts`

*Liste des contrats*

Retourne la liste paginée des contrats.

<h3 id="get__api_contracts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|search|query|string|false|Recherche sur les contrats|
|contract_type|query|string|false|Filtrer par type de contrat|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Contracts retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "partner_id": "6a3a39f6-861b-4a48-b868-5de838400e06",
        "contract_type": "caution_stock",
        "status": "active",
        "start_date": "2026-05-19T23:00:00.000Z",
        "end_date": "2027-05-19T23:00:00.000Z",
        "description": "Contrat principal billetterie",
        "is_active": true,
        "created_at": "2026-05-20T14:24:15.119Z",
        "updated_at": "2026-05-20T14:24:15.119Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_contracts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_contracts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» partner_id|string(uuid)|false|none|none|
|»»» contract_type|string|false|none|none|
|»»» status|string|false|none|none|
|»»» start_date|string(date-time)|false|none|none|
|»»» end_date|string(date-time)|false|none|none|
|»»» description|string|false|none|none|
|»»» is_active|boolean|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»»» updated_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_contracts_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/contracts/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/contracts/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "contract_type": "caution_stock",
  "status": "active",
  "start_date": "2026-05-20",
  "end_date": "2027-05-20",
  "description": "Contrat principal billetterie",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/contracts/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/contracts/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/contracts/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/contracts/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/contracts/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/contracts/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/contracts/{id}`

*Modifier un contrat*

Met à jour les informations d'un contrat.

> Body parameter

```json
{
  "contract_type": "caution_stock",
  "status": "active",
  "start_date": "2026-05-20",
  "end_date": "2027-05-20",
  "description": "Contrat principal billetterie",
  "is_active": true
}
```

<h3 id="put__api_contracts_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du contrat|
|body|body|object|true|none|
|» contract_type|body|string|false|none|
|» status|body|string|false|none|
|» start_date|body|string(date)|false|none|
|» end_date|body|string(date)|false|none|
|» description|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_contracts_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Contrat modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Contrat introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_contracts_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/contracts/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/contracts/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/contracts/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/contracts/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/contracts/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/contracts/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/contracts/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/contracts/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/contracts/{id}`

*Supprimer un contrat*

Effectue une suppression logique d'un contrat.

<h3 id="delete__api_contracts_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du contrat|

<h3 id="delete__api_contracts_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Contrat supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Contrat introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-clients">Clients</h1>

Gestion des clients particuliers et entreprises

## post__api_clients

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/clients \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/clients HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Equity BCDC",
  "client_type": "company",
  "phone": 243000000,
  "email": "contact@equity.com",
  "address": "Kinshasa",
  "contact_person": "John Doe",
  "tax_number": "RCCM123"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/clients',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/clients',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/clients', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/clients', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/clients");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/clients", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/clients`

*Créer un client*

Crée un nouveau client particulier ou entreprise.

> Body parameter

```json
{
  "name": "Equity BCDC",
  "client_type": "company",
  "phone": 243000000,
  "email": "contact@equity.com",
  "address": "Kinshasa",
  "contact_person": "John Doe",
  "tax_number": "RCCM123"
}
```

<h3 id="post__api_clients-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» client_type|body|string|true|individual ou company|
|» phone|body|string|false|none|
|» email|body|string|false|none|
|» address|body|string|false|none|
|» contact_person|body|string|false|none|
|» tax_number|body|string|false|none|

<h3 id="post__api_clients-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Client créé avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_clients

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/clients \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/clients HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/clients',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/clients',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/clients', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/clients', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/clients");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/clients", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/clients`

*Liste des clients*

Retourne la liste paginée des clients avec filtres de recherche.

<h3 id="get__api_clients-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|search|query|string|false|Recherche par nom, email ou téléphone|
|client_type|query|string|false|Filtrer par type de client|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Clients retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "name": "Equity BCDC",
        "client_type": "company",
        "phone": 243000000,
        "email": "contact@equity.com",
        "address": "Kinshasa",
        "contact_person": "John Doe",
        "tax_number": "RCCM123",
        "created_at": "2026-05-20T10:34:18.522Z",
        "updated_at": "2026-05-20T10:34:18.522Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_clients-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_clients-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» name|string|false|none|none|
|»»» client_type|string|false|none|none|
|»»» phone|string|false|none|none|
|»»» email|string|false|none|none|
|»»» address|string|false|none|none|
|»»» contact_person|string|false|none|none|
|»»» tax_number|string|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»»» updated_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_clients_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/clients/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/clients/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "Equity BCDC SA",
  "phone": 243999999999,
  "email": "support@equity.com",
  "address": "Kinshasa Gombe",
  "contact_person": "Jane Doe",
  "tax_number": "RCCM456"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/clients/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/clients/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/clients/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/clients/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/clients/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/clients/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/clients/{id}`

*Modifier un client*

Met à jour les informations d'un client existant.

> Body parameter

```json
{
  "name": "Equity BCDC SA",
  "phone": 243999999999,
  "email": "support@equity.com",
  "address": "Kinshasa Gombe",
  "contact_person": "Jane Doe",
  "tax_number": "RCCM456"
}
```

<h3 id="put__api_clients_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant du client|
|body|body|object|true|none|
|» name|body|string|false|none|
|» phone|body|string|false|none|
|» email|body|string|false|none|
|» address|body|string|false|none|
|» contact_person|body|string|false|none|
|» tax_number|body|string|false|none|

<h3 id="put__api_clients_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Client modifié avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Client introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_clients_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/clients/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/clients/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/clients/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/clients/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/clients/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/clients/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/clients/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/clients/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/clients/{id}`

*Supprimer un client*

Suppression logique d'un client.

<h3 id="delete__api_clients_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Identifiant du client|

<h3 id="delete__api_clients_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Client supprimé avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Client introuvable|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-cautions">Cautions</h1>

Gestion des cautions liées aux contrats partenaires

## post__api_cautions

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/cautions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/cautions HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "contract_id": "CONTRACT_UUID",
  "amount_initial": 5000,
  "currency": "USD",
  "deposited_at": "2026-05-20",
  "notes": "Caution principale Ethiopian Airlines"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/cautions',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/cautions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/cautions', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/cautions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/cautions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/cautions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/cautions`

*Créer une caution*

Crée une nouvelle caution associée à un contrat de type caution_only ou caution_stock.

> Body parameter

```json
{
  "contract_id": "CONTRACT_UUID",
  "amount_initial": 5000,
  "currency": "USD",
  "deposited_at": "2026-05-20",
  "notes": "Caution principale Ethiopian Airlines"
}
```

<h3 id="post__api_cautions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» contract_id|body|string(uuid)|true|none|
|» amount_initial|body|number|true|none|
|» currency|body|string|true|none|
|» deposited_at|body|string(date)|false|none|
|» notes|body|string|false|none|

<h3 id="post__api_cautions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Caution créée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Contrat invalide ou données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et comptables|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Contrat introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_cautions

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/cautions \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/cautions HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/cautions',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/cautions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/cautions', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/cautions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/cautions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/cautions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/cautions`

*Liste des cautions*

Retourne la liste paginée des cautions avec filtres de recherche.

<h3 id="get__api_cautions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|search|query|string|false|Recherche sur les cautions|
|contract_type|query|string|false|Filtrer par type de contrat|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Cautions retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "contract_id": "9aafc1a8-e497-46c9-ba0b-bd5b03c353e4",
        "partner_name": "Congo Airways",
        "contract_type": "caution_stock",
        "amount_initial": "5000.00",
        "amount_remaining": "5000.00",
        "currency": "USD",
        "deposited_at": "2026-05-19T23:00:00.000Z",
        "notes": "Caution principale Ethiopian Airlines",
        "is_active": true,
        "created_at": "2026-05-21T14:56:57.528Z",
        "updated_at": "2026-05-21T14:56:57.528Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

<h3 id="get__api_cautions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_cautions-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» contract_id|string(uuid)|false|none|none|
|»»» partner_name|string|false|none|none|
|»»» contract_type|string|false|none|none|
|»»» amount_initial|string|false|none|none|
|»»» amount_remaining|string|false|none|none|
|»»» currency|string|false|none|none|
|»»» deposited_at|string(date-time)|false|none|none|
|»»» notes|string|false|none|none|
|»»» is_active|boolean|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»»» updated_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_cautions_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/cautions/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/cautions/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "amount_remaining": 4200,
  "notes": "Mise à jour après émission",
  "is_active": true
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/cautions/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/cautions/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/cautions/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/cautions/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/cautions/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/cautions/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/cautions/{id}`

*Modifier une caution*

Met à jour une caution. Une caution dont le montant restant atteint zéro est automatiquement désactivée.

> Body parameter

```json
{
  "amount_remaining": 4200,
  "notes": "Mise à jour après émission",
  "is_active": true
}
```

<h3 id="put__api_cautions_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Identifiant de la caution|
|body|body|object|true|none|
|» amount_remaining|body|number|false|none|
|» notes|body|string|false|none|
|» is_active|body|boolean|false|none|

<h3 id="put__api_cautions_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Caution modifiée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs, managers et comptables|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Caution introuvable|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_cautions_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/cautions/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/cautions/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/cautions/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/cautions/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/cautions/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/cautions/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/cautions/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/cautions/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/cautions/{id}`

*Supprimer une caution*

Effectue une suppression logique d'une caution.

<h3 id="delete__api_cautions_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Identifiant de la caution|

<h3 id="delete__api_cautions_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Caution supprimée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Accès réservé aux administrateurs et managers|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Caution introuvable|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-authentication">Authentication</h1>

Authentification et gestion de session utilisateur

## post__api_auth_login

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:5000/api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "faith@gmail.com",
  "password": "Admin@2026"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:5000/api/auth/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:5000/api/auth/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/auth/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/auth/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/auth/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/auth/login`

*Authentification utilisateur*

Permet à un utilisateur de se connecter et d'obtenir un token JWT.

> Body parameter

```json
{
  "email": "faith@gmail.com",
  "password": "Admin@2026"
}
```

<h3 id="post__api_auth_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» email|body|string(email)|true|none|
|» password|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "username": "dido",
      "full_name": "Dido Kapanga",
      "email": "faith@gmail.com",
      "role": "admin",
      "is_active": true
    }
  }
}
```

<h3 id="post__api_auth_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authentification réussie|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Identifiants invalides|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="post__api_auth_login-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» token|string|false|none|none|
|»» user|object|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» username|string|false|none|none|
|»»» full_name|string|false|none|none|
|»»» email|string|false|none|none|
|»»» role|string|false|none|none|
|»»» is_active|boolean|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_auth_me

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/auth/me \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/auth/me HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/auth/me',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/auth/me',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/auth/me', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/auth/me', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/auth/me");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/auth/me", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/auth/me`

*Informations utilisateur connecté*

Retourne les informations du compte associé au token JWT.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Current user retrieved successfully",
  "data": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "username": "dido",
    "full_name": "Dido Kapanga",
    "email": "kapangadido@gmail.com",
    "role": "admin",
    "is_active": true
  }
}
```

<h3 id="get__api_auth_me-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Informations utilisateur récupérées|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Token invalide ou expiré|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Utilisateur introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_auth_me-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» username|string|false|none|none|
|»» full_name|string|false|none|none|
|»» email|string|false|none|none|
|»» role|string|false|none|none|
|»» is_active|boolean|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-audit-logs">Audit Logs</h1>

Consultation des journaux d'audit et des actions effectuées dans le système

## get__api_audit-logs

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/audit-logs \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/audit-logs HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/audit-logs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/audit-logs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/audit-logs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/audit-logs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/audit-logs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/audit-logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/audit-logs`

*Consulter les journaux d'audit*

Retourne les journaux d'audit avec possibilités de filtrage et pagination.

<h3 id="get__api_audit-logs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Numéro de page|
|limit|query|integer|false|Nombre d'éléments par page|
|module|query|string|false|Filtrer par module|
|action_type|query|string|false|Filtrer par type d'action|
|actor_id|query|string(uuid)|false|Filtrer par utilisateur|
|start_date|query|string(date)|false|Date de début|
|end_date|query|string(date)|false|Date de fin|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Audit logs retrieved successfully",
  "data": {
    "data": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "module": "clients",
        "entity_id": "8161163a-f227-466f-bc01-090a01e80165",
        "action_type": "create",
        "actor_id": "04f37679-bfbf-4906-b749-01756515cecf",
        "actor_name": "Dido Kapanga",
        "description": "Client created successfully",
        "old_data": {},
        "new_data": {},
        "created_at": "2026-06-03T14:00:00Z"
      }
    ],
    "total": 150,
    "page": 1,
    "limit": 10,
    "total_pages": 15
  }
}
```

<h3 id="get__api_audit-logs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Journaux récupérés avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_audit-logs-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|object|false|none|none|
|»» data|[object]|false|none|none|
|»»» id|string(uuid)|false|none|none|
|»»» module|string|false|none|none|
|»»» entity_id|string(uuid)|false|none|none|
|»»» action_type|string|false|none|none|
|»»» actor_id|string(uuid)|false|none|none|
|»»» actor_name|string|false|none|none|
|»»» description|string|false|none|none|
|»»» old_data|object¦null|false|none|none|
|»»» new_data|object¦null|false|none|none|
|»»» created_at|string(date-time)|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» total_pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="levannel-api-airlines">Airlines</h1>

Gestion des compagnies aériennes

## post__api_airlines

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:5000/api/airlines \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:5000/api/airlines HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "code": "ET",
  "name": "Ethiopian Airlines",
  "country": "Ethiopia"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/airlines',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:5000/api/airlines',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:5000/api/airlines', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:5000/api/airlines', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/airlines");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:5000/api/airlines", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/airlines`

*Créer une compagnie aérienne*

Crée une nouvelle compagnie aérienne.

> Body parameter

```json
{
  "code": "ET",
  "name": "Ethiopian Airlines",
  "country": "Ethiopia"
}
```

<h3 id="post__api_airlines-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» code|body|string|true|Code IATA ou code interne de la compagnie|
|» name|body|string|true|none|
|» country|body|string|true|none|

<h3 id="post__api_airlines-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Compagnie créée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Code compagnie déjà existant ou données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Réservé aux administrateurs|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_airlines

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:5000/api/airlines \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:5000/api/airlines HTTP/1.1
Host: localhost:5000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/airlines',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:5000/api/airlines',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:5000/api/airlines', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:5000/api/airlines', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/airlines");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:5000/api/airlines", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/airlines`

*Liste des compagnies aériennes*

Retourne la liste de toutes les compagnies aériennes actives.

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Airlines retrieved successfully",
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "code": "ET",
      "name": "Ethiopian Airlines",
      "logo": null,
      "country": "Ethiopia",
      "is_active": true,
      "created_at": "2026-05-20T13:13:57.777Z",
      "updated_at": "2026-05-20T13:13:57.777Z"
    }
  ]
}
```

<h3 id="get__api_airlines-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Liste récupérée avec succès|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<h3 id="get__api_airlines-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|
|» data|[object]|false|none|none|
|»» id|string(uuid)|false|none|none|
|»» code|string|false|none|none|
|»» name|string|false|none|none|
|»» logo|string¦null|false|none|none|
|»» country|string|false|none|none|
|»» is_active|boolean|false|none|none|
|»» created_at|string(date-time)|false|none|none|
|»» updated_at|string(date-time)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_airlines_{id}

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:5000/api/airlines/{id} \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:5000/api/airlines/{id} HTTP/1.1
Host: localhost:5000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "code": "ET",
  "name": "Ethiopian Airlines",
  "country": "Ethiopia"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/airlines/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:5000/api/airlines/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:5000/api/airlines/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:5000/api/airlines/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/airlines/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:5000/api/airlines/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/airlines/{id}`

*Modifier une compagnie aérienne*

Met à jour les informations d'une compagnie aérienne.

> Body parameter

```json
{
  "code": "ET",
  "name": "Ethiopian Airlines",
  "country": "Ethiopia"
}
```

<h3 id="put__api_airlines_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de la compagnie aérienne|
|body|body|object|true|none|
|» code|body|string|false|none|
|» name|body|string|false|none|
|» country|body|string|false|none|

<h3 id="put__api_airlines_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Compagnie modifiée avec succès|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Données invalides|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Réservé aux administrateurs|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Compagnie introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_airlines_{id}

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:5000/api/airlines/{id} \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:5000/api/airlines/{id} HTTP/1.1
Host: localhost:5000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/airlines/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:5000/api/airlines/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:5000/api/airlines/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:5000/api/airlines/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:5000/api/airlines/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:5000/api/airlines/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/airlines/{id}`

*Supprimer une compagnie aérienne*

Effectue une suppression logique d'une compagnie aérienne.

<h3 id="delete__api_airlines_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string(uuid)|true|Identifiant de la compagnie aérienne|

<h3 id="delete__api_airlines_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Compagnie supprimée avec succès|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Non authentifié|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Réservé aux administrateurs|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Compagnie introuvable|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Erreur serveur|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

