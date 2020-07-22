const axios = require('axios');

const url = 'http://localhost:3000/board';
const prompt = require('prompt-sync')();

class BoardFront {
    
    constructor() {
        prompt.input = () => prompt('메뉴 중 처리할 항목을 선택하세요 : ');
        prompt.customInput = msg => prompt(msg);
        
    }
        
    header() {
        console.log('------------------------------------');
    }

    footer() {
        console.log('0. 뒤로가기');
        console.log('------------------------------------');
        while(true) {
            if(prompt.input() === '0') return true;
            console.log('잘못 입력하셨습니다.');
        }
    }

    index() {
        console.log(`
------------------------------------
1. 전체게시물 조회
2. 글 번호 조회
3. 글등록
4. 글수정
5. 글삭제
0. 종료
------------------------------------
    `);
        return prompt.input();
    }
    
    createForm() {
        // post
        axios.post(url,{data : {
            title: prompt.customInput('제목을 입력하세요 : '),
            writer: prompt.customInput('글쓴이를 입력하세요 : '),
            content: prompt.customInput('내용을 입력하세요 : ')
        }}).then(result => console.log(result.data));    
    }

    retrieveAllForm() {
        // get
        axios.get(url).then(result => console.log(result.data))
//             console.log(
// `전체 ${result.data}개            
// ------------------------------------
// 번호       글쓴이      제목
// ------------------------------------                        
// ${result.data}   ${result.data}   ${result.data}`            
//             ));
    }

    retrieveForm() {
        let dataNum = prompt.customInput('조회할 번호를 입력하세요 : ')
                
        // get no
        axios.get(`${url}?no=${dataNum}`).then(result => console.log(result.data));
    }

    updateForm() {
        // update
        axios.put(url,{data : {
            title: prompt.customInput('제목을 입력하세요 : '),
            writer: prompt.customInput('글쓴이를 입력하세요 : '),
            content: prompt.customInput('내용을 입력하세요 : ')
        }}).then(result => console.log(result.data));
    }

    deleteForm() {
        // delete
        // axios.delete() =====
    }

    render() {
        let action = null;
        switch(this.index()) {
            case '1' : action = this.retrieveAllForm; break;
            case '2' : action = this.retrieveForm; break;
            case '3' : action = this.createForm; break;
            case '4' : action = this.updateForm; break;
            case '5' : action = this.deleteForm; break;
            case '0' : return false; break;
            default : console.log('잘못 입력하셨습니다.'); return true;
        }
        return action();
    }    

}

const user = new BoardFront();
let loop = true;
while(loop) {
    loop = user.render();
}





