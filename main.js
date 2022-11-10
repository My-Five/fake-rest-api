import { faker } from '@faker-js/faker';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import * as fs from 'fs';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function randomDate() {
    const start = new Date(2021, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString()
}

function randomTimeAgo(days) {
    var start = new Date();
    start.setDate(start.getDate() - days);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return timeAgo.format(randomDate, 'mini')
}
  

function createLink(id) {
    return {
        id: id.toString(),
        story: faker.lorem.sentence(),
        parent: createUserBrief(id+50),
    }
}

// {
//     "id": "{{ faker 'database.mongodbObjectId' }}",
//     "createdAt": "2022-11-08T13:40:19-05:00",
//     "story": "{{ faker 'lorem.paragraph' }}",
//     "parent": {
//       "id": "{{ faker 'database.mongodbObjectId' }}",
//       "fullName": "{{ faker 'name.fullName' }}",
//       "avatar": "{{ faker 'internet.avatar' }}",
//     },
//     "child": {
//         "id": "{{ faker 'database.mongodbObjectId' }}",
//         "fullName": "{{ faker 'name.fullName' }}",
//         "avatar": "{{ faker 'internet.avatar' }}",
//       },
//     "evidence": [
//       {{# repeat (queryParam 'total' '10') }}
//         {
//           "id": "{{ faker 'database.mongodbObjectId' }}",
//           "createdAt": "2022-09-08T13:40:19-05:00",
//           "takenAt": "2021-05-08T13:40:19-05:00",
//           "uploader": {
//             "id": "{{ faker 'database.mongodbObjectId' }}",
//             "fullName": "{{ faker 'name.fullName' }}",
//             "avatar": "{{ faker 'internet.avatar' }}",
//           },
//           "location": "{{ faker 'address.city' }}",
//           "caption": "{{ faker 'lorem.sentence' }}",
//           "photo200": "{{ faker 'image.people' }}",
//           "photo800": "{{ faker 'image.people' }}",
//           "photo2000": "{{ faker 'image.people' }}",
//           "numWitnesses": {{ faker 'datatype.number' max=100 }},
  
//         },
//       {{/ repeat }}
//     ],
//   }

function createPost(id) {
    return {
        id: id.toString(),
        user: createUserBrief(55),
        body: faker.lorem.paragraph(),
        createdAt: randomDate(),
        timeAgo: randomTimeAgo(3),
        postType: faker.datatype.number({ min: 0, max: 4 }),
        numLikes: faker.datatype.number({ max: 100 }),
        numReplies: faker.datatype.number({ max: 100 }),
        numReposts: faker.datatype.number({ max: 100 }),
        numQuotes: faker.datatype.number({ max: 100 }),
        numShares: faker.datatype.number({ max: 100 }),
    }
}

function createUserBrief(id) {
    return {
        id: id.toString(),
        fullName: faker.name.fullName(),
        firstName: faker.name.firstName(),
        avatar: faker.internet.avatar(),
    }
}

function createUser(id) {
    var children = [];
    for (let i = 1; i < 6; i++) {
        children.push(createUserBrief(i+3))
    }
    
    return {
        id: id.toString(),
        fullName: faker.name.fullName(),
        firstName: faker.name.firstName(),
        avatar: faker.internet.avatar(),
        joinDate: randomDate(),
        bio: faker.lorem.paragraph(),
        numFollowing: faker.datatype.number({ max: 100 }),
        numFollowers: faker.datatype.number({ max: 100 }),
        location: faker.address.city(),
        url: faker.internet.url(),
        parent: createUserBrief(id+50),
        children: children
    }
}

const data = { 
    users: [],
    links: [],
    posts: []
}

for (let i = 1; i < 100; i++) {
    data.users.push(createUser(i))
    data.links.push(createLink(i))
    data.posts.push(createPost(i))
}

fs.writeFileSync('db.json', JSON.stringify(data, null, '\t'));

