import { faker } from '@faker-js/faker';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import * as fs from 'fs';

// Good ISO8601 format example
// 2022-09-08T13:40:19-05:00
// Bad format?
// 2022-01-06T18:27:21.270Z

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function randomDate() {
    const start = new Date(2021, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return toISOStringWithTimezone(randomDate)
}

function randomTimeAgo(days) {
    var start = new Date();
    start.setDate(start.getDate() - days);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return timeAgo.format(randomDate, 'mini')
}

function toISOStringWithTimezone(date) {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      diff + pad(tzOffset / 60) +
      ':' + pad(tzOffset % 60);
};

function createEvidence(id) {
    return {
        id: id.toString(),
        createdAt: randomDate(),
        createdTimeAgo: randomTimeAgo(3),
        takenAt: randomDate(),
        takenTimeAgo: randomTimeAgo(3),
        uploader: createUserBrief(id+50),
        location: faker.address.city(),
        caption: faker.lorem.sentence(),
        photoSm: faker.image.people(200, 200),
        photoMd: faker.image.people(800, 800),
        photoLg: faker.image.people(1200, 1200),
        photoXl: faker.image.people(2000, 2000),
        numWitnesses: faker.datatype.number({ max: 100 })
    }
}

function createLink(id) {
    var evidence = [];
    for (let i = 1; i < 10; i++) {
        evidence.push(createEvidence(i))
    }
    return {
        id: id.toString(),
        createdAt: randomDate(),
        createdTimeAgo: randomTimeAgo(3),
        story: faker.lorem.sentences(),
        parent: createUserBrief(id+50),
        child: createUserBrief(id+50),
        evidence: evidence
    }
}



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

