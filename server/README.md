# Node Server

Live API at https://foodme-199118.appspot.com/

### To run local mongo DB
Create database location if not previously done `md \data\db`

Start Mongo Server on default port
`"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"`or using custom location
`"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath c:\test\mongodb\data`

### Start node server
`npm start` or `npm run dev` for nodemon automatic reloading

The server will be up on localhost:3000 or on environment variable PORT

