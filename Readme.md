- Run this command in terminal to start peerjs server:
  npx peerjs --port 3001

- Run this command in terminal to start mongoose:
  mongosh

- Run this command in terminal to start express app:
  npm start

- this is what a fully populated klasses collection document looks like. attendance for 2 learners taken for class1 on 27 Jan 2022.

```
{
    "_id" : ObjectId("61eeb983d239cc6a736a50d7"),
    "klassName" : "class1",
    "members" : [
        ObjectId("61eeb983d239cc6a736a50cb"),
        ObjectId("61eeb983d239cc6a736a50cc"),
        ObjectId("61eeb983d239cc6a736a50cd"),
        ObjectId("61eeb983d239cc6a736a50ce"),
        ObjectId("61eeb983d239cc6a736a50cf"),
        ObjectId("61eeb983d239cc6a736a50d0"),
        ObjectId("61eeb983d239cc6a736a50d1"),
        ObjectId("61eeb983d239cc6a736a50d2")
    ],
    "attendance" : [
        {
            "date" : ISODate("2022-01-27T08:28:06.058Z"),
            "attended" : [
                ObjectId("61eeb983d239cc6a736a50cb"),
                ObjectId("61eeb983d239cc6a736a50cc")
            ],
            "_id" : ObjectId("61f257967565a5772ff2f812")
        }
    ],
    "createdAt" : ISODate("2022-01-24T14:36:51.490Z"),
    "updatedAt" : ISODate("2022-01-27T08:41:02.308Z"),
    "__v" : 2
}
```

- this is what displayKlasses looks like

  ```
  {
    klasses:
      [
        {_id: '61eeb983d239cc6a736a50d7', klassName: 'class1'},
        {_id: '61eeb983d239cc6a736a50da', klassName: 'class2'}
      ],
    learnerId: '61eeb983d239cc6a736a50cc',
    learnerName: 'boyb'
  }
  ```

- learnerDetails stored in local storage with `localStorage.setItem("learnerDetails", learnerDetails)`
  <br>sample learnerDetails: `{id: '61eeb983d239cc6a736a50cc', learner: 'boyb'}`
