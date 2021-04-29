# GUIDE

### Attributes
- username
- nickname
- tag
- id
- avatar
- createdDate
- joinedDate
- isBot
- discriminator
- \*

### For WHERE clause
<ul>
<li>username<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>includes</li>
<li>startsWith</li>
<li>endsWith</li>
</ul></li>
<li>nickname<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>includes</li>
<li>startsWith</li>
<li>endsWith</li>
</ul></li>
<li>id<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>includes</li>
<li>startsWith</li>
<li>endsWith</li>
</ul></li>
<li>discriminator<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>includes</li>
<li>startsWith</li>
<li>endsWith</li>
</ul></li>
<li>createdDate<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>hours</li>
<li>days</li>
<li>months</li>
</ul></li>
<li>joinedDate<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>hours</li>
<li>days</li>
<li>months</li>
</ul></li>
<li>isBot<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li></ul></li>
<li>tag</li>
<li>avatar<ul>
<li>operators<ul>
<li>=</li>
<li><</li>
<li>></li>
<li>!</li>
</ul></li>
<li>includes</li>
<li>startsWith</li>
<li>endsWith</li>
</ul></li>
</ul>

## For ORDER BY clause
- separator
- count
- line
- role.has

### Using query
```javascript
SELECT username, id FROM @$Herous_#0264
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
```javascript
SELECT username, id FROM * WHERE nickname.startsWith="$"
// Filters users who have a nickname that starts with $.
```
```javascript
SELECT username, id, createdDate FROM * WHERE joined.days<=10
// Filters users who have logged on to the server less than 10 days ago.
```
```javascript
SELECT tag, id FROM * WHERE joined.days<=10 ORDER BY separator=" | " AND count=1
// Output: $Herous_#0264 | 618030185710184100
// Note: as i set the count attribute, it returned me only 1 user, instead of 3.
```
