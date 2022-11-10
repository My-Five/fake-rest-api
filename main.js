const { faker } = require('@faker-js/faker');
const fs = require('fs');

function createLink(id) {
    return {
        id: id.toString(),
        story: faker.lorem.sentence(),
        parent: createUserBrief(id+50),
    }
}

function createPost(id) {
    return {
        id: id.toString(),
        user: createUserBrief(55),
        body: faker.lorem.paragraph(),
        createdAt: "2022-09-08T13:40:19-05:00",
        timeAgo: "4 h",
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
        joinDate: "2022-09-08T13:40:19-05:00",
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

module.exports = () => {
    return data
}