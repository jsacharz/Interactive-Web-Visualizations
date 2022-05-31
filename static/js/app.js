// 1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`.
d3.json("samples.json").then(data => console.log(data))
var selector = d3.select("#selDataset")

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//   * Use `sample_values` as the values for the bar chart.

//   * Use `otu_ids` as the labels for the bar chart.

//   * Use `otu_labels` as the hovertext for the chart.

//   ![bar Chart](Images/hw01.png)
function buildChart() {

  d3.json("samples.json").then(data => {
   

    data.names.forEach(name => {
        selector.append("option").text(name).property("value", name)
    });
    var selected_sample = d3.select("#selDataset").node().value; 

    var sampleData = data.samples.filter(sample => sample.id == selected_sample)
 

    // BAR CHART
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



// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ![hw](Images/hw02.png)

// 7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

// ## Advanced Challenge Assignment (Optional)

// The following task is advanced and therefore optional.

// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

// * You will need to modify the example gauge code to account for values ranging from 0 through 9.

// * Update the chart whenever a new sample is selected.

// ![Weekly Washing Frequency Gauge](Images/gauge.png)
