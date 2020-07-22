class React {
  setState(data) {
    if(!this.state) {
      this.state = [];
    }
    for(let key of Object.keys(data)) {
      this.state[key] = parseInt(data[key])
    }
  }
  render() {
    for(let key of Object.keys(this.state)) {
      console.log(this.state[key]);
    }
  }
}

class Component extends React {
  thisState(){
    console.log(this.state)
  }
  sum(){
    console.log(`더하기 : ${this.state[0] + this.state[1]}`)
  }
  minus(){
    console.log(`빼기 : ${this.state[0] - this.state[1]}`)
  }
  multiply(){
    console.log(`곱하기 : ${this.state[0] * this.state[1]}`)  
  }
  division(){
    console.log(`나누기 : ${this.state[0] / this.state[1]}`)
  }
  oddEven(){
    const num = this.state[0];
    if(num%2 == 0){
      console.log(`${num} 은 짝수 입니다.`)
    } else {
      console.log(`${num} 은 홀수 입니다.`)
    }
  }
  goo(){
    for(let i=0; i<=9; i++){
      console.log(`${this.state[0]} x ${i} = ${this.state[0]*i} `)
    }
  }

  
}

/**
 * 1. 리액트 상속받는 클래스 만들기
 * 2. 숫자 집어넣기
 * 3. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 더하는 함수
 * 4. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 곱하는 함수
 * 5. 숫자를 하나 더 집어넣어서 기존에 집어넣은 숫자와 나누는 함수
 * 6. 기존에 집어넣은 숫자가 짝수인지 홀수인지 구하는 함수
 * 7. 기존에 집어넣은 숫자의 구구단
 *
 * 주의사항 setNum getNum 세터/게터 사용하지말고 setState 사용하기
 * 만드는 함수에는 매개변수 받지말기
 */


  const test = new Component();
  test.setState({'0' : '7'});
  test.render();
  test.setState({'1' : '5'});
  test.sum(); 
  test.minus();  
  test.multiply(); 
  test.division();
  test.oddEven();
  test.goo()
