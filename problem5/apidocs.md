# API DOCUMENTATION

### 1. **Create User**

**Endpoint:** `POST /users`

**Request body:**

```json
{
    "username": "fatmouse",
    "email": "loc@gmail.com",
    "fullname": "La Hong Loc",
    "password": "password"
}
```

**Response:**

```json
{
    "statusCode": 201,
    "message": "Created user successfully!",
    "data": {
        "id": "47329804-61a5-4773-9753-0cf3382131f8",
        "username": "fatmouse",
        "email": "loc@gmail.com",
        "fullname": "La Hong Loc",
        "roles": [
            {
                "roleName": "ROLE_USER",
                "description": "Role for user"
            }
        ]
    }
}
```

---

### 2. **Login**

**Endpoint:** `POST /login`

**Request body:**

```json
{
    "username": "fatmouse",
    "password": "password"
}
```

**Response:**

```json
{
    "statusCode": 200,
    "message": "Login successfully!",
    "data": {
        "username": "fatmouse",
        "email": "loc@gmail.com",
        "fullname": "La Hong Loc",
        "createdAt": "2025-01-13T23:29:27.097Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NzMyOTgwNC02MWE1LTQ3NzMtOTc1My0wY2YzMzgyMTMxZjgiLCJ1c2VybmFtZSI6ImZhdG1vdXNlIiwiaXNzIjoiOTlUZWNoQ1JVREFwcCIsInNjb3BlIjoiUk9MRV9VU0VSIENSRUFURV9SRVNPVVJDRSBHRVRfUkVTT1VSQ0VTIEdFVF9SRVNPVVJDRV9ERVRBSUxTIFVQREFURV9SRVNPVVJDRSBERUxFVEVfUkVTT1VSQ0UiLCJleHAiOjE3MzY4NDMzNzAsImlhdCI6MTczNjgzNjE3MH0.I1zGbk6d--w3oCtj-rqU4mxBAS6wZM6Z0rlscjX0PT8"
    }
}
```

---

### 3. **Create Resource**

**Endpoint:** `POST /resources`

**Request body:**

```json
{
    "resourceName": "Bach tuyet va 7 chu lun",
    "description": "Phim hoat hinh thieu nhi",
    "type": "Media"
}
```

**Response:**

```json
{
    "statusCode": 201,
    "message": "Resource created successfully!",
    "data": {
        "id": "418dac90-6f45-4644-a2c9-2a97c3e68f04",
        "resourceName": "Bach tuyet va 7 chu lun",
        "description": "Phim hoat hinh thieu nhi",
        "createdBy": {
            "id": "47329804-61a5-4773-9753-0cf3382131f8",
            "username": "fatmouse",
            "email": "loc@gmail.com",
            "fullname": "La Hong Loc"
        },
        "type": {
            "typeName": "Media",
            "description": "This is the media resource"
        },
        "createdAt": "2025-01-13T23:33:54.031Z",
        "updatedAt": "2025-01-13T23:33:54.031Z"
    }
}
```

---

### 4. **Filter Resources**

**Endpoint:** `GET /resources/filter`

**Query Parameters:**

```json
{
    "resourceName: "",
    "type": "",
    "from": "",
    "to": "",
    "pageNumber": 1
}
```

**Response:**

```json
{
    "statusCode": 200,
    "message": "Filter the resources successfully!",
    "data": [
        {
            "id": "8b842ae2-7876-4e85-a93c-70f1a87ef438",
            "resourceName": "Triet hoc Mac Lenin",
            "description": "Truyen tranh",
            "createdBy": {
                "id": "47329804-61a5-4773-9753-0cf3382131f8",
                "username": "fatmouse",
                "email": "loc@gmail.com",
                "fullname": "La Hong Loc"
            },
            "type": {
                "typeName": "Document",
                "description": "This is the document resource"
            },
            "createdAt": "2025-01-13T23:31:01.672Z",
            "updatedAt": "2025-01-13T23:31:01.672Z"
        },
        {
            "id": "b2697043-0e07-471c-a4e6-14e1814c1d86",
            "resourceName": "Lau dai bay cua phap su gio",
            "description": "Phim Ghibli",
            "createdBy": {
                "id": "47329804-61a5-4773-9753-0cf3382131f8",
                "username": "fatmouse",
                "email": "loc@gmail.com",
                "fullname": "La Hong Loc"
            },
            "type": {
                "typeName": "Media",
                "description": "This is the media resource"
            },
            "createdAt": "2025-01-13T23:32:28.696Z",
            "updatedAt": "2025-01-13T23:32:28.696Z"
        },
        {
            "id": "418dac90-6f45-4644-a2c9-2a97c3e68f04",
            "resourceName": "Bach tuyet va 7 chu lun",
            "description": "Phim hoat hinh thieu nhi",
            "createdBy": {
                "id": "47329804-61a5-4773-9753-0cf3382131f8",
                "username": "fatmouse",
                "email": "loc@gmail.com",
                "fullname": "La Hong Loc"
            },
            "type": {
                "typeName": "Media",
                "description": "This is the media resource"
            },
            "createdAt": "2025-01-13T23:33:54.031Z",
            "updatedAt": "2025-01-13T23:33:54.031Z"
        }
    ]
}
```

---

### 5. **Get Resource Details**

**Endpoint:** `GET /resources/{resourceId}`

**Response:**

```json
{
    "statusCode": 200,
    "message": "Get the resource details successfully!",
    "data": {
        "id": "b2697043-0e07-471c-a4e6-14e1814c1d86",
        "resourceName": "Lau dai bay cua phap su gio",
        "description": "Phim Ghibli",
        "createdBy": {
            "id": "47329804-61a5-4773-9753-0cf3382131f8",
            "username": "fatmouse",
            "email": "loc@gmail.com",
            "fullname": "La Hong Loc"
        },
        "type": {
            "typeName": "Media",
            "description": "This is the media resource"
        },
        "createdAt": "2025-01-13T23:32:28.696Z",
        "updatedAt": "2025-01-13T23:32:28.696Z"
    }
}
```

---

### 6. **Update Resource Details**

**Endpoint:** `PUT /resources/{resourceId}`

**Request body:**

```json
{
    "resourceName": "Triet hoc Mac Lenin",
    "description": "Truyen tranh",
    "type": "Document"
}
```

**Response:**

```json
{
    "statusCode": 200,
    "message": "Resource details updated successfully!",
    "data": {
        "id": "8b842ae2-7876-4e85-a93c-70f1a87ef438",
        "resourceName": "Triet hoc Mac Lenin",
        "description": "Truyen tranh",
        "type": {
            "typeName": "Document"
        },
        "createdAt": "2025-01-13T23:31:01.672Z",
        "updatedAt": "2025-01-14T00:19:44.915Z"
    }
}
```

---

### 7. **Delete Resource**

**Endpoint:** `DELETE /resources/{resourceId}`

**Response:**

```json
{
    "statusCode": 200,
    "message": "Resource deleted successfully!",
    "data": {}
}
```

---

Tài liệu API trên đã được cập nhật để phản ánh đúng cấu trúc của response với các DTO bạn gửi.
