 RadarChart.defaultConfig.color = function() {};
RadarChart.defaultConfig.radius = 10;
RadarChart.defaultConfig.w = 400;
RadarChart.defaultConfig.h = 400;

 
var data = [  {
                          className: 'generic',
                          axes: [
                            {axis: "anger", value: 0.0001,yOffset: 10}, 
                            {axis: "disgust", value: 0.0001}, 
                            {axis: "sadness", value: 0.0001},  
                            {axis: "fear", value: 0.0001},  
                            {axis: "joy", value: 0.0001, xOffset: -20}
                          ]
                        }];


  var docEmotions = '';
  $("#button").click(function(){

    var text = $('#textarea').val();
  
  var data2 = {
      apikey: 'cd204fe27efdf0a2a8a738ed890c9d356420902e',
      text: text,
      outputMode: 'json'
  };
  var url = 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion';

    console.log(text);
    $.ajax({
        dataType: "json",
        url: url,
        data: data2,
        success: function(result) {

                        console.log(result);

                        console.log(result.docEmotions);
                        docEmotions = result.docEmotions;
                        

                        var anger = docEmotions.anger;
                        var disgust = docEmotions.disgust;
                        var sadness = docEmotions.sadness;
                        var fear = docEmotions.fear;
                        var joy = docEmotions.joy;
                        var name = 'generic';

                        var max = Math.max(anger, disgust, sadness, fear, joy);
                        if (max==anger) {
                          name='anger';
                        } else if (max==joy) {
                          name = 'joy';
                        } else if (max==sadness) {
                          name='germany';
                        } else if (max==fear) {
                          name='green';
                        }
                        sentiments = data.push({
                            className: name,
                            axes: [
                              {axis: "anger", value:anger},
                              {axis: "disgust", value: disgust}, 
                              {axis: "sadness", value: sadness},  
                              {axis: "fear", value: fear},  
                              {axis: "joy", value: joy}
                            ]
                        });
                        console.log(data);
                        RadarChart.draw(".chart-container", data);

          }//end of success callback
    }); //end of ajax
  });

$("#agg").click(function(){
      var chart = RadarChart.chart();
      var svg = d3.select('body').append('svg')
        .attr('width', 600)
        .attr('height', 800);

      // draw one
      svg.append('g').classed('focus', 1).datum(data).call(chart);

      // draw many radars
      var game = svg.selectAll('g.game').data(
        [
          data,
          data,
          data,
          data
        ]
      );
      game.enter().append('g').classed('game', 1);
      game
        .attr('transform', function(d, i) { return 'translate(150,600)'; })
        .call(chart);
        
  });

    RadarChart.draw(".chart-container", data);