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
  access --> Private [Admin]
  
```
http://localhost:5001/api/admins/change-password
```

body {

email : type String,      // admin@admin.com

password : type String,      // old password

newPassword : type String      // should be combination of one uppercase , one lower case, one digit and min 8

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
      
password : type String ,      // should be combination of one uppercase , one lower case, one digit and min 8
      
gender : type String ,      // "M" or "F"
      
phoneNumber : type Number
      
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

name : {

en: type String,

ar: type String

}
  
}

- Update category

  method --> PUT
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/categories/:id
```


body {

name : {

en: type String,

ar: type String

}
  
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
http://localhost:5001/api/products?page={Number}&limit={Number}
```

// by default page=1, limit=20 (if you don't send params using route : http://localhost:5000/admin/students)

response on success

{

results: Number,    // number of students per page (less than or equal limit)

pagination: {      // to handle pagination feature (to divide data into pages)

currentPage: Number,

limit: Number,      // max number of students per page

numberOfPages: Number

},
                
data: [
products data per page
]

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

body {      // all data is required unless points

title: type String,

category: type ObjectId, // category id

description: type String,

price: type Number,

points: type Number,

images: type Array
  
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

- Add product images 

  method --> POST
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/products/add-img/:id
```

body {
images: type Array
}

- Remove product image

  method --> DELETE
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/products/remove-img/:id
```
