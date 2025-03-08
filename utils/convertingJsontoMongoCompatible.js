const fs = require("fs"); 

// Read BusinessNameLocaitonJSON file 
fs.readFile("../backend/src/main/java/data/BusinessNameLocationJSON", function(err, data) { 
    // Check for errors 
    if (err) throw err; 

    // Converting to JSON 
    const businessNameLocationJSONObject = JSON.parse(data);
    const  businessNameLocationJSONArray = []

    for (value in businessNameLocationJSONObject) {
        businessNameLocationJSONArray.push(businessNameLocationJSONObject[value])
    }

    const businessNameLocationJSONArrayJSON = JSON.stringify(businessNameLocationJSONArray)

    fs.writeFile("../backend/src/main/java/data/BusinessNameLocationArrayJSON.json", businessNameLocationJSONArrayJSON, (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
        console.log('Data written successfully to disk');
      });
    
}); 

