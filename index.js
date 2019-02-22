let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// app.post('/api/send-variables', (req, res) => {
//   let data = req.body;
//   dynamicSass([data['minRowHeight'], data['maxRowSpan'], data['numColumns'], data['gutter'], data['prefix']]).then(() => {
//     res.end();
//   });
// });

// app.get('/download', (req, res) => {
//   res.download(saveLoc, 'sgrid.css', () => {
//     fs.unlink(saveLoc);
//   });
// });

app.listen(3740);