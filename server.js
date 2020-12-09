const express = require('express')
const app = express()
const port = 80

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('client.html', {
        root: __dirname + '/public/html'
    });
})
app.get('/ImagingStudy', (req, res) => {
  res.sendFile('ImagingStudy.html', {
      root: __dirname + '/public/html'
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
