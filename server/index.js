const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// middleware
app.use(cors());
app.use('/api/posts', require('./routes/api/posts'));

// handle production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))