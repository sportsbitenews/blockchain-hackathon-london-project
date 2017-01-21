var app = angular.module("adminPanelApp", []);
app.controller("mainCtrl", function ($scope, $q) {

    var self = this;

    self.formsSchemas = {
        "p90": [{
            "name": "tax amount",
            "type": "number"
        },
            {
                "name": "tax name",
                "type": "checkbox"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "date2",
                "type": "date"
            }
        ]
    };

    self.documents = [];
    self.idOfChosenForm = 0;

    self.inputsForm = [];

    var documentLedgerAddress = "0xebaf2382dfe8f5722eb62e79e5630bf71a452275";

    var documentLedgerAbi = [{
        "constant": false,
        "inputs": [{"name": "documentType", "type": "string"}, {"name": "payload", "type": "string"}],
        "name": "submitForm",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "formAddress", "type": "address"}],
        "name": "approveForm",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "uint256"}],
        "name": "documents",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "administrator", "type": "address"}],
        "name": "addAdministrator",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "formAddress", "type": "address"}],
        "name": "rejectForm",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {"inputs": [], "payable": false, "type": "constructor"}]

    var documentAbi = [{
        "constant": false,
        "inputs": [],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "approved",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "citizen",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "reject",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "payload",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "documentType",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "rejected",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "inputs": [{"name": "_citizen", "type": "address"}, {
            "name": "_documentType",
            "type": "string"
        }, {"name": "_payload", "type": "string"}], "payable": false, "type": "constructor"
    }]

    var documentLedger = undefined;


    function extractField(contract, fieldName) {
        console.log("Extracting field " + fieldName);
        var d = $q.defer();
        contract[fieldName].call(function (error, result) {
            if (!error) {
                console.log("Retireved field " + fieldName + " value:" + result);
                d.resolve(result);

            } else {
                console.error(error);
                d.reject(error);
            }
        });
        return d.promise;
    }


    function loadDocument(index) {
        documentLedger.documents.call(index, function (error, result) {
            if (!error) {
                console.log("Retrieved document of index " + index + " :" + result);
                if (result != "0x") {
                    console.log(result)
                    var obtainedDocumentFromContract = web3.eth.contract(documentAbi).at(result);
                    var tableRow = {};
                    //Document fields
                    var fields = ["citizen", "documentType", "payload", "approved", "rejected"];
                    fields.forEach(function (fieldName) {
                        extractField(obtainedDocumentFromContract, fieldName).then(function (value) {
                            tableRow[fieldName] = fieldName != "payload" ? value : value.split(";");
                        });
                    });
                    self.documents.push(tableRow);
                    loadDocument(++index)
                }
            } else {
                console.error(error);
            }
        })
    }


    setTimeout(function () {
        documentLedger = web3.eth.contract(documentLedgerAbi).at(documentLedgerAddress);
        loadDocument(0);
    }, 1000);

    self.addInput = function (type, name) {
        console.log(name)
        if (name == undefined) {
            name = "null";
        }
        self.inputsForm.push({
            "name": name,
            "type": type
        });
        self.name = undefined;
    };

    self.removeInput = function (index) {
        self.inputsForm.splice(index, 1);
    };

    self.approveForm = function () {
        web3.eth.contract(documentAbi).at("0xcb1d8464edb698c61f48f33ec88898eb0750ffc8").approve({from: web3.eth.accounts[0]}, function (error, result) {
            if (!error) {
                console.log("resuts for submission:" + result)
            } else {
                console.error(error);
            }
        });

    };

});