let data = {
  puzzle: [
    {
      find_words: [
        "BOWLING",
        "STUMPED",
        "FIELDER",
        "BATSMAN",
        "RUN OUT",
        "CATCH",
        "UMPIRE",
        "APPEAL",
        "BATTING",
        "SPIN",
        "TEA",
        "RUNS",
        "STUMPS",
        "BOUNDARY",
      ],
      Alphabet_grid: [
        "OUMBAMRUNOUTFHWNT",
        "SZIKQRWHZZTMATITE",
        "THERUNSHXILNNHGUA",
        "UDWZMQFBYWRPOSNFO",
        "MTIYICENJGBOWLING",
        "PUGBNAOCRRAXAYEPQ",
        "EYBONNPSPPTQWFUJR",
        "DLTCICZTPISTGKKCE",
        "KQSONZAUVIMSJBFAI",
        "LNFQGUYMIPASFAFTE",
        "OISQSKSPFHNYZTNCV",
        "QHHKASVSYXUHBTHHB",
        "HCMXJCXAMIVHOIPSJ",
        "SUMPIREWOTVEVNTPH",
        "SQHTYSVNOQSYFGJOZ",
        "HBOUNDARYAZWRIFYO",
        "QSGEDMKSLNOVDEJED",
        "TDCJEFIELDERJHDDM",
        "YARWXAFYNQSMZHDDV",
        "URJLWZGXZWSVFUXAH",
        "HSPINTAGVCVISDZUJ",
        "VNHUEVFRVAPPEALHE",
      ],
    },
    {
      find_words: [
        "HOCKEY",
        "RACE",
        "PLAYER",
        "STADIUM",
        "RUGBY",
        "TENNIS",
        "JUDO",
        "ATHLETICS",
        "FENCING",
        "SWIMMING",
        "FOOTBALL",
        "MARATHON",
        "VOLLEYBALL",
        "BASEBALL",
        "CHAMPION",
      ],
      Alphabet_grid: [
        "NNAREYALPNBWKTXL",
        "VOIXAWGYOHFOFFLK",
        "FBIZVNEHBJRZJAIE",
        "TUKPIGTABASEBALL",
        "PJCCMAXCCKXYLRRG",
        "KSNQRAQESIETGSDY",
        "VEWAYDHFTLJOQOAW",
        "FYMIUAOCLPPPNXBI",
        "FXWHMOTOYSTADIUM",
        "ATZRTMVHTZHJSIKC",
        "DQQBPTIHLYDUUEHR",
        "YIANERONQEADFJHD",
        "ZLQNUCXVGMTOFRYM",
        "LNNGKAYGYGDIXRDS",
        "TIBEZRGVQMNBCHME",
        "SYYIDVXJDTFYLSSU",
      ],
    },
  ],
};

let switchbtn = document.getElementById("play");
let switchplayer = 0;
let wordcol = data.puzzle[switchplayer].find_words.length;
let gridindex = data.puzzle[switchplayer].Alphabet_grid.length;
switchbtn.addEventListener("click", (e) => {
  // console.log(e.target.value);
  if (e.target.value != switchplayer) {
    switchplayer = e.target.value;
    wordcol = data.puzzle[switchplayer].find_words.length;
    gridindex = data.puzzle[switchplayer].Alphabet_grid.length;
    displaygrid(wordcol, gridindex, switchplayer);
  }
});

// calling display grid function to dispaly grid
displaygrid(wordcol, gridindex, switchplayer);

// declaring display grid function
function displaygrid(wordcol, gridindex, switchplayer) {
  let grid = document.querySelector(".right_down");
  grid.innerHTML = "";
  var table = document.createElement("table");
  table.setAttribute("class", "table");
  var div = document.createElement("div");
  div.setAttribute("class", "center");
  let worldmap = new Map();
  let str;
  let Array_2d = [];

  //   to making a grid
  for (let i = 0; i < gridindex; i++) {
    let array = [];
    let tr = document.createElement("tr");
    tr.setAttribute("class", "row");
    str = data.puzzle[switchplayer].Alphabet_grid[i];

    for (let j = 0; j < str.length; j++) {
      let char = str.charAt(j);
      array.push(char);
      let td = document.createElement("td");
      td.innerText = char;

      td.setAttribute("class", "cell");

      tr.appendChild(td);
    }
    table.appendChild(tr);
    Array_2d.push(array);
  }
  div.appendChild(table);
  grid.appendChild(div);

  // to make a searching world column
  let search = document.querySelector(".left2");
  search.innerHTML = "";
  for (let i = 0; i < wordcol; i++) {
    let para = document.createElement("p");
    let strword = data.puzzle[switchplayer].find_words[i];
    // worldmap.set(strword , i);
    // console.log( "str "+str.length)
    para.innerText = strword;
    search.appendChild(para);
  }

  //   to take input from the input field on click submit button
  let input = document.getElementById("in");
  let btn = document.getElementById("btn");
  let element = document.querySelectorAll(".cell");
  let result;
  btn.addEventListener("click", () => {
    result = input.value.toUpperCase();
    // console.log(result)
    patternSearch(Array_2d, result);
  });

  // console.log(Array_2d);
  let x = [-1, -1, -1, 0, 0, 1, 1, 1];

  let y = [-1, 0, 1, -1, 1, -1, 0, 1];
  let maprow = new Map();
  let mapcol = new Map();

  function patternSearch(grid, word) {
    // Consider every point as starting
    // point and search given word

    for (let row = 0; row < gridindex; row++) {
      for (let col = 0; col < str.length; col++) {
        if (search2D(grid, row, col, word)) {
            console.log(mapcol)
            console.log(maprow)
            ColorGrid()
        }
        else{
            mapcol.clear();
            maprow.clear();
        }
      }
    }
  }

  function search2D(grid, row, col, word) {
    // If first character of word
    // doesn't match with
    // given starting point in grid.
    if (grid[row][col] != word[0]){
        return false;
    } 
    else{
        mapcol.set(0,col);
        maprow.set(0,row);
        // alert("Your input is not found")
    }

    let len = word.length;

    // Search word in all 8 directions
    // starting from (row, col)
    for (let dir = 0; dir < 8; dir++) {
      // Initialize starting point
      // for current direction
      let k,
        rd = row + x[dir],
        cd = col + y[dir];

      // First character is already checked,
      // match remaining characters
      for (k = 1; k < len; k++) {
        // If out of bound break
        if (rd >= gridindex || rd < 0 || cd >= str.length || cd < 0) break;

        // If not matched, break
        if (grid[rd][cd] != word[k]) break;

        // Moving in particular direction
        maprow.set(k , rd);
        rd += x[dir];
        mapcol.set(k , cd);
        cd += y[dir];
      }

      // If all character matched,
      // then value of must
      // be equal to length of word
      if (k == len) return true;
    }
    return false;
  }


  function ColorGrid(){
    let size = mapcol.size;
    let posarr=[];
    for(let i =0;i<size;i++){
        let col = mapcol.get(i);
        let row = maprow.get(i);
        posarr.push(col+(row*str.length));
    }
    console.log(posarr);
    for(let i =0;i<posarr.length;i++){
        element[posarr[i]].style.backgroundColor = "yellow";
    }
  }


}
