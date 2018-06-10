//Get the bikes.json file
var bikeJSON = require('../bikes.json');
//console.log("Check the sample data",  Object.keys(bikeJSON.items).length); 	//Confirm file content.
//console.log("Check the sample data",  bikeJSON); 				//Confirm file content.

describe('BikeStore integration suite', function() {

 //       it('should work', function () {
 //           browser.get(browser.baseUrl);
 //           expect(true).toBe(true);
 //           expect(browser.getTitle()).toEqual('Bike Store');
 //	});


  beforeEach(function() {
    browser.get(browser.baseUrl);
  });
//////////////////////////////////////////////////////
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Bike Store');
  });
//////////////////////////////////////////////////////
  //Check that the number of bikes returned by the app 
  //is the same as the number of bikes in the JSON file.
  it('See list or grid of bikes', function() {

    var products = element.all(by.repeater('p in filteredProducts'));

    var countJSONBikes = Object.keys(bikeJSON.items).length;    
    expect(countJSONBikes).toEqual(7); //sanity check to ensure that we are getting 7 bikes

    expect(products.count()).toEqual(countJSONBikes); 
  });
//////////////////////////////////////////////////////
  //Check that the bikes appear as a list or grid.
  //Here, the product list class definition is checked to ensure that it can switch between a grid and a list.
  it('See list or grid of bikes', function() {

    ////Container-fluid seems relevant to layout management. Initially I wanted to include this in the test,
    ////but Im not sure how relevant it actually is.
    //var containerClassName = element(by.tagName('body')).getAttribute('class');
    //expect(containerClassName).toMatch(/container-fluid/); 

    var productsClassName = element(by.repeater('p in filteredProducts')).getAttribute('class');
    expect(productsClassName).toMatch(/col-sm-4/); 	//this class value ensures layout is set according to screen width.

  });
//////////////////////////////////////////////////////
  it('For each bike: name is defined', function() {

    //Test
    //var x = element.all(by.binding('p.name'));
    //  x.getText().then(function (text) {
    //  console.log(text);
    //});

    var x = element.all(by.binding('p.name'));
    x.each(function(element, index) {
      element.getText().then(function (text) {
      //console.log(index, text);
      expect(text).toBeDefined();
      });
    });

  });
//////////////////////////////////////////////////////
  it('For each bike: class is defined', function() {

    var x = element.all(by.binding('c'));
    x.each(function(element, index) {
      element.getText().then(function (text) {
      //console.log(index, text);
      expect(text).toBeDefined();
      });
    });

  });
//////////////////////////////////////////////////////
  it('For each bike: description is defined, class', function() {

    var x = element.all(by.binding('p.description'));
    x.each(function(element, index) {
      element.getText().then(function (text) {
      //console.log(index, text);
      expect(text).toBeDefined();
      });
    });

  });

//////////////////////////////////////////////////////
  it('For each bike: image is defined', function() {

    var x = element.all(by.binding('p.image.thumb'));
    x.each(function(element, index) {
      element.getText().then(function (text) {
      //console.log(index, text);
      expect(text).toBeDefined();
      });
    });

  });
//////////////////////////////////////////////////////
  it('Filter based on class: Endurance', function() {

    var filters = element.all(by.repeater('df in dataFilters | filter:{ key: attr }'));
    //filters.each(function(element, index) {
    //      element.getText().then(function (text) {
    //      console.log(index, text);
    //      //expect(text).toBeDefined();
    //      });
    //    });

    var checkBoxes = filters.all(by.tagName('input'));
    //checkBoxes.each(function(element, index) {
    //      element.evaluate("df.value").then(function (text) {
    //      console.log(index);
    //      //expect(text).toBeDefined();
    //      });
    //    });
////
//    var checkSelected = checkBoxes.filter(function(elem, index) {
 //       return elem.evaluate("df.value").then(function(value) {
 //       return value === 'endurance';
 //   });
 //   }).first();


//
    var checkSelected = checkBoxes.filter(function(elem, index) {
        return elem.evaluate("df.value").then(function(value) {
        return value === 'endurance';
    });
    }).first().then(function(value) {
        if(!value.isSelected()){
        value.click();
	}
    });
//////
//    var products = [];
//    if(!checkSelected.isSelected()){
 //       checkSelected.click();
//    var products = element.all(by.repeater('p in filteredProducts'));
//    expect(products.count()).toEqual(6);
//    }

 //expect(checkSelected).toBe(true);

//    var products = element.all(by.repeater('p in filteredProducts'));
 //   expect(products.count()).toEqual(6);

////
//    var checkSelected = checkBoxes.filter(function(elem, index) {
//        return elem.evaluate("df.value").then(function(value) {
//        return value === 'endurance';
//    });
//    }).first();

//checkSelected.then()(function(x) {
//          if(!x.isSelected()){
//          x.click();

//    }
//        });;
//          var products = element.all(by.repeater('p in filteredProducts'));
//          expect(products.count()).toEqual(6);
////
 // });
//////////////////////////////////////////////////////


});