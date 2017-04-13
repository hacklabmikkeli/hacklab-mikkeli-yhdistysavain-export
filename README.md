# hacklab-mikkeli-yhdistysavain-export
Exports monthly subscribers from yhdistysavain.fi and converts them to format compatible with door lock

### Requirements

- PhantomJS
- CasperJs
- NodeJS

### Installation 

Install the dependencies:

- `sudo npm install -g phantomjs casperjs`
- `npm install`


Create file config.json
```
{
  "username": "your-user-name@example.com",
  "password": "yourpassword",
  "exporturl": "url-to-download-the-export-from"
}
```
### Usage

Run with:

- `node index.js`
