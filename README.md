# Job-Portal

Fullstack Project with React and Express

## Tech Stack
- React
- Redux Saga
- Express
- Mysql with Sequalize

## MVP Fiture
- Redis
  
#URL
_Server_
```
http://localhost:5000
```

---

## Global Response

_Response (404 - API Not Found)_

```
{
  "message": "API Not Found"
}
```

---

## RESTful endpoints

### POST /api/user/register

> register user
_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
    "name": "<string>",
    "email": "<string>",
    "password": "<string>",
    "role": "<integer>"
}
```
_Response (201)_

```
{
    "message": "Pendaftaran Berhasil",
    "data": "<newUser>"
}
```
_Response (400)_

```
{
    "message": "Email sudah digunakan"
}
```
_Response (400 - Validation Error)_

```
{
    "message": "\"email\" is required"
}
```
---

### POST /api/user/login

> login

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
    "email": "<string>",
    "password": "<String>"
}
```

_Response (200)_

```
{
    "message": "Login successful",
    "data": {
              "token":"<token>"
            }
}
```

_Response (401)_

```
{
    "message": "Invalid email or password"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "\"email\" invalid email input"
}
```

---

### GET /api/user/

> get all Users

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success",
    "users": [
        "<data_users>"
    ]
}
```

_Response (403)_

```
{
    "message": "Akses ditolak. Hanya untuk Admin."
}
```

---

### POST /api/company/createJob

> create Job

```
Authorization: "Bearer <token_user_recruiter>"
```

_Request Params_

```
not needed
```

_Request Body

```
{
    "Company": "<company>",
    "Judul": "<judul>",
    "Deskripsi": "<deskripsi>",
    "Lokasi": "<lokasi>",
    "TipePekerjaan": "<tipepekerjaan>",
    "Gaji": "<gaji>",
    "Kategori": "<kategori>"
    EmployerID: "<userId>"
}
```

_Response (200) success_

```
{
    "message": "Lowongan pekerjaan berhasil dibuat",
    "data": "<newJob>"
}
```

---

### UPDATE /api/company/updateJob/:id

> Update Job

```
Authorization: "Bearer <token_user_recruiter>"
```

_Request Params_

```
/:jobId
```

_Request Body

```
{
    "Company": "<company>",
    "Judul": "<judul>",
    "Deskripsi": "<deskripsi>",
    "Lokasi": "<lokasi>",
    "TipePekerjaan": "<tipepekerjaan>",
    "Gaji": "<gaji>",
    "Kategori": "<kategori>"
}
```

_Response (200) success_

```
{
    "message": "Lowongan pekerjaan berhasil diperbarui",
    "data": "<updateJob>"
}
```

_Response (403)_ 

```
{
    "message": "Anda tidak memiliki izin untuk mengedit pekerjaan ini",
}
```

_Response (404)_

```
{
    "message": "Lowongan pekerjaan tidak ditemukan",
}
```

### DELETE /api/company/:jobId

> delete job

_Request Header_

```
Authorization: "Bearer <token_recruiter>"
```

_Request Params_

```
/<jobId>
```

_Request Body_

```
not needed
```

_Response (200) success_

```
{
    "message": "Lowongan pekerjaan berhasil dihapus"
}
```

_Response (403)_

```
{
    "message": "Anda tidak memiliki izin untuk menghapus pekerjaan ini"
}
```

_Response (404)_

```
{
    "message": "Lowongan pekerjaan tidak ditemukan"
}
```

### GET /api/jobs/

> get all jobs

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200) success_

```
{
    "message": "success",
    "data": [
        "id": 10,
            "EmployerID": <id>,
            "Company": "<company>",
            "Judul": "<judulPekerjaan>",
            "Deskripsi": "<deskripsi>",
            "Lokasi": "<lokasi>",
            "TipePekerjaan": "<tipePekerjaan>",
            "Gaji": "<gaji>",
            "Kategori": "<kategori>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>"
    ]
}
```

### GET /api/jobs/jobId

> get detail job

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200) success_

```
{
    "message": "success",
    "data": [
        "id": 10,
            "EmployerID": <id>,
            "Company": "<company>",
            "Judul": "<judulPekerjaan>",
            "Deskripsi": "<deskripsi>",
            "Lokasi": "<lokasi>",
            "TipePekerjaan": "<tipePekerjaan>",
            "Gaji": "<gaji>",
            "Kategori": "<kategori>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>",
            "recruiter": {
                <data_recruiter>
            }
    ]
}
```

_Response (404)_

```
{
    "message": "Job not found",
}
```

### GET /api/jobs/dashboards

> get all job by userId

_Request Header_

```
Authorization: "Bearer <token_admin_recruiter>"
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200) success_

```
{
    "message": "success",
    "data": [
        "id": 10,
            "EmployerID": <id>,
            "Company": "<company>",
            "Judul": "<judulPekerjaan>",
            "Deskripsi": "<deskripsi>",
            "Lokasi": "<lokasi>",
            "TipePekerjaan": "<tipePekerjaan>",
            "Gaji": "<gaji>",
            "Kategori": "<kategori>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>",
            "recruiter": {
                <data_recruiter>
            }
    ]
}
```

### POST /api/jobs/jobId/apply

> apply job

_Request Header_

```
Authorization: "Bearer <token_user>"
```

_Request Params_

```
not needed
```

_Request Body_

```
{
    "cvUrl":"<string>",
}
```

_Response (201)_

```
{
    "message": "Lamaran berhasil dikirim",
    "application": {
              <newApplication>
            }
}
```


_Response (400)_

```
{
    "message": "Mohon sertakan file CV dalam permintaan Anda."
}
```

```
{
    "message": "Anda sudah melamar pekerjaan ini sebelumnya."
}
```


### GET /api/jobs/:jobId/check-application

> Check status apply

_Request Header_

```
Authorization: "Bearer <token_user>"
```

_Request Params_

```
not needed
```

_Request Body_

```
no need
```

_Response (200)_

```
{
    "hasApplied": <boolean>
}
```

### DELETE /api/jobs/applications/:applicationId

> Delete apply job

_Request Header_

```
Authorization: "Bearer <token_user_recruiter>"
```

_Request Params_

```
not needed
```

_Request Body_

```
no need
```

_Response (200)_

```
{
    "message": "Aplikasi lamaran berhasil dihapus."
}
```

_Response (404)_

```
{
    "message": "Aplikasi lamaran tidak ditemukan."
}
```
