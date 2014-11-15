'use strict';

describe('Controller: D3Ctrl', function () {

  // load the controller's module
  beforeEach(module('d3LearningApp'));

  var D3Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    D3Ctrl = $controller('D3Ctrl', {
      $scope: scope
    });
  }));

  it('call function', function () {
    var inputRows = [{'apartment':'М-ГП1-А-001','floor':'1','num_of_rooms':'2','area':'54.86','layout':'1КЛ2СТ','price':'3,000,000','price_for_m2':'54685','status':'продана','sale_price':'3,000,000','discount':'','obtained_funds':'2,400,000','balance':'600,000'},
                      {'apartment':'М-ГП1-А-002','floor':'1','num_of_rooms':'3','area':'74.37','layout':'ТСС123ЛК','price':'3,600,000','price_for_m2':'48407','status':'','sale_price':'','discount':'','obtained_funds':'','balance':''},
                      {'apartment':'М-ГП1-А-003','floor':'1','num_of_rooms':'2','area':'55.33','layout':'СКЛ12','price':'3,000,000','price_for_m2':'54220','status':'','sale_price':'','discount':'','obtained_funds':'','balance':''},
                      {'apartment':'М-ГП1-А-007','floor':'2','num_of_rooms':'2','area':'54.86','layout':'1КЛ2СТ','price':'3,200,000','price_for_m2':'58330','status':'продана','sale_price':'3,200,000','discount':'','obtained_funds':'2,100,000','balance':'1,100,000'},
                      {'apartment':'М-ГП1-А-008','floor':'2','num_of_rooms':'3','area':'74.37','layout':'ТСС123ЛК','price':'3,800,000','price_for_m2':'51096','status':'продана','sale_price':'3,800,000','discount':'','obtained_funds':'3,200,000','balance':'600,000'},
                      {'apartment':'М-ГП1-А-009','floor':'2','num_of_rooms':'2','area':'55.33','layout':'СКЛ12','price':'3,200,000','price_for_m2':'57835','status':'продана','sale_price':'3,170,000','discount':'30,000','obtained_funds':'2,900,000','balance':'270,000'}];
    


    expect(scope.test(inputRows)).toBe(1);
  });

});
