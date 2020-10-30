# wolfpack

## Project setup
Welcome to the Frontend Wolfpack assessment!
The leader of the pack wants us to create a web application to track all the wolves in the
pack. Assume you are creating this app in a team of developers, you are the lead
frontend developer of the team. Your fellow developers have already built a backend for
this app, which consists of a RESTful API. Your task is to build a web based frontend for
this API which implements all the required functionalities for the app.
This app should have the following functionalities, in the future more functionalities
may be added.
Wolves
It should be possible to list all the wolves including some basic personal information
such as their name, gender and birthdate. Furthermore it should be possible to add,
remove and update wolves in this list.
Packs
Wolves like hanging out in packs, in our app we’d like an option to create packs to which
we can add wolves. Packs consist of a name, location and one or more wolves.
Furthermore, sometimes we want to remove wolves from a pack again. The app should
be able to display a list of packs and the wolves which are in them. Bonus: Add a map
showing all the packs.
Notes:
- Implement the frontend as if you were doing this project for one of our
customers.
- Make sure it looks decent and is usable. We understand you are not a designer,
so it doesn’t have to be perfect.
- Quality goes over quantity, you don’t need to deliver a fully functional app, we
rather see a few functionalities implemented very well than all of them
implemented in a hurry.
- Use whatever frameworks or libraries which you think are suitable for the job.
- Backend developers make mistakes, make sure your app can handle invalid
responses or errors from the backend properly.
Details:
- The API is available at join.wolfpackit.nl
- The documentation can be found at https://join.wolfpackit.nl/api/documentation
- To make things easier the API does not use any complicated authentication
mechanisms. Just include a header named Authorization with Bearer
9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6 as value in all your
requests.
1

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

In order to compile for production go to vue.config.js and uncomment the line of code as specified
### Compiles and minifies for production
```
npm run build
```

Map is a free version so you will be able to see the pack but you need to close the popup.