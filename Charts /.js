// Function to create a density plot
async function createDensityPlot() {
    // Fetch the heart.csv file
    const response = await fetch('Heart/Users/gabyadesanmi/Project 4/Project_4/Heart visualizations/heart.csv visualizations/heart.csv'); // Replace with your CSV file path
    const csvData = await response.text();
  
    // Parse the CSV data
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
    const data = [];
  
    for (let i = 1; i < rows.length; i++) {
      const currentRow = rows[i].split(',');
      if (currentRow.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentRow[j];
        }
        data.push(obj);
      }
    }
  
    // Extract data for density plot
    const ages = data.map(d => parseFloat(d['age']));
    const bloodPressure = data.map(d => parseFloat(d['trestbps']));
    const maxHeartRate = data.map(d => parseFloat(d['thalach']));
    const sex = data.map(d => d['sex']);
  
    // Create traces for density plot
    const trace = {
      x: ages,
      y: bloodPressure,
      mode: 'markers',
      type: 'histogram2dcontour',
      colorscale: 'Viridis',
      zauto: false,
      zmin: 0,
      reversescale: true,
      text: sex,
      hoverinfo: 'text+x+y'
    };
  
    const layout = {
      title: 'Density Plot of Age vs Blood Pressure Rate',
      xaxis: { title: 'Age' },
      yaxis: { title: 'Blood Pressure Rate' }
    };
  
    const plotData = [trace];
  
    // Create density plot using Plotly
    Plotly.newPlot('densityPlot', plotData, layout);
  }
  
  // Call the function to create density plot
  createDensityPlot();
  