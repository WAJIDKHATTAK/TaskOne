# TaskOne

CRUD with express MVC

# FileStructure :

### config : Validates env Configs

### constants : Exports Roles

### role : Role Authorization setting rolerights for roles [user , admin]

### generateToken : Takes id and role and signs it with secret key and generates token

### logger : Use winston to converts stack traces from errors into readable messages

### morgan : using morgan middleware to log http req & res

### passport : configuring a JWT (JSON Web Token) authentication strategy using the passport-jwt

### token : Token Types



"email":"superadmin1@admin.com",
"password":"adminkite123"
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRmNmViZjFmYWY5NDY1ZjdlNzEwNTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIzNjQ1MTEsImV4cCI6MTcyMzkyMjExMX0.XbzbQ0vUt-tRot52b_6p6Eczb2el9lRT_qM6YEWF-M8

{
"email":"superadmin2@admin.com",
"password":"adminkite123"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRmODEwOGI1ZGI0ZWNkNmYzMzVmYzIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIzNjkxODYsImV4cCI6MTcyMzkyNjc4Nn0.15Vihh8ipMlkL5mBUU3fdvLrxq_nTPYnvpdr72cDSIw

#Packages :

### http-status usage
```
console.log(httpStatus.OK); // Outputs: 200
console.log(httpStatus.BAD_REQUEST); // Outputs: 400
console.log(httpStatus.NOT_FOUND); // Outputs: 404
console.log(httpStatus.INTERNAL_SERVER_ERROR); // Outputs: 500
console.log(httpStatus.isInformational(httpStatus.CONTINUE)); // Outputs: true
console.log(httpStatus.isSuccess(httpStatus.OK)); // Outputs: true
console.log(httpStatus.isClientError(httpStatus.BAD_REQUEST)); // Outputs: true
console.log(httpStatus.isServerError(httpStatus.INTERNAL_SERVER_ERROR)); // Outputs: true

```