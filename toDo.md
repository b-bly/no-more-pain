# add-comment.js: does not submit on enter for edit mode
# treatment.js: 
  move delete comment to index.js

// TO DO
//x  get rid of description button
//x Upvotes on left margin -- thumbs up with vote number underneath
// toggle comments by clicking a '...' below first comment?
// Decide which fonts will be black / gray / bold
// restructure database with separate treatments schema.  Will make redux management much simpler
    //and simpler db queries 
    //https://github.com/reduxjs/redux/issues/432
// x fix styling on edit injury
// for comments, I should be using the data that comes back from the server to add it in
    //redux because it will give the date info.  Maybe should use it for all of them because
    //the database makes up the _id also...
// call actions from containers--make a container component for each component.
    //treatments container - treatment - comments container - comment
//comment upvote prevent 2x or more upvotes by same user client side
//move buttons to right
// pass whole props object ...this.props to children when it makes sense