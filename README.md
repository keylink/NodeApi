
## NodeApi endpoints


### User registration

###### URL

```POST http://{address}/register```

###### Headers

```
Content-type: application/json
```

###### Response Body

```
{
  message: "Successfully created new user."
}
```

### Login

###### URL

```POST http://{address}/login```

###### Headers

```
Content-type: application/json
```

###### Response Body

```
{
  message: "Success",
  token: JWT token
}
```

### Get users

###### URL

```GET http://{address}/users```

###### Headers

```
Content-type: application/json
Authorization: JWT token
```

### Get single user

###### URL

```GET http://{address}/users/:id```

###### Headers

```
Content-type: application/json
Authorization: JWT token
```

### Edit user

###### URL

```PUT http://{address}/users/:id```

###### Headers

```
Content-type: application/json
Authorization: JWT token
```

### Delete user

###### URL

```DELETE http://{address}/users/:id```

###### Headers

```
Content-type: application/json
Authorization: JWT token
```
