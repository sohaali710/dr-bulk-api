# Dr-Bulk-API
Take an action to modify order state.
      
### To run the server :
###### In the production mode :

```
npm run prod
```

###### In the development mode :

```
npm run dev
```

## APIS

### Admin

- Login

  method --> POST
  
  access --> private [Admin]
```
http://localhost:5001/api/admin/login
```

- Logout

  method --> POST
  
  access --> private [Admin]
```
https://homey-ecommerce-api.onrender.com/admin/logout
```


<hr/>

### User

- User signup

  method --> POST
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/signup
```

- User login

  method --> POST
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/login
```

- User logout

  method --> POST
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/logout
```

- User logout from all sessions (devices) 

  method --> POST
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/logout-all
```

- Get user profile

  method --> GET
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/profile
```

- Update user profile

  method --> PUT
  
  access --> private [User]
```
https://homey-ecommerce-api.onrender.com/user/profile/update
```
