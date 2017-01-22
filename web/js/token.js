var app = angular.module("tokenPanelApp", []);
app.controller("mainCtrl", function ($scope, $q) {

    var self = this;

    self.checkedBalance = null;
    self.typedAddress = null;
    self.isSuccessfullySent = null;

    self.receipent = null;
    self.amount = null;

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

    function issue(amount) {
        var d = $q.defer();
        contract.issue(amount, {from: web3.eth.accounts[0]}, function (error, result) {
            if (!error) {
                console.log("Issued currency " + result);
                d.resolve(result);
            } else {
                console.error(error);
                d.reject(error);
            }
        });
        return d.promise;
    }

    function transfer(recipent, amount) {
        var d = $q.defer();
        contract.transfer(recipent, amount, {from: web3.eth.accounts[0]}, function (error, result) {
            if (!error) {
                console.log("Transferred currency " + result);
                d.resolve(result);
            } else {
                console.error(error);
                d.reject(error);
            }
        });
        return d.promise;
    }

    self.checkBalance = function () {
        checkBalance(self.typedAddress).then(function (result) {
            self.checkedBalance = result;
        }, function (reason) {
            console.error('Failed: ' + reason);
            self.checkedBalance = reason;
        });
    };

    self.transfer = function () {
        transfer(self.receipent, self.amount).then(function (result) {
            console.log("Result:" + result);
        }, function (reason) {
            console.error('Failed: ' + reason);
        });
    };

    self.pasteClientAddress = function () {
        self.typedAddress = web3.eth.accounts[0];
    };


    setTimeout(function () {
        contract = web3.eth.contract(abi).at(tokenAddress);
    }, 1000);

});