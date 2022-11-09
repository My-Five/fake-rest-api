"use strict";
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Post = /** @class */ (function () {
    function Post() {
    }
    return Post;
}());
function createUsers(x) {
    var users = [];
    while (x !== 0) {
        var u = new User();
        u._id = faker_1.faker.datatype.uuid(),
            u.avatar = faker_1.faker.image.avatar();
        u.birthday = faker_1.faker.date.birthdate(),
            u.email = faker_1.faker.internet.email(),
            u.firstName = faker_1.faker.name.firstName(),
            u.lastName = faker_1.faker.name.lastName(),
            u.sex = faker_1.faker.name.sexType(),
            u.subscriptionTier = faker_1.faker.helpers.arrayElement(['free', 'basic', 'business']),
            users.push(u);
        x--;
    }
    return users;
}
function createPosts(x) {
    var collection = [];
    while (x !== 0) {
        var item = new Post();
        item._id = faker_1.faker.datatype.uuid(),
            item.email = faker_1.faker.internet.email(),
            collection.push(item);
        x--;
    }
    return collection;
}
var users = createUsers(10);
var posts = createPosts(10);
var dataObj = { users: users, posts: posts };
fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));
