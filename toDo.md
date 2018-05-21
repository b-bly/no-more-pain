# add-comment.js: does not submit on enter for edit mode
# treatment.js: 
  move delete comment to index.js

// TO DO

// toggle comments by clicking a '...' below first comment?
// Decide which fonts will be black / gray / bold
// restructure database with separate treatments schema.  Will make redux management much simpler
    //and simpler db queries 
    //https://github.com/reduxjs/redux/issues/432
// for comments, I should be using the data that comes back from the server to add it in
    //redux because it will give the date info.  Maybe should use it for all of them because
    //the database makes up the _id also...
// call actions from containers--make a container component for each component.
    //treatments container - treatment - comments container - comment
//comment upvote prevent 2x or more upvotes by same user client side
//move buttons to right
// pass whole props object ...this.props to children when it makes sense
// toggle upvote so users can un-upvote
//

Sample state
injuryInfo
:
author
:
{username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
description
:
"hmmm in elbow"
title
:
"Tennis Elbow"
treatments
:
Array(4)
0
:
author
:
{username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
comments
:
Array(1)
0
:
{_id: "5afa08599eb84cde8fb24aa0", posted: "2018-05-14T22:06:17.944Z", upvotes: Array(1), author: {…}, injury_id: "5af4d63f2e1dba9509e1b25f", …}
length
:
1
__proto__
:
Array(0)
description
:
"testing"
name
:
"testing"
upvotes
:
(4) ["5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb"]
_id
:
"5af4dbc4c5a6fa95dd48a675"
__proto__
:
Object
1
:
{upvotes: Array(0), author: {…}, _id: "5af585edcc1fe5a3a740ab54", name: "Milkshakes", description: "drink", …}
2
:
{upvotes: Array(0), author: {…}, _id: "5af8c90fafd81ccf05bbb6d6", name: "THis is what other people are doing", description: "", …}
3
:
{upvotes: Array(0), author: {…}, _id: "5afb3ae36a517cf3f18d7521", name: "fff", description: "", …}
length
:
4
__proto__
:
Array(0)
upvotes
:
["5a7ddf840898fd83b5c6b3bb"]
__v
:
0
_id
:
"5af4d63f2e1dba9509e1b25f"
__proto__
:
Object
injuryList
:
Array(2)
0
:
author
:
{username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
description
:
"hmmm in elbow"
title
:
"Tennis Elbow"
treatments
:
(4) [{…}, {…}, {…}, {…}]
upvotes
:
["5a7ddf840898fd83b5c6b3bb"]
__v
:
0
_id
:
"5af4d63f2e1dba9509e1b25f"
__proto__
:
Object
1
:
{treatments: Array(0), author: {…}, _id: "5af8c800afd81ccf05bbb6d5", title: "Front knee pain", description: "knee pain", …}
length
:
2
__proto__
:
Array(0)
user
:
{username: "al", id: "5a7dd