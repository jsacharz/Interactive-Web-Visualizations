// 1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`.
d3.json("samples.json").then(data => console.log(data))
var selector = d3.select("#selDataset")

// Build function for Charts:
function buildChart() {

// Retrive json data
  d3.json("samples.json").then(data => {
   

    data.names.forEach(name => {
        selector.append("option").text(name).property("value", name)
    });
    var selected_sample = d3.select("#selDataset").node().value; 

    var sampleData = data.samples.filter(sample => sample.id == selected_sample)
 

//2. HORIZONTAL BAR CHART to display top 10 OTUs from individuals:
    trace1 = {
        x: sampleData[0].sample_values.slice(0,10),
        y: sampleData[0].otu_ids.slice(0,10).map(id => 'OTU' + id),
        // text: sampleData[0].otu_labels.slice(0,10),
        type: "bar",
        orientation:  "h"
    };
    layout = {
        title: "Top 10 Microbial Species Found in Tested Subject"
    };
    Plotly.newPlot('bar', [trace1], layout);

// 3. Create a bubble chart that displays each sample.
    var trace1 = {
        x: sampleData[0].otu_ids.slice(0,20),
        y: sampleData[0].sample_values.slice(0,20),
        // text: `otu_labels`,
        mode: 'markers',
        marker: {
          color: sampleData[0].otu_ids.slice(0,20),
          size: sampleData[0].sample_values.slice(0,20),
        }
      };
      
      var bubbleData = [trace1];
      
      var layout = {
        title: 'Belly Butoon Samples',
        xaxis: {titile: "PTU IDs"},
        yaxis: {titile: "Sample Values"},
        showlegend: false,
        // height: 600,
        // width: 600
      };
      // Display bubble chart
      Plotly.newPlot('bubble', bubbleData, layout);

// 4. Display the sample metadata, i.e., an individual's demographic information
    
    var demogrData = data.metadata.filter(row => row.id == selected_sample)
    console.log(demogrData);
    var metaData = d3.select("#sample-metadata");
  
    document.getElementById("sample-metadata").innerHTML = ''
    for (const [key, value] of Object.entries(demogrData[0])) {
      // console.log(key, value); 
      metaData.append("p").text(`${key}: ${value}`);
      // d3.select("body").append("p").text("New paragraph!");
    }
});

}

buildChart();

document.getElementById("selDataset").addEventListener("change", buildChart)
