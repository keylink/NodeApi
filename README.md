
## NodeApi endpoints


###### Headers

```
Content-type: application/json
Authorization: JWT token
```

|Request| Type | Url |
|------| ------ | ------ |
| Register | POST | http://{address}/register] |
| Login | POST | http://{address}/login] |
| Users | GET | http://{address}/users] |
| User | GET | http://{address}/users/:id |
| Edit | PUT | http://{address}/users/:id |
| Delete | DELETE | http://{address}/users/:id |

###### Response Body

```
{
  message: "Success",
  data: data
}
```