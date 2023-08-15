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

- Change password

  method --> POST
  
```
http://localhost:5001/api/admins/change-password
```

body {

email : type String,      // admin@admin.com

password : type String,      // old password

newPassword : type String      // more than 8 chars & doesn't contain "password" word

}

<hr/>

### User

- User signup

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


<hr/>

### Categories

- Get all categories

  method --> GET
  
```
http://localhost:5001/api/categories
```

- Get specific category by id

  method --> GET
  
```
http://localhost:5001/api/categories/:id
```

- Create category

  method --> POST
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/categories
```

body {

name : type String 
  
}

- Update category

  method --> PUT
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/categories/:id
```

body {

name : type String 
  
}

- Delete category

  method --> DELETE
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/categories/:id
```

<hr/>


### Products

- Get all products

  method --> GET
  
```
http://localhost:5001/api/products
```

// It's an optional feature to handle pagination. By default page=1, limit=20 (if you don't send params).

params {

page : type Number, // page number

limit : type Number // number of products per page

}

- Get specific product by id

  method --> GET
  
```
http://localhost:5001/api/products/:id
```

- Create product

  method --> POST
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/products
```

body {

name : type String 
  
}

- Update product

  method --> PUT
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/products/:id
```

body {

name : type String 
  
}

- Delete product

  method --> DELETE
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/products/:id
```
