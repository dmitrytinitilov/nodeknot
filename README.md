![nodeknot logo](/nodeknot_sm.gif)

# Installation

To install use 

```cmd
git clone https://github.com/dmitrytinitilov/nodeknot.git
```
then 

```cmd
npm i
```
for installing nodejs modules

Don't forget start mongodb

```cmd
mongod --dbpath C:\mongodb\data --port 27017
```

Finally to start a server

```cmd
node server.js
```

# API

for registration use

```
yourdomain.com/api/register
```

with login and password parameters

to sign in use

```
yourdomain.com/api/login
```
with login and password parameters

to logout

```
yourdomain.com/api/logout
```

To get list of post

```
yourdomain.com/api/get_posts
```

to add post 

```
yourdomain.com/api/add_post
```

with name and description








