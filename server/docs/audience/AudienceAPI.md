# Audience APIs :speech_balloon:
---
The list of API's of the Researcher module.


#### 1. View question list according to preference API endpoint 
- **URL:**`
localhost:3000/api/v1/audience/showListOfQuestions?tag=<tag>`
- **Method:** `GET`
- **Access:** `private`
- **Input fields:** `tag`

**Input Example:**
```
localhost:3000/api/v1/audience/showListOfQuestions?tag=music
```
**Response Example:**
```
{
    "QuestionSets": [
        {
            "stars": [
                "4",
                "5"
            ],
            "_id": "5db9b8a4a983563737930a08",
            "numberOfQuestions": "2",
            "researcherID": "5db9b873a983563737930a07",
            "tag": "music",
            "questionAnswer": [
                {
                    "options": [
                        "option1",
                        "option2",
                        "option3"
                    ],
                    "_id": "5db9b8a4a983563737930a0a",
                    "question": "what??",
                    "ansType": "radiobox"
                },
                {
                    "options": [],
                    "_id": "5db9b8a4a983563737930a09",
                    "question": "what what??",
                    "ansType": "textbox"
                }
            ],
            "willShowTill": "2019-10-30T17:21:56.870Z",
            "__v": 2
        },
        {
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
    ]
}
```
#### 2. Audience Submit Answer API endpoint 
- **URL:**`localhost:3000/api/v1/audience/answerQuestions/<QuestionSetID>`
- **Method:** `POST`
- **Access:** `private`
- **Params** `QuestionSetID, Answers`

**Response Example:**
```

```
#### 3. Audience Rate Question Set API endpoint
- **URL:**`localhost:3000/api/v1/audience/rateQuestionList?id=<QuestionSetID>&star=<star>`
- **Method:** `POST`
- **Access:** `private`
- **Params:** `Question Set Id, Star`

**Response Example:**
```
{
    "updatedQuestionSet": {
        "stars": [
            "3"
        ],
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
        "__v": 1
    }
}
```