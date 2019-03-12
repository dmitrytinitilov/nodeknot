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

for registration use POST query

```
yourdomain.com/api/register
```

with login and password parameters

to sign in use POST query

```
yourdomain.com/api/login
```
with login and password parameters

to logout GET query

```
yourdomain.com/api/logout
```

To get list of post use GET query

```
yourdomain.com/api/get_posts
```

to add post , use POST query

```
yourdomain.com/api/add_post
```

with name and description








