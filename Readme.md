- this is what displayKlasses looks like
  <br> `{klasses: [ {_id: '61eeb983d239cc6a736a50d7', klassName: 'class1'}, {_id: '61eeb983d239cc6a736a50da', klassName: 'class2'} ], learnerId: '61eeb983d239cc6a736a50cc', learnerName: 'boyb' }`

- learnerDetails stored in local storage with `localStorage.setItem("learnerDetails", learnerDetails)`
  <br>sample learnerDetails: `{id: '61eeb983d239cc6a736a50cc', learner: 'boyb'}`

- this is what a klasses collection document looks like
  {
  "\_id": "61eeb983d239cc6a736a50d7",
  "klassName": "class1",
  "members": [
  "61eeb983d239cc6a736a50cb",
  "61eeb983d239cc6a736a50cc",
  "61eeb983d239cc6a736a50cd",
  "61eeb983d239cc6a736a50ce",
  "61eeb983d239cc6a736a50cf",
  "61eeb983d239cc6a736a50d0",
  "61eeb983d239cc6a736a50d1",
  "61eeb983d239cc6a736a50d2"
  ],
  "attendance": [],
  "createdAt": "2022-01-24T14:36:51.490Z",
  "updatedAt": "2022-01-24T14:36:51.490Z",
  "\_\_v": 0
  }

Run this command in terminal to start peerjs server:
npx peerjs --port 3001

Run this command in terminal to start mongoose:
mongosh

Run this command in terminal to start express app:
npm start
