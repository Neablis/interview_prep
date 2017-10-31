const isPalindrome = (word) => {
  return word === word.split("").reverse().join("");
}

const longestPalindromes = (fullString) => {
  let longest = [];

  if (fullString.length === 1 || isPalindrome(fullString)) {
    longest.push(fullString);
    return longest;
  }

  let longestCount = 0;

  for (let x = 0; x < fullString.length - 1; x++) {
    const word = fullString.slice(x, fullString.length);

    for (let y = word.length; y > 1; y--) {
      const subWord = word.slice(0, y);
      if (isPalindrome(subWord)) {
        if (subWord.length === longestCount) {
          longest.push(subWord);
          longestCount = subWord.length;
        } else if (subWord.length > longestCount) {
          longest = [];
          longest.push(subWord);
          longestCount = subWord.length;
        }
      }
    }
  }

  if (longest.length === 0) return fullString.split("");

  return longest;
}

const generateAllPermutations = (fullString) => {
  let fullLength = fullString.length;

  if (fullLength < 2) {
    return fullString;
  }

  let perms = [];

  for (let x = 0; x < fullLength; x++) {
    const char = fullString[x];

    if (fullString.indexOf(char) === x) {
      const remainingString = fullString.slice(0, x) + fullString.slice(x + 1, fullLength);

      for (let subString of generateAllPermutations(remainingString)) {
        perms.push(char + subString)
      }
    }
  }

  return perms;
}

const findLongestPermutationPalindrome = (fullString) => {
  const words = generateAllPermutations(fullString);
  let longest = 0;
  let answer = [];

  for (let x = 0; x < words.length; x++) {
    tmpAnswer = longestPalindromes(words[x]);

    if (tmpAnswer.length === 0) continue;

    if (tmpAnswer[0].length > longest) {
      longest = tmpAnswer[0].length;
      answer = addUniqueElements(answer, [])
    } else if (tmpAnswer[0].length === longest) {
      answer = addUniqueElements(answer, tmpAnswer)
    }
  }

  return answer;
}

const addUniqueElements = (arr1, arr2) => {
  let tmpArray = arr1;

  for (let x = 0; x < arr2.length; x++) {
    if (tmpArray.indexOf(arr2[x]) === -1) {
      tmpArray.push(arr2[x]);
    }
  }

  return tmpArray;
};

const test = (input, output, func) => {
  const answer = func(input).join(",");

  if (answer !== output) {
    console.error(`ERROR: \n Input: ${input} \n Output: ${output} \n Recieved: ${func(input)}`);
  } else {
    console.log(`SUCCESS: \n Input: ${input} \n Output: ${output} \n Recieved: ${func(input)}`);
  }
}

// Tests
// Testing longestPalindrome
test('racecar', 'racecar', longestPalindromes);
test('racecarff', 'racecar', longestPalindromes);
test('zyracecarxb', 'racecar', longestPalindromes);
test('abbccc', 'ccc', longestPalindromes);
test('abcdefghijklmnop', 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p', longestPalindromes);
test('a', 'a', longestPalindromes);
test('', '', longestPalindromes);

// Testing findLongestPermutationPalindrome
// console.log("Answer: racecar", `Received: ${findLongestPermutationPalindrome('racecar')}`, `Correct: ${findLongestPermutationPalindrome('racecar') === 'racecar'}`);
// console.log("Answer: racecar", `Received: ${findLongestPermutationPalindrome('racecarff')}`, `Correct: ${findLongestPermutationPalindrome('racecarff') === 'racecar'}`);
// console.log("Answer: racecar", `Received: ${findLongestPermutationPalindrome('zyracecarxb')}`, `Correct: ${findLongestPermutationPalindrome('zyracecarxb') === 'racecar'}`);
// console.log("Answer: bcccb, bcacb", `Received: ${findLongestPermutationPalindrome('abbccc')}`, `Correct: ${findLongestPermutationPalindrome('abbccc') === 'bcccb, bcacb'}`);
// console.log("Answer: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p", `Received: ${findLongestPermutationPalindrome('abcdefghijklmnop')}`, `Correct: ${findLongestPermutationPalindrome('abcdefghijklmnop') === 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p'}`);
// console.log("Answer: a", `Received: ${findLongestPermutationPalindrome('a')}`, `Correct: ${findLongestPermutationPalindrome('a') === 'a'}`);
// console.log("Answer: ", `Received: ${findLongestPermutationPalindrome('')}`, `Correct: ${findLongestPermutationPalindrome('') === ''}`);



const trie = function() {
  this.head = {};

  this.add = (word) => {
    let current = this.head;

    for (let i = 0; i < word.length; i++) {
      if(!(word[i] in current)) {
        current[word[i]] = {};
      }

      current = current[word[i]]
    };

    current.$ = 1;
  }

  this.hasWord = (word) => {
    var current = this.head;

    for (var i = 0; i < word.length; i++) {
    	let lowerCase = word[i].toLowerCase();
      if((word[i] in current)) {
      	current = current[word[i]];
        continue;
      }

			return false;
    };

    return true;
  }

  this.print = () => {
    console.log(this.sort());
  }

  this.sort =() => {
    var word = "";
    var sorted = [];

    sortTrie(this.head, word, sorted);

    function sortTrie(node, word, sorted) {
        var orderedKeys = Object.keys(node).sort();
        for(var x = 0; x < orderedKeys.length; x++) {
            letter = orderedKeys[x];
            if (letter == '$') { sorted.push(word); }
            else {
                sortTrie(node[letter], word + letter, sorted);
            }
        }
    }

    return sorted;
  }
};


trie.prototype.print = function () {
    console.log(this.head);
}

trie.prototype.sort = function() {

};

var myTrie = new trie();

myTrie.add("hello");
myTrie.add("waffle");
myTrie.add("car");
myTrie.add("bat");
myTrie.add("baseball");

myTrie.print();
console.log("First", myTrie.hasWord("hello"));
console.log("Second", myTrie.hasWord("nope"));
myTrie.sort();
