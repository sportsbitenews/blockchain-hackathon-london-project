pragma solidity ^0.4.0;
 
contract Token {
   
    address bank;
   
    mapping(address => uint) public balances;
    
    function Token() {
        bank = msg.sender;
    }
   
    function issue(uint amount) {
        balances[bank] += amount;
    }
   
    function transfer(address recipent, uint amount) {
        uint balance = balances[msg.sender];
        if(amount > balance) {
            //Not enough funds!
            throw;
        }
        balances[msg.sender] -= amount;
        balances[recipent] += amount;
    }
}
