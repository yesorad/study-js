/**
 * 1. 폴더를 만들어서 이 파일을 넣는다.
 * 2. 터미널에 npm init  그다음 계속 엔터
 * 3. npm install prompt-sync
 * 4. node exam03 실행해보기
 */
const prompt = require('prompt-sync')();
let data = prompt('1. 전체메모 조회 2. 메모 입력 3. 메모 모두 삭제하기 0. 종료 : ');
console.log('입력한것은 : ',data);

const allList = []

class Paper {
    question(){
        let que = prompt('1. 전체메모 조회 2. 메모 입력 3. 메모 모두 삭제하기 0. 종료 : ');

        if(que === '1'){
            this.list();
        } else if(que === '2'){
            this.write();
        } else if(que === '3'){
            this.delete();
        } else if(que === '0') {
            false;
        } else {
            this.question();
        }
    }
    
    back(){
        let backBtn = prompt('0. 뒤로가기 : ');
        if(backBtn ==='0') {
            this.question();            
        } else {
            this.back();
        }
    }    

    list(){
        allList.forEach(function(item, index){
            console.log(`[${index+1}] : ${item}`);
        });

        if(!allList.length){
            console.log('메모가 없습니다')
        }

        this.back();
    }

    write(){
        let text = prompt('메모를 입력해주세요 : ');
        
        if (allList.length <= 4){
            allList.push(text);
        } else {
            allList.length = 5;
            console.log('최대 5개까지 추가 가능합니다.')
        }

        this.back();        
    }    

    delete(){
        if(allList.length){
            allList.splice(0, allList.length)
            console.log('삭제 되었습니다.')
        } else{
            console.log('메모가 없습니다')
        }           

        this.back();             
    }        
}

const note = new Paper();

    if(data === '1'){
        note.list();
    } else if(data === '2'){
        note.write();
    } else if(data === '3'){
        note.delete();
    } else if(data === '0') {
        false;
    } else {
        note.question();
    }



/*

과제 밑의 프로그램 만들어오기
클래스 꼭 안써도 괜찮음





------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 1




------------------------------------
메모가 없습니다
0. 뒤로가기
------------------------------------




------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 2


------------------------------------
메모 입력 : 123456


------------------------------------
1. 전체메모 조회
2. 메모 입력
3. 메모 모두 삭제하기
0. 종료
------------------------------------
메뉴 중 처리할 항목을 선택하세요 : 1



------------------------------------
[1] 123456
0. 뒤로가기
------------------------------------



- 전체메모 조회기능
메모 없으면 없다고 나오기

- 메모 입력하기 기능
메모는 최대 5개까지 입력가능
메모가 이미 5개면 입력 못한다는 문구 띄워주기

- 메모 모두 삭제
지금까지 작성한 메모 전부 삭제
작성한 메모가 없으면 없다는 문구 띄워주기


- 0을 입력받아 종료하기 전까지 계속 프로그램이 돌아가야함

 */