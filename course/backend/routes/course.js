var express = require('express');
var router = express.Router();

const data = {
  "1": {
    "Course title": "CALCULUS",
    "Credits": 2,
    "Instructor": "Peter",
    "Curriculum Number": "MATH4008"
  },
  "2": {
    "Course title": "Object-oriented Software Design",
    "Credits": 2,
    "Instructor": "Paul",
    "Curriculum Number": "CSIE1211"
  },
  "3": {
    "Course title": "Discrete Mathematics",
    "Credits": 3,
    "Instructor": "Kelly",
    "Curriculum Number": "CSIE2122"
  },
  "4": {
    "Course title": "Probability",
    "Credits": 2,
    "Instructor": "Tina",
    "Curriculum Number": "CSIE2121"
  },
  "5": {
    "Course title": "Foundations of Artificial Intelligence",
    "Credits": 2,
    "Instructor": "Anna",
    "Curriculum Number": "CSIE3005"
  },
  "6": {
    "Course title": "Operating Systems",
    "Credits": 2,
    "Instructor": "Bruce",
    "Curriculum Number": "CSIE3310"
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

module.exports = router;