# Researcher APIs :mag:
---
The list of API's of the Researcher module.


#### 1. Create Question API endpoint 
- **URL:**`
localhost:3000/api/v1/researcher/submitQuestions`
- **Method:** `POST`
- **Access:** `private`
- **Input fields:** `numberOfQuestions, tag, ques*, ansType*, array of options*`
`*` means number

**Input Example:**
```
{
    "numberOfQuestions": 2,
    "tag": "music",
    "ques1": "Some Question 1??",
    "ansType1": "radiobox",
    "options1": [
        "option1",
        "option2",
        "option3"
    ],
    "ques2": "Some Question 2??",
    "ansType2": "textbox"
}
```
**Response Example:**
```
{
    "questionType": {
        "stars": [],
        "_id": "5dbd274d98426d0a108a07ee",
        "numberOfQuestions": "2",
        "researcherID": "5dbc50f737518a2f285f02d9",
        "tag": "music",
        "questionAnswer": [
            {
                "options": [
                    "option1",
                    "option2",
                    "option3"
                ],
                "_id": "5dbd274d98426d0a108a07f0",
                "question": "Some Question 1??",
                "ansType": "radiobox"
            },
            {
                "options": [],
                "_id": "5dbd274d98426d0a108a07ef",
                "question": "Some Question 2??",
                "ansType": "textbox"
            }
        ],
        "__v": 0
    }
}
```
#### 2. Audience Review API endpoint 
- **URL:** `localhost:3000/api/v1/researcher/seeAudienceReview`
- **Method:** `GET`
- **Access:** `private`

**Response Example:**
```
```