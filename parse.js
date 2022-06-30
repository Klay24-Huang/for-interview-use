'use strict'

const fs = require('fs')
const {
    Parser
} = require('json2csv')

const raw_data = {
    "小明": {
        "id": "B05102332",
        "transcript": [{
            "subject": "chinese",
            "score": "98優異 "
        }, {
            "subject": "english",
            "score": "85良好"
        }, {
            "subject": "math",
            "score": "93優異 "
        }, {
            "subject": "social",
            "score": "72尚可"
        }, {
            "subject": "science",
            "score": "40有待加強"
        }]
    },
    "ちびまる 子ちゃん": {
        "id": "B08902245",
        "transcript": [{
            "subject": "chinese",
            "score": "88良好 "
        }, {
            "subject": "english",
            "score": "95優異"
        }, {
            "subject": "math",
            "score": "93優異 "
        }, {
            "subject": "social",
            "score": "9差"
        }, {
            "subject": "science",
            "score": "70尚可"
        }]
    },
    "Bären": {
        "id": "B03902190",
        "transcript": [{
            "subject": "chinese",
            "score": "90優異 "
        }, {
            "subject": "english",
            "score": "97優異"
        }, {
            "subject": "math",
            "score": "100優異 "
        }, {
            "subject": "social",
            "score": "91優異"
        }, {
            "subject": "science",
            "score": "96優異"
        }]
    }
}

const parse = () => {
    let csvData = []
    for (const name in raw_data) {
        let row = {
            id: raw_data[name].id,
            name: name,
        }
        // subject and score
        let transcript = raw_data[name].transcript
        transcript.forEach(element => {
            row[element.subject] = getScore(element.score)
        })
        csvData.push(row)
    }

    // sort by id
    csvData.sort((a, b) => {
        return ('' + a.id).localeCompare(b.id)
    })

    // csv related
    const fields = Object.keys(csvData[0])
    const csv = new Parser({
        fields
    })

    const options = {
        encoding: "utf8"
    }
    // "\ufeff" 添加utf8 bom，避免用excel打開變亂碼
    fs.writeFile('clean_data.csv', "\ufeff" + csv.parse(csvData), options, (err) => {
        if (err) {
            console.error(err)
            throw err
        }
    })
}

// extract number from string,
// 70尚可 -> 70
const getScore = (str) => parseInt(str.match(/\d+/)[0])

// entry point
parse()


// note: 
// npm i “json2csv”