'use strict';

/**
 * @ngdoc function
 * @name d3LearningApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d3LearningApp
 */
angular.module('d3LearningApp')
  .controller('D3Ctrl', function ($scope) {

    $scope.previousRow = null;

    $scope.prepare = function (row) { 
      if (row.apartment.length == 0)
          return null;        

      row.building = row.apartment.split('-').slice(1, 3).join('-');
      row.num_of_rooms = Number(row.num_of_rooms);
      
      row.room_len = 0;
      row.room_number = 0;
      
      var previous = $scope.previousRow;

      if (previous != null && previous.floor == row.floor) {
        row.room_len = previous.room_len + previous.num_of_rooms;
        row.room_number = previous.room_number + 1;
      }

      $scope.previousRow = row;

      return row;
    };

    var margin = {top: 50, right: 0, bottom: 0, left: 0};

    var width = 700 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select('.d3-container').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
    var color = d3.scale.linear()
        .domain([0, 400000, 650000])
        .range(['white', 'green', '#020']);
    
    var size = 10;

    var buildingSize = { width: 200, height: 180 };

    d3.csv('http://d3-js.ru/data/Mirgorod-sales.csv', $scope.prepare,
      function (rows) {

        var nested = d3.nest()
            .key(function (d) { return d.building })
            .key(function (d) { return d.floor })
            .entries(rows);

        var buildingNames = d3.keys(nested).map(function (i) { return nested[i].key; });
        var buildingScaleX = d3.scale.ordinal()
            .domain(["ГП1-А", "ГП2-А", "ГП3-А", "ГП4-А", "ГП4-Б", "ГП4-В"])
            .rangeBands([0, buildingNames.length]);

        var area = svg.selectAll('g')
          .data(nested)
          .enter()
          .append('g')
          .attr('transform', function (d) {
            var b = d.key;
            var row = ["ГП1-А", "ГП2-А", "ГП3-А"].indexOf(b) == -1 ? 0 : 1;
            var col = 0;

            if (["ГП2-А", "ГП4-Б"].indexOf(b) != -1)
              col = 1;  

            if (["ГП3-А", "ГП4-В"].indexOf(b) != -1)
              col = 2;  

            return 'translate(' + col * buildingSize.width + ', ' + row * buildingSize.height + ')';

          });

        var building = area.selectAll('g')
          .data(function (d) { return d.values; })
          .enter()
          .append('g');

        var floor = building.selectAll('g')
          .data(function (d) { return d.values; })
          .enter()
          .append('g')
          .attr('transform', function (d) {
            var num_of_floors = ["ГП1-А", "ГП2-А", "ГП3-А"].indexOf(d.building) == -1 ? 10 : 17;
            var height = (num_of_floors + 1) * size;

            return 'translate(0, ' + (height - d.floor * (size + 1)) + ')'; 
          });

        floor.selectAll('rect')
          .data(function (d, i) {    
            return [d]; 
          })
          .enter()
          .append('rect')
          .attr('x', function(d) { return d.room_len * size + d.room_number; })
          .attr('width', function(d) { return size * d.num_of_rooms; })
          .attr('height', function(d) { return size; })
          .attr('fill', 'gray')
        
         
      });   
  
});
