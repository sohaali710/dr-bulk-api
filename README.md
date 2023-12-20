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

### Editor

- Login

  method --> POST
  
```
http://localhost:5001/api/editors/login
```

body {

email : type String,      // editor@bulk.com

password : type String      // Editor123

}

- Change password

  method --> POST
  
  access --> Private [Editor]
  
```
http://localhost:5001/api/editors/change-password
```

body {

email : type String,      // editor@bulk.com

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

- Verify User Email

  method --> GET
  
```
http://localhost:5001/api/users/verify-email-code/:code/:id
```

- User login

  method --> POST
  
```
http://localhost:5001/api/users/login
```

body {

email : type String ,
  
password : type String
  
}

- Get all users

  method --> GET
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/users/all-users
```


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
  
  access --> Private [Admin or Editor]
  
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

title : {

en: type String,

ar: type String

},

category: type ObjectId, // category id

description: {

en: type String,

ar: type String

},

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

- Editor Update product

  method --> PUT
  
  access --> Private [Editor]
  
```
http://localhost:5001/api/products/editor/:id
```


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

<hr/>


### Instructors

- Get all instructors

  method --> GET
  
```
http://localhost:5001/api/instructors
```

- Get specific instructor by id

  method --> GET
  
```
http://localhost:5001/api/instructors/:id
```

- Add new instructor

  method --> POST
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/instructors
```

body {

name : {

en: type String,

ar: type String

},

bio : {

en: type String,

ar: type String

}, 

phoneNumber: type Number, // optional

image: type String // optional
  
}

- Update instructor

  method --> PUT
  
  access --> Private [Admin or Editor]
  
```
http://localhost:5001/api/instructors/:id
```

- Delete instructor

  method --> DELETE
  
  access --> Private [Admin]
  
```
http://localhost:5001/api/instructors/:id
```

<hr/>


### Memberships

- Get all memberships

  method --> GET
  
```
/api/memberships
```

- Get all VIP memberships (private training)

  method --> GET
  
```
/api/memberships/VIP/private-training
```

- Get specific membership by id

  method --> GET
  
```
/api/memberships/:id
```

- Add new membership

  method --> POST
  
  access --> Private [Admin]
  
```
/api/memberships
```

body {

title : {

en: type String,

ar: type String

},

description : {

en: type String,

ar: type String

}, 

duration: type String,

price: type String,

type: type String,  // should be one of these options: Normal, Silver, Gold, Diamond or VIP. // VIP is the private training memberships

points: type String
  
}

- Update membership

  method --> PUT
  
  access --> Private [Admin]
  
```
/api/memberships/:id
```

- Editor Update membership

  method --> PUT
  
  access --> Private [Editor]
  
```
/api/memberships/editor/:id
```


- Delete membership

  method --> DELETE
  
  access --> Private [Admin]
  
```
/api/memberships/:id
```

<hr/>


### EatSmart

- Get all eatSmart Schedules

  method --> GET
  
```
/api/eat-smart
```

- Get specific eatSmart by id

  method --> GET
  
```
/api/eat-smart/:id
```

- Add new eatSmart schedule

  method --> POST
  
  access --> Private [Admin]
  
```
/api/eat-smart
```

body {

title : {

en: type String,

ar: type String

},

description : {

en: type String,

ar: type String

}, 

duration: type String,

price: type String,

type: type String,  // should be one of these options: Weekly or Monthly

points: type String
  
}

- Update eatSmart

  method --> PUT
  
  access --> Private [Admin]
  
```
/api/eat-smart/:id
```

- Editor Update eatSmart

  method --> PUT
  
  access --> Private [Editor]
  
```
/api/eat-smart/editor/:id
```


- Delete eatSmart

  method --> DELETE
  
  access --> Private [Admin]
  
```
/api/eat-smart/:id
```

<hr/>


### About

- Get about

  method --> GET
  
```
/api/about
```

- Add about

  method --> POST
  
  access --> Private [Admin or Editor]
  
```
/api/about
```

body {

drBulkSpotlit : {

en: type String,

ar: type String

},

gymAbout : {

en: type String,

ar: type String

},

image: String // optional
  
}


<hr/>


### Orders

- Create order

  method --> POST
  
  access --> Private [User]
  
```
/api/orders
```

body {

items: [ // type Array of objects

{
        
productId: type ObjectId,
            
quantity: type Number
            
}
        
],

bill: type Number,

paymentMethod: type String // 'COD' (cash on delivery) or 'CC' (credit card or pay online)

}


- Get Orders

  method --> GET
  access --> Private [Admin]
  
```
/api/orders
```

- Get User Orders

  method --> GET
  access --> Private [User]
  
```
/api/orders/user-orders
```

- Get Order By Id

  method --> GET
  
```
/api/orders/:id
```


<hr/>


### Book Membership

- User book membership

  method --> POST
  
  access --> Private [User]
  
```
/api/book-membership
```

body {

membershipId: type ObjectId,

startsAt: type Date, // default = at time of booking

paymentMethod: type String // 'COD' (cash on delivery) or 'CC' (credit card or pay online)

}


- Get membership bookings

  method --> GET
  access --> Private [Admin]
  
```
/api/book-membership
```

- Get User membership

  method --> GET
  access --> Private [User]
  
```
/api/book-membership/user-booking
```

- Get membership booking By Id

  method --> GET
  
```
/api/book-membership/:id
```


<hr/>


### Book Eat Smart Plan

- User book Eat Smart Plan

  method --> POST
  
  access --> Private [User]
  
```
/api/book-eat-smart
```

body {

eatSmartId: type ObjectId,

paymentMethod: type String // 'COD' (cash on delivery) or 'CC' (credit card or pay online)

}


- Get eat smart bookings

  method --> GET
  access --> Private [Admin]
  
```
/api/book-eat-smart
```

- Get User eat smart plan

  method --> GET
  access --> Private [User]
  
```
/api/book-eat-smart/user-booking
```

- Get eat smart booking By Id

  method --> GET
  
```
/api/book-eat-smart/:id
```
