const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// const multer = require('multer');
  // app.use(multer)
//게시판
// 단축 url로 다 통신하는 방법을 restfull api
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

/*
  request 요청
  response 응답
*/

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


app.get('/board', (req, res) => {
  const query = req.query;
  let result = {};
  if(query && query.no) {
    result = db.items.filter(row => row.no == query.no)[0] || null;
  }else {
    result = db.items
  }
  res.end(JSON.stringify(result));
  console.log(db.items)
});

app.put('/board', (req, res) => {
  const query = req.query;
  let result = false;
  this.db.items = this.db.items.map((row) => {
      if(row.no == query.no) {
          result = true;
          row.title = query.title;
          row.content = query.content;
      }
      return row;
  });
  res.end(JSON.stringify(result));
  return result;
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





// app.delete('/board');






// class BoardServer {
//   constructor() {

//   }
//   getBoardCount() {
//       return this.db.count;
//   }
//   insertBoard(data) {

//   }
//   retrieveBoard(reqNo) {
//       if(reqNo) {
//           return (this.db.items.filter(row => row.no == reqNo))[0];
//       }else {
//           return this.db.items;
//       }
//   }
//   updateBoard(data) {
//       let result = false;
//       this.db.items = this.db.items.map((row) => {
//           if(row.no == data.no) {
//               result = true;
//               row.title = data.title;
//               row.content = data.content;
//           }
//           return row;
//       });
//       return result;
//   }
//   deleteBoard(reqNo) {
//       let result = false;
//       this.db.items = this.db.items.filter((row) => {
//           if(row.no == reqNo) {
//               this.db.count = this.db.count - 1;
//               result = true;
//               return false;
//           }
//           else return true;
//       });
//       return result;
//   }
// }