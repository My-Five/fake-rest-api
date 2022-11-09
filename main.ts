import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import * as fs from 'fs';

// var fs = require('fs');

type SubscriptionTier = 'free' | 'basic' | 'business';

class User {
    _id: string;
    avatar: string;
    birthday: Date;
    email: string;
    firstName: string;
    lastName: string;
    sex: SexType;
    subscriptionTier: SubscriptionTier;
}

class Post {
    _id: string;
    email: string;
}

function createUsers(x: number): User[] {
    const users: User[] = [];
    while (x !== 0) {
        var u = new User();
        u._id = faker.datatype.uuid(),
        u.avatar = faker.image.avatar();
        u.birthday = faker.date.birthdate(),
        u.email = faker.internet.email(),
        u.firstName = faker.name.firstName(),
        u.lastName = faker.name.lastName(),
        u.sex = faker.name.sexType(),
        u.subscriptionTier = faker.helpers.arrayElement(['free', 'basic', 'business']),
        users.push(u);
        x--;
      }
      return users;
}

function createPosts(x: number): Post[] {
    const collection: Post[] = [];
    while (x !== 0) {
        var item = new Post();
        item._id = faker.datatype.uuid(),
        item.email = faker.internet.email(),
        collection.push(item);
        x--;
      }
      return collection;
}

let users = createUsers(10);
let posts = createPosts(10);

let dataObj = { users, posts };

fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));