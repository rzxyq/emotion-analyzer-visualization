 // global variables. Saved as long as session doesn't end

RadarChart.defaultConfig.color = function() {};
RadarChart.defaultConfig.radius = 10;
RadarChart.defaultConfig.w = 800;
RadarChart.defaultConfig.h = 800;

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

var anger_agg=0;
var disgust_agg=0;
var sadness_agg=0;
var fear_agg=0;
var joy_agg=0;
var docEmotions = '';


// events
  $("#button").click(function(){

    var text = $('#textarea').val();
  
  var data2 = {
      apikey: 'REPLACE BY YOUR API KEY',
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
                        anger_agg+=parseFloat(anger);
                        var disgust = docEmotions.disgust;
                        disgust_agg+=parseFloat(disgust);
                        var sadness = docEmotions.sadness;
                        sadness_agg+=parseFloat(sadness);
                        var fear = docEmotions.fear;
                        fear_agg+=parseFloat(fear);
                        var joy = docEmotions.joy;
                        joy_agg+=parseFloat(joy);
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
var svg = d3.select('div').append('svg')
  .attr('width', 800)
  .attr('height', 800);

console.log(anger_agg,joy_agg,fear_agg,sadness_agg,disgust_agg);
var data_agg = [{
       className: 'agg',
        axes: [
          {axis: "anger", value:anger_agg,yOffset: 10},
          {axis: "disgust", value: disgust_agg}, 
          {axis: "sadness", value: sadness_agg},  
          {axis: "fear", value: fear_agg},  
          {axis: "joy", value: joy_agg, xOffset: -20}
        ]
}];
// draw one
svg.append('g').classed('focus', 1).datum(data_agg).call(chart);
  });


    RadarChart.draw(".chart-container", data);



//other possible emotion analysis apis
//https://shl-mp.p.mashape.com/webresources/jammin/emotionV2



