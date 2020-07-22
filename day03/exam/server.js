const app = require('express')();
// app.use(require('body-parser')).json();

const db = {
  count : 0,
  items : [],
  sequence : (function(){
    let result = 1;
    return function(){
      return result++;
    }
  })()
}

// create (쓰기)
app.post('/board', (req, res) => {
  const data = req.body.data;
  db.count = db.count + 1;
  db.items.push({
    no: db.sequence(),
    title: data.title,
    writer: data.writer,
    content: data.content
  });
  res.end();
});

// retrieve (읽기)
app.get('/board', (req, res) => {
  const query = req.query;
  let result = {};
  if(query && query.no) {
    reuslt = db.items.filter(row => row.no == query.no)[0] || false;
  } else {
    result = db.items
  }
  res.end(JSON.stringify(result))
})

app.put('/board', (req, res) => {
  const data = req.body.data;
  let result = false;
  db.items = db.items.map((row) => {
    if(row.no == data.no) {
      result = ture;
      row.title = data.title;
      row.content = data.content;
    }
    return row;
  })
  res.end(JSON.stringify(result))
})