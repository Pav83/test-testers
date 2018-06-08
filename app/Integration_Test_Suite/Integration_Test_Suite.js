describe("Integration test suite", function ()
{

	var $controller, $scope;

    beforeEach(module('bikeStore'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller = $controller('prodList', {$scope: $scope});
    }));
  

  it("See list or grid of bikes", function () 
  {
  
    //Get the list of bikes from JSON file
    var bikeJSON = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var bikeJSON = JSON.parse(this.responseText);
            //document.getElementById("demo").innerHTML = bikeJSON.name;
        }
    };
    xmlhttp.open("GET", "https://jujhar.com/bikes.json", true);
    xmlhttp.send(); 

    var countJSONBikes = Object.keys(bikeJSON).length;
  
    //Miscellaneous
    //expect($rootScope.products.length).toBeGreaterThan(0);
    //expect($rootScope.products).not.toBeUndefined();
    //expect(bikeJSON).not.toBeUndefined();

    expect($scope.products).not.toBeUndefined();    
    //Compare JSON bike count to controller bike count
    //expect($rootScope.products.length).toEqual(countJSONBikes);



  })
});

