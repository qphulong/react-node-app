wordCount = 0;
currentLength = 0;
lastChar = null;

var isAlphaOrNumber = function (ch) {
  return /^[A-Za-z0-9]$/.test(ch); //regex
};

export function textChanged(post) {
  const length = post.content.length;

  if (post.content.length > currentLength) {
    //new character typed
    if (isAlphaOrNumber(post.content.charAt(length - 1))) {
      //if character is alphabet or number
      if (lastChar == null || lastChar == " ") {
        //if last char is null (first character) or last char is space
        wordCount += 1;
      }
    }
  } else if (post.content.length < currentLength) {
    //removed character
    const currentLastChar = post.content.charAt(length - 1);

    if (length == 0 || currentLastChar == " ") {
      wordCount -= 1; //remove word count
    }
  }

  lastChar = post.content.charAt(length - 1);
}
