pragma solidity ^0.4.0;

contract DocumentLedger {
    
    address creator;
    
    mapping(address => bool) permissionedAdministrators;
    address[] public documents;
    
    function DocumentLedger() {
        creator = msg.sender;
    }
    
    function addAdministrator(address administrator) onlyCreator {
        permissionedAdministrators[administrator] = true;
    }
    
    function submitForm(string documentType, string payload) {
        documents.push(new Document(msg.sender,documentType,payload));
    }
    
    function approveForm(address formAddress) onlyAdministrator {
        Document doc = Document(formAddress);
        doc.approve();
    }
    
    function rejectForm(address formAddress) onlyAdministrator {
        Document doc = Document(formAddress);
        doc.reject();
    }
    
    modifier onlyCreator {
        if(msg.sender != creator) throw;
        _;
    }
    
    modifier onlyAdministrator {
        if(!permissionedAdministrators[msg.sender]) throw;
        _;
    }
}

contract Document {
    
    address creator;
    address citizen;
    string public documentType;
    string public payload;
    bool public approved;
    bool public rejected;
    
    function Document(address _citizen, string _documentType, string _payload) {
        creator = msg.sender;
        citizen = _citizen;
        documentType = _documentType;
        payload = _payload;
        approved = false;
        rejected = false;
    }
    
    function approve() onlyCreator {
        approved = true;    
    }
    
    function reject() onlyCreator {
        rejected = true;    
    }
    
    modifier onlyCreator {
        if(msg.sender != creator) throw;
        _;
    }
}