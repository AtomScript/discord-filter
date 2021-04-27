# GUIDE

### Attributes
- username
- nickname
- id
- avatar
- createdDate
- joinedDate
- isBot


### Using query
```javascript
SELECT username, id FROM @$Herous_0264
//   OR
SELECT username, id FROM $Herous_
//   OR
SELECT username, id FROM 611388294386679808
```

### Using query with WHERE clause
###### The WHERE clause only works to search for more users. It does not work on a query where the user is specific.
```javascript
SELECT username, id, createdDate FROM * WHERE createdDate.hours<=20
// Filters users who have an account created less than 20 days ago.
```
```javascript
SELECT username, id, createdDate FROM * WHERE createdDate.days<=20
// Filters users who have an account created less than 20 hours ago.
```
```javascript
SELECT username, id, createdDate FROM * WHERE createdDate.months<=6
// Filters users who have an account created less than 6 months ago.
```
```javascript
SELECT username, id, createdDate FROM * WHERE createdDate.days>=10
// Filters users who have an account created more than 10 days ago.
```
```javascript
SELECT username, id, createdDate FROM * WHERE createdDate.days=10
// Filters users who have a creation date equal to 10 days.
```
