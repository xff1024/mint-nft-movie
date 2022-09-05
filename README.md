# Publish to IPNS from the browser!
- npm install -g ipfs
- jsipfs init
- jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"*\"]'
- jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials true
- jsipfs daemon
- 具体使用，可查看[文档](https://docs.ipfs.tech/basics/js/js-ipfs/#install-js-ipfs)

```
   +-----------+     websocket     +-----------+
   |           +------------------->           |
   |  js-ipfs  |      pubsub       |  go-ipfs  |
   |           <-------------------+           |
   +-----^-----+                   +-----^-----+
         |                               |
         | IPFS in browser               | HTTP API
         |                               |
+-------------------------------------------------+
|                     Browser                     |
+-------------------------------------------------+
|                   |         |                   |
|                   |         |                   |
|  IPFS direct      |         |  js-http-client   |
|  a.k.a. ipfsNode  |         |  a.k.a. ipfsAPI   |
|                   |         |                   |
+-------------------------------------------------+
```

# Available Scripts

In the project directory, you can run:

#### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Config

### `src\services\constant.js` 
- BASIC_IMAGE_URL
- API_KEY
- AUTH_TOKEN
- API_HOST

### `src\constant.js`
- ChainId
- NETWORK_CONFIG
- CONSTACTS_ADDRESS
- IPFS_URL