# Challenge 18: Social Network API with Mongoose

## Description
Social media is a huge part of most people's lives. The systems that power the most popular sites have to store and manage an enormous amount of data efficiently. This project explores the technologies that connect users, friends, thoughts, and reactions with each other. You can use Insomnia to test the routes used to retrieve or change data. This project taught me how to use Mongoose to store and manipulate data, use schemas to build models, and connect to an Express server through Mongoose technologies.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
Get started by opening the root directory in the Integrated Terminal:

![Open package.json in Integrated Terminal](Assets/open_package_json_in_integrated_terminal.png)

Then run (type and enter) `npm install`:

![Run npm install](Assets/run_npm_install.png)

once you do that, the following packages will be installed:

`dotenv @ 16.3.1`<br>
`express @4.18.2`<br>
`mongoose @7.6.3`

## Usage
A walkthrough video that demonstrates the application can be found [here](https://www.youtube.com/watch?v=S-9U2JyAipU&t=221s).

The rest of this section will explain how to test the routes in Insomnia, how they should be written, and when to keep special cases in mind.

**Get All Users**
`http://localhost:3001/api/users`

![Get All Users](Assets/get_all_users.png)

**Get User by ID**
`http://localhost:3001/api/users/id`

![Get User by ID](Assets/get_user_by_id.png)

**Create New User**
`http://localhost:3001/api/users/`

For any route that requires a request body, any text that contains a backslash `\` or a double quote `"` must be escaped by an additional backslash. See the `Usage` section of [my Challenge 13 readme](https://github.com/GimmeKitties711/challenge_13-internet_retail_back_end) for a more detailed explanation.

You are required to enter both a username and an email to create a new user.

**Special case:** Leaving out either field will result in validation errors, and your new user will not be accepted.

**Special case:** Your new user will also not be accepted if their username or email is exactly the same as the username or email of any other user. This is because the user schema requires that those fields are unique.

![Create New User](Assets/create_new_user.png)

**Update User by ID**
`http://localhost:3001/api/users/id`

**Special case:** If the request body is empty, or there is no body at all, it will not result in an error but the user will not undergo any changes. However, unlike creating a new user, updating a user does not require that both fields are supplied. You can choose to change only one of them.

![Update User by ID](Assets/update_user_by_id.png)

**Delete User by ID**
`http://localhost:3001/api/users/id`

If you delete a user, you will not be able to update or get that same user later on.

**Special case:** Attempting to delete a user with an ID that does not exist will result in an error.

![Delete User by ID](Assets/delete_user_by_id.png)

**Add Friend by ID**
`http://localhost:3001/api/users/userId/friends/friendId`

In this route, the user associated with `userId` adds the user associated with the `friendId` to their friends list. Adding a friend is **not mutual.** If User 1 adds User 2, User 2 does not automatically add User 1.

**Special case:** You are allowed to add friends by IDs that do not exist as long as the character length is correct. However, it is not recommended to do this as no actual user is tied to the ID and it would likely cause confusion.

![Add Friend by ID](Assets/add_friend_by_id.png)

**Delete Friend by ID**
`http://localhost:3001/api/users/userId/friends/friendId`

This route removes a friend from the friends array of the user specified by `userId`.

**Special case:** Attempting to delete a friend with an ID that does not exist will not result in an error, but it will leave the user's friends array unchanged.

![Delete Friend by ID](Assets/delete_friend_by_id.png)

GET ALL THOUGHTS `http://localhost:3001/api/thoughts`

![Get All Thoughts](Assets/get_all_thoughts.png)

Get Thought by ID `https://localhost:3001/api/thoughts/id`

![Get Thought by ID](Assets/get_thought_by_id.png)

Create New Thought `http://localhost:3001/api/thoughts`

required: { thoughtText, username, userId } thoughtText is required to be between 1 and 280 characters (causes an error if 0 or 281 characters) The username you enter can actually be different from the username attached to the userId because even though you write the thoughts under a different username they are attached to the username associated with the userId. (pictures maybe)? just like posting a new user, if you leave fields out it will cause errors

![Create New Thought](Assets/create_new_thought_2.png)

Update thought by ID (maybe don't mention the post thingy and put thingy we did for users?) When you update the thought text you can change two things: (also for the get thought by id thingy) the thoughtText and the username. you are free to change either or both of them, and the thought after the changes will show in the result of a successfully request

![Update Thought by ID](Assets/update_thought_by_id.png)

Delete thought by ID: `http://lcoalhost:3001/api/thoughuts/thoughtId`

Attempting to delete a thought with an ID that does not exist will result in an error.

![Delete Thought by ID](Assets/delete_thought_by_id.png)

Create New Reaction `http://localhost:3001/thoughts/thoughtId/reactions`

reactionBody has a char limit of 1-280 just like thoughtText, and in addition you are required to enter a username to indicate who made the reaction.

![Create New Reaction](Assets/create_new_reaction.png)

Delete Reaction by ID `http://localhost:3001/thoughts/thoughtId/reactions/reactionId`

unlike create new reaction, delete reaction by id requires both a thoughtId and a reactionId. Basically it will remove the reaction specified by reactionId from the thought associated with thoughtId's reaction array.

If you attempt to delete a reaction by an ID that does not exist, you will not receive an error but the thought's reactions array will remain unchanged.

![Delete Reaction by ID](Assets/delete_reaction_by_id.png)

## Credits
Received assistance from instructor Robbert Wijtman in the *#02-ask-the-class* Slack channel. Also received assistance from AskBCS assistants Joem, Zack, and Shaun. The following web resources helped me write the code for this project:

1. [YouTube: MONGOOSE - Setting up Mongoose with Express and creating a Model](https://youtu.be/_ST946yIFSw?si=Lx0DSM51Bi52-NB-)
2. [YouTube: MONGOOSE: Creation and Fetching Data](https://youtu.be/E1w9kthC4YQ?si=UzMJ1r5x3R3ufF2p)
3. [The $in operator](https://www.mongodb.com/docs/manual/reference/operator/query/in/)
4. [YouTube: Mongoose part 2: Update, Delete, and intro to subdocuments](https://www.youtube.com/watch?v=cedhqsQ7FZs)
5. [Regex 101](https://regex101.com/)
6. [How to use virtuals in Mongoose](https://mongoosejs.com/docs/tutorials/virtuals.html)
7. [The toLocaleDateString() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
8. [The toLocaleTimeString() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)
9. [How to use getter functions in Mongoose](https://mongoosejs.com/docs/tutorials/getters-setters.html)

## Contributing
If anyone has any ideas on how this project can be improved or expanded on, I would be happy to hear them.

## Tests
No tests have been written for this application.

## License
No license is attached to this repository.

## Questions
If you have any questions for me, you can [follow me on GitHub](https://github.com/GimmeKitties711) or email me at eric20wang.wang@gmail.com.
