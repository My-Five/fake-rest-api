const { faker } = require('@faker-js/faker');
const fs = require('fs');

function createLink() {
    return {
        id: faker.datatype.uuid(),
        story: faker.lorem.sentence(),
        parent: {
            id: faker.datatype.uuid(),
            fullName: faker.name.fullName(),
            avatar: faker.internet.avatar(),
        }
    }
}

function createUser() {
    return {
        id: faker.datatype.uuid(),
        fullName: faker.name.fullName(),
        firstName: faker.name.firstName(),
        avatar: faker.internet.avatar(),
        joinDate: "2022-09-08T13:40:19-05:00",
        bio: faker.lorem.paragraph(),
        numFollowing: faker.datatype.number({ max: 100 }),
        numFollowers: faker.datatype.number({ max: 100 }),
        location: faker.address.city(),
        url: faker.internet.url(),
    }
}


const data = { 
    users: [],
    links: []
}

for (let i = 0; i < 100; i++) {
    data.users.push(createUser())
}

for (let i = 0; i < 100; i++) {
    data.links.push(createLink())
}

fs.writeFileSync('db.json', JSON.stringify(data, null, '\t'));


module.exports = () => {
    return data
}