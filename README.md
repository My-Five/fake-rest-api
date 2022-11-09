# rabbit

```
tsc main.ts && node main.js
```

## Notes

The debate is whether to use a simple mocking server where you define what the resulting JSON shape will look like or to mock the data and load it into a mocking database and use the actual API server. The former is faster to get to working. But if it's not a lot of extra work, it could be nice to instead load the fake data into a database. The only problem I can see is with database joins. That will take more work to get going. Another option is to use both methods. Have the mocking script create db.json, and enter fake data into the mock database.
