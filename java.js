var pointsPromise= d3.csv("CareerPoints.csv")

var assistsPromise = d3.csv("CareerAssists.csv")

var stealsPromise = d3.csv("CareerSteals.csv")

var reboundsPromise = d3.csv("CareerRebounds.csv")




var screen = {width:1000,height:700}
var margins = {top:10,right:25,left:35,bottom:50}



var success = function(data)
{
    console.log(data) 
    
    var FinalPoints = data.map(getFinalPoints)
    console.log(FinalPoints)
    PointsSetup(FinalPoints)
    
}
var fail = function(data)
{
    console.log("fail", data)
}



// Transforming Points into point differential v


var getFinalPoints = function(d)
{
       var getLebronPoints = function(d)
    {
        return parseFloat(d.LebronPoints)
    }
       
    var getJordanPoints = function(d)
    {
        return parseFloat(d.MJPoints)
    }
        
    var newData = getLebronPoints(d)-getJordanPoints(d)
    return newData
}


var PointsSetup = function(LebronPoints)
{
    var pen = d3.range(0,15)
    
    d3.select("svg *").remove()
    d3.select("svg")
      .attr("width",screen.width)
      .attr("height",screen.height)
      .append("g")
      .attr("id","graph")
      .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;

    var xScale = d3.scaleLinear()
                   .domain([0,15])
                   .range([0,width])
    var yScale = d3.scaleLinear()
                    .domain([-10,10])
                    .range([height,0])
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    
    d3.select("svg")
      .append("g")
      .classed("axis",true)
    
    d3.select(".axis")
      .append("g")
      .attr("id","xAxis")
      .attr("transform","translate("+margins.left+","+(margins.top+yScale(0))+")")
      .call(xAxis)
    
    d3.select(".axis")
      .append("g")
      .attr("id","yAxis")
      .attr("transform","translate(25, "+margins.top+")")
      .call(yAxis)
    
    drawPoints(LebronPoints, 0, xScale, yScale)
    
}

var drawPoints = function(data, index, xScale, yScale)
{
    d3.selectAll("circle").remove()
    d3.selectAll("#Graph *").remove()
    var arrays = d3.select("#graph")
                   .selectAll("g")
                   .data(data)
                   .enter()
                   .append("g")
                   .attr("fill","none")
                   .attr("stroke","black")
                   .attr("stroke-width", 3)
                   .attr("class","line")
    
    var lineGenerator = d3.line()
                          .x(function(num,index){console.log(index)
                                                 return xScale(index)})
                          .y(function(num){console.log(num)
                                           return yScale(num)})
                          .curve(d3.curveNatural)
    arrays.append("path")
        .datum(data)
        .attr("d",lineGenerator)
    
   
    var arrays3 = d3.select("#graph")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",function(q,i){ return xScale(i)})
        .attr("cy",function(q){return yScale(q)})
        .attr("r",5)
        .on("mouseover", function(d,i){
            
            d3.select(".display")
                .append("div")
                .classed("info", true)
                .text(d)
                .style("left", d3.event.pageX + "px")
                .style("top", (d3.event.pageY-30) + "px")

         
            
          
            
            
        })
    .on("mouseout", function(d){
        
        
        d3.select(".display *").remove()
        
        
        
    })
        
        
    
    
    transPoint(data,0,xScale,yScale)
    

}

var transPoint = function(data, index, xScale, yScale)
{
    
    
        var arrays3 = d3.select("#graph")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .attr("cx",function(q,i){ return xScale(i)})
        .attr("cy",function(q){return yScale(q)})
        .attr("r",7)
        .style("fill", function(d){
            
            
            if(d <= 0){
                    return "red"
                    
                    
                }
            else{
                return "yellow"
                
                
            }
            
            
        }
        
        
        )
    
    
    
    
}


var pointsButton = d3.select("#Points")
                     .on("click",function(){pointsPromise.then(success,fail)})

var assitstButton = d3.select("#Assists")
                      .on("click",function(){assistsPromise.then(success,fail)})

var stealsButton = d3.select("#Steals")
                      .on("click",function(){stealsPromise.then(success,fail)})

var reboundsButton = d3.select("#Rebounds")
                      .on("click",function(){reboundsPromise.then(success,fail)})

