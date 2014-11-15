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

    $scope.test = function (x) { return 2; };

    var margin = {top: 0, right: 0, bottom: 0, left: 60};

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
    
    var size = 15;

    d3.csv('http://d3-js.ru/data/Mirgorod-sales.csv',      
      function (row) {
        if (row.apartment.length == 0)
          return null;

        console.log(JSON.stringify(row));

        row.building = row.apartment.split('-').slice(1, 3).join('-');
        row.num_of_rooms = Number(row.num_of_rooms);

        return row;
      },
      function (rows) {
        
        var nested = d3.nest()
            .key(function (d) { return d.building })
            .key(function (d) { return d.floor })
            .entries(rows);

        console.log(nested[0].values);

        var rooms = nested[0].values[0];

        var floor = svg.selectAll('g')
          .data(function (d) { return rooms.values; })
          .enter()
          .append('g');

        floor.selectAll('rect')
          .data(function (d, i) {             
            var rooms = floor.data();
            d.room_len = i > 0 ? rooms[i - 1].room_len + rooms[i - 1].num_of_rooms : 0;
            d.room_number = i;
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
