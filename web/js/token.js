var app = angular.module("tokenPanelApp", []);
app.controller("mainCtrl", function ($scope, $q) {

    var self = this;

    self.checkedBalance = null;

    var tokenAddress = "0xb18e61ca629a8fa039088b271d48c034bb8dfb69";
    var abi = [{
        "constant": true,
        "inputs": [{"name": "", "type": "address"}],
        "name": "balances",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "recipent", "type": "address"}, {"name": "amount", "type": "uint256"}],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "amount", "type": "uint256"}],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {"inputs": [], "payable": false, "type": "constructor"}];

    var contract = undefined;

    function checkBalance(address) {
        console.log("Checking balance for " + address);
        var d = $q.defer();
        contract.balances.call(address, function (error, result) {
            if (!error) {
                console.log("Balance is " + result)
                d.resolve(result);
            } else {
                console.error(error);
                d.reject(error);
            }
        });
        return d.promise;
    }

    function issue(amount, callback) {
        contract.issue(amount, {from: web3.eth.accounts[0]}, function (error, result) {
            if (!error) {
                console.log("Issued currency " + result);
                callback(result);
            } else {
                console.error(error);
            }
        })
    }

    function transfer(recipent, amount, callback) {
        contract.transfer(recipent, amount, {from: web3.eth.accounts[0]}, function (error, result) {
            if (!error) {
                console.log("Transferred currency " + result);
                callback(result);
            } else {
                console.error(error);
            }
        })
    }

    self.checkBalance = function (address) {


    }

    setTimeout(function () {
        contract = web3.eth.contract(abi).at(tokenAddress);
        checkBalance(tokenAddress).then(function (result) {
            self.checkedBalance = result;
        });
    }, 1000);

});