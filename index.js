
const PORT = 8989
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()


app.listen(PORT,() => console.log)

const url ='https://www.theguardian.com/us-news'
axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

    
       $('.fc-item__title', html).each(function() {
        const Title = $(this).text()
        const URL = $(this).find("a").attr('href')
        articles.push({
            Title,
            URL
        })
       })
    
       console.log(articles)
    }).catch(err => console.log(err))
;

