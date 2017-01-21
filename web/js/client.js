angular.module('App', ['ngSanitize','ui.select'])
   .controller('ClientController', function() {
	var self = this; 

	self.allForms = {
					forms: [{
						"name": "p90",
						"fields": [
							{
								"name": "tax amount",
								"type": "number"
							},
							{
								"name": "tax name",
								"type": "checkbox"
							}, {
								"name": "date",
								"type": "date"
							}, {
								"name": "date2",
								"type": "date"
							}
						]
					},{
						"name": "p100",
						"fields": [
							{
								"name": "tax amount",
								"type": "number"
							},
							{
								"name": "tax amount",
								"type": "checkbox"
							}, {
								"name": "tax amount",
								"type": "number"
							}
						]
					}]
				};

	function activate(){
		 self.formName = {};
		 self.formNames = self.allForms.forms.map(function(obj){
			return {"name": obj.name}
		});
		self.title=self.formNames[0].name;
		self.choices=self.allForms.forms.find(function(obj){
			return obj.name == self.formNames[0].name;
		});
		self.formName.selected=self.formNames[0];
	}
	activate();
	
	
	
	self.onSelectCallback = function (item){
		self.title=item.name;
		self.choices=self.allForms.forms.find(function(obj){
			return obj.name == item.name;
		})
  	};
	
});