
## NodeApi endpoints


###### Headers

```
Content-type: application/json
Authorization: JWT token
```

###### Response Body

```
{
  message: "Success",
  token: JWT token
}
```

|Request| Type | Url |
|------| ------ | ------ |
| Register | POST | [http://{address}/register] [PlDb] |
| Login | POST | [http://{address}/login] [PlGh] |
| Users | GET | [http://{address}/users] [PlGd] |
| User | GET | [http://{address}/users/:id] [PlOd] |
| Edit | PUT | [http://{address}/users/:id] [PlMe] |
| Delete | DELETE | [http://{address}/users/:id] [PlGa] |