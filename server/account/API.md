# Account APIs

The list of API's the account module.

### Authentication API
---
#### 1. Register API endpoint

- **URL:**`localhost:3000/api/v1/account/register`
- **Method:** `POST`
- **Access:** `public`
- **Input fields:** `name, email, password, phoneNumber, role`

**Input Example:**
```
{
    "name": "Anisul Islam",
    "email": "kingfahad0802@mail.com",
    "password": "anis@123",
    "phoneNumber": "01682750923",
    "role": "researcher"
}
```
**Response Example:**
```
{
   "message": "Registration Successful",
   "data": {
       "isAccountVerified": false,
       "isAccountActive": true,
       "_id": "5dbc50f737518a2f285f02d9",
       "name": "Anisul Islam",
       "email": "kingfahad0802@mail.com",
       "phoneNumber": "01682750923",
       "role": "researcher",
       "__v": 0
   }
}
```
#### 2. Login API endpoint
**URL:** `localhost:3000/api/v1/account/login`
**METHOD:** `POST`
**ACCESS:** `public`
**Input Fields:** `email, password`
**Input Example:** 
```
{
    "email": "kingfahad0802@mail.com",
    "password": "anis@123"
}
```
**Response Example:**
```
{
    "success": true,
    "data": {
        "isAccountVerified": false,
        "isAccountActive": true,
        "_id": "5dbc50f737518a2f285f02d9",
        "name": "Anisul Islam",
        "email": "kingfahad0802@mail.com",
        "phoneNumber": "01682750923",
        "role": "researcher",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6eyJpc0FjY291bnRWZXJpZmllZCI6ZmFsc2UsImlzQWNjb3VudEFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNWRiYzUwZjczNzUxOGEyZjI4NWYwMmQ5IiwibmFtZSI6IkFuaXN1bCBJc2xhbSIsImVtYWlsIjoia2luZ2ZhaGFkMDgwMkBtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDE2ODI3NTA5MjMiLCJyb2xlIjoicmVzZWFyY2hlciIsInBhc3N3b3JkIjoiJDJhJDEwJC9ndUlMc1NQTmJEYmZMcHlwdU9neU82bjNRbmE2Y1RydGJyamhFYTE4ZnpySUw3QmJqeHQ2IiwiX192IjowfSwiaWF0IjoxNTcyNjc1ODc3LCJleHAiOjE1NzI3NjIyNzd9.aWHQjp0MCdNykhPE-Q40JBmgdxvaWbykHERVJRupLso"
}
```

>***Make an “Authorization” header with the token***
```
"Authorization" "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6eyJpc0FjY291bnRWZXJpZmllZCI6ZmFsc2UsImlzQWNjb3VudEFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNWRiYzUwZjczNzUxOGEyZjI4NWYwMmQ5IiwibmFtZSI6IkFuaXN1bCBJc2xhbSIsImVtYWlsIjoia2luZ2ZhaGFkMDgwMkBtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDE2ODI3NTA5MjMiLCJyb2xlIjoicmVzZWFyY2hlciIsInBhc3N3b3JkIjoiJDJhJDEwJC9ndUlMc1NQTmJEYmZMcHlwdU9neU82bjNRbmE2Y1RydGJyamhFYTE4ZnpySUw3QmJqeHQ2IiwiX192IjowfSwiaWF0IjoxNTcyNjc1ODc3LCJleHAiOjE1NzI3NjIyNzd9.aWHQjp0MCdNykhPE-Q40JBmgdxvaWbykHERVJRupLso"
```
