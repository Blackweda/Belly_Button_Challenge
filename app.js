const iwv_samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
samples_json = d3.json(iwv_samples).then(function(data) {
    
    console.log(data); 
});


option_list = d3.select("selDataset");
option_list.selectAll("option").data(samples_json).enter().append("option").text(name => name);

//dashboard display
optionChanged = value => {
    option = value;
    displayData(option);
};


displayData = option => {
    displayMetaData(option);
    displayBarChart(option, samples_json); 
    displayBubbleChart(option, samples_json); 
};

// Plot Bar Chart
function displayBarChart(option, dataSet) {
    barData = samples_json.samples.find(sample => sample.id == option);
    console.log(barData);
  
    y = barData.otu_ids.map(id => `OTU ${id}`);
    x = barData.sample_values.slice(0, 10);
    text = barData.otu_labels.slice(0, 10);
  
    trace = {
        x,
        y,
        text,
        type: "bar",
        orientation: "h"
    };
  
    data = [trace];
  
    layout = {
        title: "Top 10 Individual OTUs",
        yaxis: { autorange: "reversed" }
    };
  
    Plotly.newPlot("bar", data, layout);
  }
  
  // Plot Bubble Chart
  function displayBubbleChart(option, samples_json) {
    barData = samples_json.samples.find(sample => sample.id == option);
    console.log(barData);
  
    trace = {
        x: barData.otu_ids,
        y: barData.sample_values,
        text: barData.otu_labels,
        mode: "markers",
        marker: {
            color: barData.otu_ids,
            size: barData.sample_values.map(value => value * .75),
            colorscale: "Earth"
        }
    };
  
    data = [trace];
  
    layout = {
        title: "OTU Bubble Chart",
        xaxis: { title: "OTU ID" }
    };
  
    Plotly.newPlot("bubble", data, layout);
  }


  