//Needed Constants
const PORT = 8989
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()


//Tells the console.log to listen to desird port
app.listen(PORT,() => console.log)

//This is where you do the URL
const url ='https://www.theguardian.com/us-news'
axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        //Named the array 

//Find the class tag of a given headline that works with what you are trying to get    
       $('.fc-item__title', html).each(function() {
        const Title = $(this).text()
        const URL = $(this).find("a").attr('href')
        //We push the console.log to the array
        articles.push({
            Title,
            URL
        })
       })
    
       console.log(articles)
    }).catch(err => console.log(err))
;

//Sometimes it takes  more than a second to get the needed files
setTimeout((function() {  
    return process.exit();
}), 15000);


//Now we tell the node to change the console.log to be redirected to a new file that is created.
//In this case we named it console_log.txt

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/console_log.txt', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
console.log('Go Check Out The console_log.txt Files For Clickable Links To Todays Headlines');