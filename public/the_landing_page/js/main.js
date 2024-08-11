/* IMPORTANT: Each array must have at least 1 element
  and you must remove all elements within "#rotating-words"
  and "#rotating-paragraphs".
  You can also bypass the dynamic elements entirely
  and uncomment the elements in index.html
*/
var loadDynamically = false;

/* The beginning of the header sentence has a black font.
  The headersBlack element of index i, will be added to
  the corresponding headersBlue element of index i.
  E.g. headersBlack[i] + headersBlue[i]
  headersBlack[0] + headersBlue[0]
  "Hi, I'm " + "Dan" = "Hi, I'm Dan"
  
  If one array is larger than the other, the last element
  of the smaller array will be used for the rest of the
  rotations. You can also use empty strings ""
  E.g. headersBlack[1] doesn't exist
  "Hi, I'm a student." 
*/
var headersBlack = [ //headersBlack + headersBlue, e.g. "Hi, I'm Dan"
  "Hi, I'm "
];

var headersBlue = [ //Descriptive and re-affirming words here
  "Dan.",
];

/* If true, the paragraph beneath the header will also
  rotate. If disabled, the first element of the array
  will be used for the paragraph.
  "rotating-paragraphs" div must also be of class
  "slider"
*/
var rotateParagraph = false;

/* Connects paragraph to header slider so they slide
  at the same time.
*/
var connectParagraphToHeaders = false;

/* The paragraphs to rotate between. If rotateParagraph is disabled,
  the first element also serves as the only paragraph. You can
  also use tags such as <a>, <span>, and a few more here.
*/
var rotatingParagraphs = [
  "Currently studying at Carleton University for computer science with a specialization in software engineering and a minor in applied linguistics. <span>Whew.</span>"
];

var addRotatingWords = function() {
  
  var wordsDiv = document.getElementById("rotating-words");
  var paragraphsDiv = document.getElementById("rotating-paragraphs");
  var largestArrayLength;
  
  if (!(paragraphsDiv.classList.contains("slider"))) {
    paragraphsDiv.classList.add("slider");
  }
  
  if (headersBlack.length > headersBlue.length) {
    largestArrayLength = headersBlack.length;
  } else {
    largestArrayLength = headersBlue.length;
  }
  
  for (var i = 0; i < largestArrayLength; i++) {
    var headerItem = document.createElement("div");
    var paragraphItem = document.createElement("div");
    var rotatingHeader = document.createElement("h4");
    var rotatingParagraph = document.createElement("p");
    
    headerItem.classList.add("item");
    paragraphItem.classList.add("item");
    
    if (i >= headersBlack.length) {
      headersBlack.push(headersBlack[headersBlack.length - 1]);
    } else if (i >= headersBlue.length) {
      headersBlue.push(headersBlue[headersBlue.length - 1]);
    } else if (i >= rotatingParagraphs.length) {
      rotatingParagraphs.push(rotatingParagraphs[rotatingParagraphs.length - 1]);
    }
    
    rotatingHeader.innerHTML = headersBlack[i] + "<span>" + headersBlue[i] + "</span>";
    headerItem.appendChild(rotatingHeader);
    
    rotatingParagraph.innerHTML = rotatingParagraphs[i];
    paragraphItem.appendChild(rotatingParagraph);
    
    wordsDiv.appendChild(headerItem);
    paragraphsDiv.appendChild(paragraphItem);
  }
}

if (loadDynamically) {
  addRotatingWords();
}
