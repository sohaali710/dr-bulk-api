# Dr-Bulk-API
      
#### 1) To install packages :
   
```
npm i
```

#### 2) To run the server

In the production mode [frontend dev] :

```
npm run prod
```

In the development mode :

```
npm run dev
```


## APIS


### Admin

- Login

  method --> POST
  
```
http://localhost:5001/api/admins/login
```

body {

email : type String,      // admin@admin.com

password : type String      // Admin123

}

<hr/>

### User

  method --> POST
  
```
http://localhost:5001/api/users/signup
```

body {

name : type String ,
      
email : type String ,
      
password : type String ,      // more than 8 chars & doesn't contain "password" word
      
gender : type String ,      // "M" or "F"
      
phoneNumber : type String
      
}

- User login

  method --> POST
  
```
http://localhost:5001/api/users/login
```

body {

email : type String ,
  
password : type String
  
}
