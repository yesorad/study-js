/**
 * 1. 폴더를 만들어서 이 파일을 넣는다.
 * 2. 터미널에 npm init  그다음 계속 엔터
 * 3. npm install prompt-sync
 * 4. node exam03 실행해보기
 */
// const prompt = require('prompt-sync')();
// let data = prompt('아무거나 입력해주세요 : ');
// console.log('입력한것은 : ',data);

class MemoServer {
    constructor() {
        this.db = {
            count : 0,
            items : []
        }
    }
    getMemoCount() {
        return this.db.count;
    }
    insertMemo(title, name, content) {
        this.db.count = this.db.count + 1;
        this.db.items.unshift({index: this.db.count, title: title, name: name, content: content});
    }
    retrieveMemo() {
        return this.db.items;
    }
    searchMemo(searchData) {
        return this.db.items.filter(item => item.index == searchData);
    }
    deleteMemo(searchNum) {
        this.db.items.splice(searchNum, 1);
        this.getMemoCount().length -1;
    }
}

class MemoFront {
    constructor() {
        const prompt = require('prompt-sync')();
        this.server = new MemoServer();
        this.input = () => prompt('메뉴 중 처리할 항목을 선택하세요 : ');
        this.titleInput = () => prompt('제목을 입력하세요 : ');
        this.nameInput = () => prompt('글쓴이를 입력하세요 : ');;
        this.memoInput = () => prompt('내용을 입력하세요 : ');
        this.searchInput = () => prompt('조회할 글번호를 입력하세요 : ');
        this.createForm = this.createForm.bind(this);
        this.retrieveForm = this.retrieveForm.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.searchForm = this.searchForm.bind(this);
        this.modifyForm = this.modifyForm.bind(this);
    }

    header() {
        console.log('------------------------------------');
    }

    footer() {
        console.log('0. 뒤로가기');
        console.log('------------------------------------');
        while(true) {
            if(this.input() === '0') return true;
            console.log('잘못 입력하셨습니다.');
        }
    }

    index() {
        console.log(`
------------------------------------
1. 전체 게시글 조회
2. 글 번호 조회
3. 글 등록
4. 글 수정
5. 글 삭제
0. 종료
------------------------------------
    `);
        return this.input();
    }

    createForm() {
        this.header();
        if(this.server.retrieveMemo().length >= 5) {
            console.log('게시물이 가득찼습니다.');
        }
        else { 
            this.server.insertMemo(this.titleInput(), this.nameInput(), this.memoInput());
            console.log('게시글 등록이 완료되었습니다..');
        }
        return this.footer();
    }

    retrieveForm() {
        this.header();
        const memoLength = this.server.retrieveMemo().length;
        if(memoLength) {
            console.log(`
전체 ${memoLength} 개
------------------------------------
번호     글쓴이     제목
            `)
            this.server.retrieveMemo().forEach(item => {
                console.log(`
${item.index}     ${item.name}     ${item.content}
                `);
            })
        }
        else {
            console.log(`
전체 0 개            
------------------------------------            
번호     글쓴이     제목            
------------------------------------
게시물이 존재하지 않습니다.
            `);
        }
        return this.footer();
    }

    searchForm(){
        let searchData = this.searchInput();
        this.header();
        if(this.server.searchMemo(searchData).length){
            this.server.searchMemo(searchData).forEach(item => {                
                    console.log(`
번호 : ${item.index}
글쓴이 : ${item.name}
제목 : ${item.title}
내용 : ${item.content}          
                    `);                                      
            })        
        } else{
            console.log(`
입력된 번호는 존재하지 않습니다.
------------------------------------
            `)
        }                      

        return this.footer();
    }

    deleteForm() {
        let searchData = this.searchInput();
        this.header();
        const dataNum = parseInt(searchData);     
        const searchNum = this.server.getMemoCount() - dataNum;
        
        if(this.server.searchMemo(searchData).length){
            this.server.deleteMemo(searchNum);
            console.log('삭제되었습니다.')
        } else{
            console.log('입력된 번호는 존재하지 않습니다')            
        }

        return this.footer();
    } 

    modifyForm() {
        let searchData = this.searchInput();
        this.header();
        const dataNum = parseInt(searchData);     
        const searchNum = this.server.getMemoCount() - dataNum;

        if(this.server.searchMemo(searchData).length){
            this.server.retrieveMemo().splice(searchNum, 1, {index: dataNum, title: this.titleInput(), name: this.nameInput(), content: this.memoInput()})
        } else{
            console.log('입력된 번호는 존재하지 않습니다')            
        }        

        return this.footer();
    }       

    render() {
        let action = null;
        switch(this.index()) {
            case '1' : action = this.retrieveForm; break;
            case '2' : action = this.searchForm; break;
            case '3' : action = this.createForm; break;
            case '4' : action = this.modifyForm; break;
            case '5' : action = this.deleteForm; break;
            case '0' : return false; break;
            default : console.log('잘못 입력하셨습니다.'); return true;
        }
        return action();
    }
}

const user = new MemoFront();
let loop = true;
while(loop) {
    loop = user.render();
}



