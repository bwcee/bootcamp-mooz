## Mooz

A video conferencing app with automated attendance-taking to ease teachers' administrative load!

Watch our demo [here](https://www.youtube.com/watch?v=3dB-qjx8m_k&list=PLRCJY_VHTZH7WN_N8UDEfePDNxxIzxm7l&index=2&ab_channel=TristanTeo): 

<details>
  <summary> Table of Contents </summary>
  
- [About The Project](#about-the-project) 
- [Usage/ Features](#usage-features)
- [Built With](#built-with)
- [Demo App](#demo-app)
- [Contact](#contact)
  
</details>

## About The Project
<br/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163418556-ebb32c65-cb2c-4930-8d6e-e8f301415cb8.png" width="600px" />
</div>
<br/>

We all love the energy of great classes and workshops - where we leave feeling inspired and connected with people. When the pandemic forced classes online, something seemed to be off. Online sessions just didn’t feel as engaging as in-person ones. 

Teaching tuition online we felt handicapped at not being able to manage sessions as easily as before - especially if we were the only teacher in the session. Attention spans of students were much shorter. What made it worse was that we had to keep students engaged while:
 - Taking attendance
 - Taking notes on students’ progress, and
 - Conducting activities

Our focus sometimes ended up being on the tech, not the discussions. 

Enter _**Mooz**_. Think zoom, but optimized for teaching. We want to enable teachers to put their energy into doing what they do best - running high energy sessions that students love. 

We do that by first automating a tedious but key admin task - attendance taking.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage/ Features

First, you can sign up or log in.

<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163426260-acbe36ef-3488-449f-8425-02bdd532fb09.gif" width="600px"/>
</div>

<br/>

You will enter the lobby where you can see all the classes that you have enrolled for. Click "join session to join the selected class instantly".

<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163426280-7dc46604-e94e-4877-b8c6-d185e0172bd1.gif" width="600px"/>
</div>

<br/>

Upon joining the room, you will see a gallery view of all the other users in the room. You can choose to mute and unmute yourself, and switch on and off your camera using the toolbar on the left hand side.

<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163424819-502f2604-9fe7-466e-ae79-def3277d33c3.png" width="600px" />
</div>

<br/>

If you are signing in as an admin (these could be teachers or school staff), you will see an additional button called "Download attendance" in the lobby. Everytime a student joins the class, he/she will be added to the attendance list automatically. The user with an admin role can choose to download the attendance any time. 

<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163425014-24147b3a-1e68-4cd8-bdbe-5fb41e9b4f67.png" width="600px" />
</div>

<br/>

Upon downloading the attendance sheet, you will see a list of all the students and their attendance (denoted by TRUE or FALSE) when class is started and ended.

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With
**Frontend**
- React.js

**Backend**
- Express
- MongoDB
- Mongoose

At this point of bootcamp, we have learnt SQL and worked with PostgreSQL + Sequelize. We wanted to explore NoSQL databases for this project, and chose MongoDB with Mongoose as they are very accessible options. The database was eventually moved online to MongoDB Atlas in order to deploy the app on Heroku. 

**Video Call Functionality**
- Socket.IO
- Simple Peer

Real-time communication between browser and server is natively supported by all modern browsers through the Websocket API. We chose to use Socket.IO as it abstracts away details and fallbacks required for a vanilla Websocket implementation.

<p align="right">(<a href="#top">back to top</a>)</p>

## Demo App
Try Mooz [here](https://mooz-sg.herokuapp.com/)!

Sign in to admin role with `teacha@teacha.com` and learner role with `boya@boya.com`. All passwords are `123`.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact
Tristan: teo.jia.jun.29@gmail.com, [Githhub](https://github.com/jjiajun)

Justus: weizhengjustus.lim@gmail.com, [Githhub](https://github.com/wzjustuslim)

Boon Wee: bwceemail@gmail.com, [Githhub](https://github.com/bwcee)

<p align="right">(<a href="#top">back to top</a>)</p>
