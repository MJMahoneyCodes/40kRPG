//TODO
//add more comments everywhere
//talents - requirements checks
////I found that jquery .hide() function would be good for
////not showing talents that you don't have the keyword or
////requirements for
//wealth and equipment
//fix calculateExperience function to remove the god-awful IFs

var button = document.getElementById("addKeyword");
button.addEventListener("click", addKeyword); //adds the click function, which runs addKeyword

var keywordArray = []; //this will eventually hold all the character's keywords, like IMPERIUM or CHAOS

function addKeyword(){ 
    var ul = document.getElementById("keywords"); //finds the empty ul element (that will later hold keywords)
    var li = document.createElement("li"); //give me a new li, to later add to the ul
    var input = document.getElementById("keywordInput"); //find the "enter keyword" text box
    var newButton = document.createElement("button"); //this will be the delete button added to new keyword value
    var typedKeyword = input.value; //get the value from the "enter keyword" text box
    var upperKeyword = typedKeyword.toUpperCase(); //make the entered value upper case
    
    if (input.value =="") {
        console.log("Keyword was blank, didn't add it.");
    } else {
        li.appendChild(document.createTextNode(upperKeyword)); //adds the text of the keyword to the li
        ul.appendChild(li); //adds the new li, with text, to the ul
        keywordArray.push(li.firstChild.textContent); //adds the value to the keyword array
        //li.classList.add("keywords"); //adds the class for finding later, don't think I need this, actually
        input.value = ""; //blanks out the "Enter keyword" text box
        newButton.classList.add("delete"); //adds the "delete" class to the delete buttons
                                           //so that I can find them later to enable them
        newButton.innerHTML ="Delete"; //adds the text "Delete" to the button
        li.appendChild(newButton); //puts a "Delete" button next to the newly added keyword
        enableDeleteButtons(); //this finds all the delete buttons and makes them function on a click

        console.log("Current keywords are: " + keywordArray);
    }
}

//deleteButton is a collection of HTML elements, so I had
//to turn it into an array to use forEach
//I have to do this to add the click functionality to the newly created keyword item delete buttons
function enableDeleteButtons(){
    var deleteButton = document.getElementsByClassName("delete"); //finds all the delete buttons (they have class "delete")
    Array.from(deleteButton).forEach (button => { //makes the array, loops through buttons, adding click events
    button.addEventListener("click", function(){
        //removes the current keyword value from the keywords array
        const newArr = keywordArray.filter(e => e !== button.parentNode.firstChild.textContent);
        keywordArray = newArr; //updates keywordArray with new values (entry removed)
        button.parentNode.remove(); //deletes the li that was created when the keyword was added
        console.log("Current keywords are: " + keywordArray);
    })    
    })
}

//minimum Rating of 1 for each attribute
//Attribute maximums are defined by species (Ork, Primaris, Human, etc.)
//12 is the maximum attribute for any species
//A lot of this function is validation of ratings by species
//Calculation of attribute total is done at the end
//
//When calling this, you pass in one of the attributes, such as "strength" or "toughness"
//The HTML id's of these elements follow the pattern "attributeRating" or "attributeBonus"
//such as "strengthRating" or "agilityBonus"
function calculateAttributeTotal(item){
    if (isNaN(document.getElementById(item+"Rating").value)) {
        document.getElementById(item+"Rating").value = 1;
        alert(item[0].toUpperCase() + item.substring(1) + " Rating needs to be a numeric value.");
        return;
    }
    
    if (isNaN(document.getElementById(item+"Bonus").value)) {
        document.getElementById(item+"Bonus").value = 1;
        alert(item[0].toUpperCase() + item.substring(1) + " Bonus needs to be a numeric value.")
        return;
    }
    
    if (document.getElementById("species").value == "human") {
        if (document.getElementById(item+"Rating").value > 8) {
            document.getElementById(item+"Rating").value = 8;
            alert(item[0].toUpperCase() + item.substring(1) + " Rating for humans cannot be greater than 8.");
        }
    }

    if (document.getElementById("species").value == "ork") {
        if (document.getElementById("strengthRating").value > 12) {
            document.getElementById("strengthRating").value = 12;
            alert("Strength Rating for orks cannot be greater than 12.");
        }
        if (document.getElementById("toughnessRating").value > 12) {
            document.getElementById("toughnessRating").value = 12;
            alert("Toughness Rating for orks cannot be greater than 12.");
        }
        if (document.getElementById("agilityRating").value > 7) {
            document.getElementById("agilityRating").value = 7;
            alert("Agility Rating for orks cannot be greater than 7.");
        }
        if (document.getElementById("initiativeRating").value > 7) {
            document.getElementById("initiativeRating").value = 7;
            alert("Initiative Rating for orks cannot be greater than 7.");
        }
        if (document.getElementById("willpowerRating").value > 8) {
            document.getElementById("willpowerRating").value = 8;
            alert("Willpower Rating for orks cannot be greater than 8.");
        }
        if (document.getElementById("intellectRating").value > 7) {
            document.getElementById("intellectRating").value = 7;
            alert("Intellect Rating for orks cannot be greater than 7.");
        }
        if (document.getElementById("fellowshipRating").value > 7) {
            document.getElementById("fellowshipRating").value = 7;
            alert("Fellowship Rating for orks cannot be greater than 7.");
        }
    }

    if (document.getElementById("species").value == "aeldari") {
        if (document.getElementById("strengthRating").value > 7) {
            document.getElementById("strengthRating").value = 7;
            alert("Strength Rating for aeldari cannot be greater than 7.");
        }
        if (document.getElementById("toughnessRating").value > 7) {
            document.getElementById("toughnessRating").value = 7;
            alert("Toughness Rating for aeldari cannot be greater than 7.");
        }
        if (document.getElementById("agilityRating").value > 12) {
            document.getElementById("agilityRating").value = 12;
            alert("Agility Rating for aeldari cannot be greater than 12.");
        }
        if (document.getElementById("initiativeRating").value > 12) {
            document.getElementById("initiativeRating").value = 12;
            alert("Initiative Rating for aeldari cannot be greater than 12.");
        }
        if (document.getElementById("willpowerRating").value > 12) {
            document.getElementById("willpowerRating").value = 12;
            alert("Willpower Rating for aeldari cannot be greater than 12.");
        }
        if (document.getElementById("intellectRating").value > 10) {
            document.getElementById("intellectRating").value = 10;
            alert("Intellect Rating for aeldari cannot be greater than 10.");
        }
        if (document.getElementById("fellowshipRating").value > 6) {
            document.getElementById("fellowshipRating").value = 6;
            alert("Fellowship Rating for aeldari cannot be greater than 6.");
        }
    }

    if (document.getElementById("species").value == "adeptus") {
        if (document.getElementById("strengthRating").value > 10) {
            document.getElementById("strengthRating").value = 10;
            alert("Strength Rating for adeptus astartes cannot be greater than 10.");
        }
        if (document.getElementById("toughnessRating").value > 10) {
            document.getElementById("toughnessRating").value = 10;
            alert("Toughness Rating for adeptus astartes cannot be greater than 10.");
        }
        if (document.getElementById("agilityRating").value > 9) {
            document.getElementById("agilityRating").value = 9;
            alert("Agility Rating for adeptus astartes cannot be greater than 9.");
        }
        if (document.getElementById("initiativeRating").value > 9) {
            document.getElementById("initiativeRating").value = 9;
            alert("Initiative Rating for adeptus astartes cannot be greater than 9.");
        }
        if (document.getElementById("willpowerRating").value > 10) {
            document.getElementById("willpowerRating").value = 10;
            alert("Willpower Rating for adeptus astartes cannot be greater than 10.");
        }
        if (document.getElementById("intellectRating").value > 10) {
            document.getElementById("intellectRating").value = 10;
            alert("Intellect Rating for adeptus astartes cannot be greater than 10.");
        }
        if (document.getElementById("fellowshipRating").value > 8) {
            document.getElementById("fellowshipRating").value = 8;
            alert("Fellowship Rating for adeptus astartes cannot be greater than 8.");
        }
    }

    if (document.getElementById("species").value == "primaris") {
        if (document.getElementById("strengthRating").value > 12) {
            document.getElementById("strengthRating").value = 12;
            alert("Strength Rating for primaris astartes cannot be greater than 12.");
        }
        if (document.getElementById("toughnessRating").value > 12) {
            document.getElementById("toughnessRating").value = 12;
            alert("Toughness Rating for primaris astartes cannot be greater than 12.");
        }
        if (document.getElementById("agilityRating").value > 9) {
            document.getElementById("agilityRating").value = 9;
            alert("Agility Rating for primaris astartes cannot be greater than 9.");
        }
        if (document.getElementById("initiativeRating").value > 9) {
            document.getElementById("initiativeRating").value = 9;
            alert("Initiative Rating for primaris astartes cannot be greater than 9.");
        }
        if (document.getElementById("willpowerRating").value > 10) {
            document.getElementById("willpowerRating").value = 10;
            alert("Willpower Rating for primaris astartes cannot be greater than 10.");
        }
        if (document.getElementById("intellectRating").value > 10) {
            document.getElementById("intellectRating").value = 10;
            alert("Intellect Rating for primaris astartes cannot be greater than 10.");
        }
        if (document.getElementById("fellowshipRating").value > 8) {
            document.getElementById("fellowshipRating").value = 8;
            alert("Fellowship Rating for primaris astartes cannot be greater than 8.");
        }
    }

    //no rating for any species can be greater than 12
    if (Number(document.getElementById(item+"Rating").value) > 12) {
        document.getElementById(item+"Rating").value = 12;
        alert(item[0].toUpperCase() + item.substring(1) + " Rating has a maximum value of 12.")
    }

    //this is the actual attribute calculation
    //adds the value in Rating to value of Bonus to return value of Total
    document.getElementById(item+"Total").textContent = Number(document.getElementById(item+"Rating").value) + Number(document.getElementById(item+"Bonus").value);


    setSkillBase();

    calculateExperience();
}

function calculateSkillTotal(skill){
    if (isNaN(document.getElementById(skill+"Rating").value)) {
        document.getElementById(skill+"Rating").value = 0;
        alert(skill[0].toUpperCase() + skill.substring(1) + " Rating needs to be a numeric value.");
        return;
    }

    document.getElementById(skill+"Total").textContent = Number(document.getElementById(skill+"Rating").value) + 
        Number(document.getElementById(skill+"Base").textContent);

        calculateExperience();
}

//this completely recalculates all experience each time it's called
//Adding to attribute ratings, skill ratings, and talents all affect experience cost
//Selecting a species will set the minimum attribute ratings, and also affect experience cost
//There's got to be a better way than using the IF blocks for each attribute and skill
function calculateExperience(){
    var experience = 0;
    var strength = Number(document.getElementById("strengthRating").value);
    var toughness = Number(document.getElementById("toughnessRating").value);
    var agility = Number(document.getElementById("agilityRating").value);
    var initiative = Number(document.getElementById("initiativeRating").value);
    var willpower = Number(document.getElementById("willpowerRating").value);
    var intellect = Number(document.getElementById("intellectRating").value);
    var fellowship = Number(document.getElementById("fellowshipRating").value);
    //this doesn't work
    //var attributeArray = [strength,toughness,agility,initiative,willpower,intellect,fellowship];
    
    var strengthXP = 0;
    var toughnessXP = 0;
    var agilityXP = 0;
    var initiativeXP = 0;
    var willpowerXP = 0;
    var intellectXP = 0;
    var fellowshipXP = 0;
    //this doesn't work
    //var attributeXPArray = [strengthXP,toughnessXP,agilityXP,initiativeXP,
    //    willpowerXP,intellectXP,fellowshipXP];

    var athletics = Number(document.getElementById("athleticsRating").value);
    var awareness = Number(document.getElementById("awarenessRating").value);
    var ballisticSkill = Number(document.getElementById("ballisticSkillRating").value);
    var cunning = Number(document.getElementById("cunningRating").value);
    var deception = Number(document.getElementById("deceptionRating").value);
    var insight = Number(document.getElementById("insightRating").value);
    var intimidation = Number(document.getElementById("intimidationRating").value);
    var investigation = Number(document.getElementById("investigationRating").value);
    var leadership = Number(document.getElementById("leadershipRating").value);
    var medicae = Number(document.getElementById("medicaeRating").value);
    var persuasion = Number(document.getElementById("persuasionRating").value);
    var pilot = Number(document.getElementById("pilotRating").value);
    var psychicMastery = Number(document.getElementById("psychicMasteryRating").value);
    var scholar = Number(document.getElementById("scholarRating").value);
    var stealth = Number(document.getElementById("stealthRating").value);
    var survival = Number(document.getElementById("survivalRating").value);
    var tech = Number(document.getElementById("techRating").value);
    var weaponSkill = Number(document.getElementById("weaponSkillRating").value);

    var athleticsXP = 0;
    var awarenessXP = 0;
    var ballisticSkillXP = 0;
    var cunningXP = 0;
    var deceptionXP = 0;
    var insightXP = 0;
    var intimidationXP = 0;
    var investigationXP = 0;
    var leadershipXP = 0;
    var medicaeXP = 0;
    var persuasionXP = 0;
    var pilotXP = 0;
    var psychicMasteryXP = 0;
    var scholarXP = 0;
    var stealthXP = 0;
    var survivalXP = 0;
    var techXP = 0;
    var weaponSkillXP = 0;

    //I don't like all these if statements, but I can't find the pattern
    //of how an attribute rating relates to an XP cost.

    // for (i = 0; i < attributeArray.length; i++) {
        
    //     if (attributeArray[i] == 1) {
    //         attributeXPArray[i] = 0;
    //     } else if (attributeArray[i] == 2) {
    //         attributeXPArray[i] = 4;
    //     } else if (attributeArray[i] == 3) {
    //         attributeXPArray[i] = 10;
    //     } else if (attributeArray[i] == 4) {
    //         attributeXPArray[i] = 20;
    //     } else if (attributeArray[i] == 5) {
    //         attributeXPArray[i] = 35;
    //     } else if (attributeArray[i] == 6) {
    //         attributeXPArray[i] = 55;
    //     } else if (attributeArray[i] == 7) {
    //         attributeXPArray[i] = 80;
    //     } else if (attributeArray[i] == 8) {
    //         attributeXPArray[i] = 110;
    //     } else if (attributeArray[i] == 9) {
    //         attributeXPArray[i] = 145;
    //     } else if (attributeArray[i] == 10) {
    //         attributeXPArray[i] = 185;
    //     } else if (attributeArray[i] == 11) {
    //         attributeXPArray[i] = 230;
    //     } else if (attributeArray[i] == 12) {
    //         attributeXPArray[i] = 280;
    //     } else {
    //         attributeXPArray[i] = 0;
    //     }
    // }

    


    if (strength == 1) {
        strengthXP = 0;
    } else if (strength == 2) {
        strengthXP = 4;
    } else if (strength == 3) {
        strengthXP = 10;
    } else if (strength == 4) {
        strengthXP = 20;
    } else if (strength == 5) {
        strengthXP = 35;
    } else if (strength == 6) {
        strengthXP = 55;
    } else if (strength == 7) {
        strengthXP = 80;
    } else if (strength == 8) {
        strengthXP = 110;
    } else if (strength == 9) {
        strengthXP = 145;
    } else if (strength == 10) {
        strengthXP = 185;
    } else if (strength == 11) {
        strengthXP = 230;
    } else if (strength == 12) {
        strengthXP = 280;
    } else {
        strengthXP = 0;
    }

    if (toughness == 1) {
        toughnessXP = 0;
    } else if (toughness == 2) {
        toughnessXP = 4;
    } else if (toughness == 3) {
        toughnessXP = 10;
    } else if (toughness == 4) {
        toughnessXP = 20;
    } else if (toughness == 5) {
        toughnessXP = 35;
    } else if (toughness == 6) {
        toughnessXP = 55;
    } else if (toughness == 7) {
        toughnessXP = 80;
    } else if (toughness == 8) {
        toughnessXP = 110;
    } else if (toughness == 9) {
        toughnessXP = 145;
    } else if (toughness == 10) {
        toughnessXP = 185;
    } else if (toughness == 11) {
        toughnessXP = 230;
    } else if (toughness == 12) {
        toughnessXP = 280;
    } else {
        toughnessXP = 0;
    }

    if (agility == 1) {
        agilityXP = 0;
    } else if (agility == 2) {
        agilityXP = 4;
    } else if (agility == 3) {
        agilityXP = 10;
    } else if (agility == 4) {
        agilityXP = 20;
    } else if (agility == 5) {
        agilityXP = 35;
    } else if (agility == 6) {
        agilityXP = 55;
    } else if (agility == 7) {
        agilityXP = 80;
    } else if (agility == 8) {
        agilityXP = 110;
    } else if (agility == 9) {
        agilityXP = 145;
    } else if (agility == 10) {
        agilityXP = 185;
    } else if (agility == 11) {
        agilityXP = 230;
    } else if (agility == 12) {
        agilityXP = 280;
    } else {
        agilityXP = 0;
    }

    if (initiative == 1) {
        initiativeXP = 0;
    } else if (initiative == 2) {
        initiativeXP = 4;
    } else if (initiative == 3) {
        initiativeXP = 10;
    } else if (initiative == 4) {
        initiativeXP = 20;
    } else if (initiative == 5) {
        initiativeXP = 35;
    } else if (initiative == 6) {
        initiativeXP = 55;
    } else if (initiative == 7) {
        initiativeXP = 80;
    } else if (initiative == 8) {
        initiativeXP = 110;
    } else if (initiative == 9) {
        initiativeXP = 145;
    } else if (initiative == 10) {
        initiativeXP = 185;
    } else if (initiative == 11) {
        initiativeXP = 230;
    } else if (initiative == 12) {
        initiativeXP = 280;
    } else {
        initiativeXP = 0;
    }

    if (willpower == 1) {
        willpowerXP = 0;
    } else if (willpower == 2) {
        willpowerXP = 4;
    } else if (willpower == 3) {
        willpowerXP = 10;
    } else if (willpower == 4) {
        willpowerXP = 20;
    } else if (willpower == 5) {
        willpowerXP = 35;
    } else if (willpower == 6) {
        willpowerXP = 55;
    } else if (willpower == 7) {
        willpowerXP = 80;
    } else if (willpower == 8) {
        willpowerXP = 110;
    } else if (willpower == 9) {
        willpowerXP = 145;
    } else if (willpower == 10) {
        willpowerXP = 185;
    } else if (willpower == 11) {
        willpowerXP = 230;
    } else if (willpower == 12) {
        willpowerXP = 280;
    } else {
        willpowerXP = 0;
    }

    if (intellect == 1) {
        intellectXP = 0;
    } else if (intellect == 2) {
        intellectXP = 4;
    } else if (intellect == 3) {
        intellectXP = 10;
    } else if (intellect == 4) {
        intellectXP = 20;
    } else if (intellect == 5) {
        intellectXP = 35;
    } else if (intellect == 6) {
        intellectXP = 55;
    } else if (intellect == 7) {
        intellectXP = 80;
    } else if (intellect == 8) {
        intellectXP = 110;
    } else if (intellect == 9) {
        intellectXP = 145;
    } else if (intellect == 10) {
        intellectXP = 185;
    } else if (intellect == 11) {
        intellectXP = 230;
    } else if (intellect == 12) {
        intellectXP = 280;
    } else {
        intellectXP = 0;
    }

    if (fellowship == 1) {
        fellowshipXP = 0;
    } else if (fellowship == 2) {
        fellowshipXP = 4;
    } else if (fellowship == 3) {
        fellowshipXP = 10;
    } else if (fellowship == 4) {
        fellowshipXP = 20;
    } else if (fellowship == 5) {
        fellowshipXP = 35;
    } else if (fellowship == 6) {
        fellowshipXP = 55;
    } else if (fellowship == 7) {
        fellowshipXP = 80;
    } else if (fellowship == 8) {
        fellowshipXP = 110;
    } else if (fellowship == 9) {
        fellowshipXP = 145;
    } else if (fellowship == 10) {
        fellowshipXP = 185;
    } else if (fellowship == 11) {
        fellowshipXP = 230;
    } else if (fellowship == 12) {
        fellowshipXP = 280;
    } else {
        fellowshipXP = 0;
    }

    //there doesn't seem to be a pattern to follow in the rulebook
    if (athletics == 1) {
        athleticsXP = 2;
    } else if (athletics == 2) {
        athleticsXP = 6;
    } else if (athletics == 3) {
        athleticsXP = 12;
    } else if (athletics == 4) {
        athleticsXP = 18;
    } else if (athletics == 5) {
        athleticsXP = 30;
    } else if (athletics == 6) {
        athleticsXP = 42;
    } else if (athletics == 7) {
        athleticsXP = 56;
    } else if (athletics == 8) {
        athleticsXP = 72;
    } else {
        athleticsXP = 0;
    }

    if (awareness == 1) {
        awarenessXP = 2;
    } else if (awareness == 2) {
        awarenessXP = 6;
    } else if (awareness == 3) {
        awarenessXP = 12;
    } else if (awareness == 4) {
        awarenessXP = 18;
    } else if (awareness == 5) {
        awarenessXP = 30;
    } else if (awareness == 6) {
        awarenessXP = 42;
    } else if (awareness == 7) {
        awarenessXP = 56;
    } else if (awareness == 8) {
        awarenessXP = 72;
    } else {
        awarenessXP = 0;
    }

    if (ballisticSkill == 1) {
        ballisticSkillXP = 2;
    } else if (ballisticSkill == 2) {
        ballisticSkillXP = 6;
    } else if (ballisticSkill == 3) {
        ballisticSkillXP = 12;
    } else if (ballisticSkill == 4) {
        ballisticSkillXP = 18;
    } else if (ballisticSkill == 5) {
        ballisticSkillXP = 30;
    } else if (ballisticSkill == 6) {
        ballisticSkillXP = 42;
    } else if (ballisticSkill == 7) {
        ballisticSkillXP = 56;
    } else if (ballisticSkill == 8) {
        ballisticSkillXP = 72;
    } else {
        ballisticSkillXP = 0;
    }

    if (cunning == 1) {
        cunningXP = 2;
    } else if (cunning == 2) {
        cunningXP = 6;
    } else if (cunning == 3) {
        cunningXP = 12;
    } else if (cunning == 4) {
        cunningXP = 18;
    } else if (cunning == 5) {
        cunningXP = 30;
    } else if (cunning == 6) {
        cunningXP = 42;
    } else if (cunning == 7) {
        cunningXP = 56;
    } else if (cunning == 8) {
        cunningXP = 72;
    } else {
        cunningXP = 0;
    }

    if (deception == 1) {
        deceptionXP = 2;
    } else if (deception == 2) {
        deceptionXP = 6;
    } else if (deception == 3) {
        deceptionXP = 12;
    } else if (deception == 4) {
        deceptionXP = 18;
    } else if (deception == 5) {
        deceptionXP = 30;
    } else if (deception == 6) {
        deceptionXP = 42;
    } else if (deception == 7) {
        deceptionXP = 56;
    } else if (deception == 8) {
        deceptionXP = 72;
    } else {
        deceptionXP = 0;
    }
    if (insight == 1) {
        insightXP = 2;
    } else if (insight == 2) {
        insightXP = 6;
    } else if (insight == 3) {
        insightXP = 12;
    } else if (insight == 4) {
        insightXP = 18;
    } else if (insight == 5) {
        insightXP = 30;
    } else if (insight == 6) {
        insightXP = 42;
    } else if (insight == 7) {
        insightXP = 56;
    } else if (insight == 8) {
        insightXP = 72;
    } else {
        insightXP = 0;
    }
    if (intimidation == 1) {
        intimidationXP = 2;
    } else if (intimidation == 2) {
        intimidationXP = 6;
    } else if (intimidation == 3) {
        intimidationXP = 12;
    } else if (intimidation == 4) {
        intimidationXP = 18;
    } else if (intimidation == 5) {
        intimidationXP = 30;
    } else if (intimidation == 6) {
        intimidationXP = 42;
    } else if (intimidation == 7) {
        intimidationXP = 56;
    } else if (intimidation == 8) {
        intimidationXP = 72;
    } else {
        intimidationXP = 0;
    }

    if (investigation == 1) {
        investigationXP = 2;
    } else if (investigation == 2) {
        investigationXP = 6;
    } else if (investigation == 3) {
        investigationXP = 12;
    } else if (investigation == 4) {
        investigationXP = 18;
    } else if (investigation == 5) {
        investigationXP = 30;
    } else if (investigation == 6) {
        investigationXP = 42;
    } else if (investigation == 7) {
        investigationXP = 56;
    } else if (investigation == 8) {
        investigationXP = 72;
    } else {
        investigationXP = 0;
    }
    if (leadership == 1) {
        leadershipXP = 2;
    } else if (leadership == 2) {
        leadershipXP = 6;
    } else if (leadership == 3) {
        leadershipXP = 12;
    } else if (leadership == 4) {
        leadershipXP = 18;
    } else if (leadership == 5) {
        leadershipXP = 30;
    } else if (leadership == 6) {
        leadershipXP = 42;
    } else if (leadership == 7) {
        leadershipXP = 56;
    } else if (leadership == 8) {
        leadershipXP = 72;
    } else {
        leadershipXP = 0;
    }
    
    if (medicae == 1) {
        medicaeXP = 2;
    } else if (medicae == 2) {
        medicaeXP = 6;
    } else if (medicae == 3) {
        medicaeXP = 12;
    } else if (medicae == 4) {
        medicaeXP = 18;
    } else if (medicae == 5) {
        medicaeXP = 30;
    } else if (medicae == 6) {
        medicaeXP = 42;
    } else if (medicae == 7) {
        medicaeXP = 56;
    } else if (medicae == 8) {
        medicaeXP = 72;
    } else {
        medicaeXP = 0;
    }

    if (persuasion == 1) {
        persuasionXP = 2;
    } else if (persuasion == 2) {
        persuasionXP = 6;
    } else if (persuasion == 3) {
        persuasionXP = 12;
    } else if (persuasion == 4) {
        persuasionXP = 18;
    } else if (persuasion == 5) {
        persuasionXP = 30;
    } else if (persuasion == 6) {
        persuasionXP = 42;
    } else if (persuasion == 7) {
        persuasionXP = 56;
    } else if (persuasion == 8) {
        persuasionXP = 72;
    } else {
        persuasionXP = 0;
    }

    if (pilot == 1) {
        pilotXP = 2;
    } else if (pilot == 2) {
        pilotXP = 6;
    } else if (pilot == 3) {
        pilotXP = 12;
    } else if (pilot == 4) {
        pilotXP = 18;
    } else if (pilot == 5) {
        pilotXP = 30;
    } else if (pilot == 6) {
        pilotXP = 42;
    } else if (pilot == 7) {
        pilotXP = 56;
    } else if (pilot == 8) {
        pilotXP = 72;
    } else {
        pilotXP = 0;
    }

    if (psychicMastery == 1) {
        psychicMasteryXP = 2;
    } else if (psychicMastery == 2) {
        psychicMasteryXP = 6;
    } else if (psychicMastery == 3) {
        psychicMasteryXP = 12;
    } else if (psychicMastery == 4) {
        psychicMasteryXP = 18;
    } else if (psychicMastery == 5) {
        psychicMasteryXP = 30;
    } else if (psychicMastery == 6) {
        psychicMasteryXP = 42;
    } else if (psychicMastery == 7) {
        psychicMasteryXP = 56;
    } else if (psychicMastery == 8) {
        psychicMasteryXP = 72;
    } else {
        psychicMasteryXP = 0;
    }

    if (scholar == 1) {
        scholarXP = 2;
    } else if (scholar == 2) {
        scholarXP = 6;
    } else if (scholar == 3) {
        scholarXP = 12;
    } else if (scholar == 4) {
        scholarXP = 18;
    } else if (scholar == 5) {
        scholarXP = 30;
    } else if (scholar == 6) {
        scholarXP = 42;
    } else if (scholar == 7) {
        scholarXP = 56;
    } else if (scholar == 8) {
        scholarXP = 72;
    } else {
        scholarXP = 0;
    }

    if (stealth == 1) {
        stealthXP = 2;
    } else if (stealth == 2) {
        stealthXP = 6;
    } else if (stealth == 3) {
        stealthXP = 12;
    } else if (stealth == 4) {
        stealthXP = 18;
    } else if (stealth == 5) {
        stealthXP = 30;
    } else if (stealth == 6) {
        stealthXP = 42;
    } else if (stealth == 7) {
        stealthXP = 56;
    } else if (stealth == 8) {
        stealthXP = 72;
    } else {
        stealthXP = 0;
    }

    if (survival == 1) {
        survivalXP = 2;
    } else if (survival == 2) {
        survivalXP = 6;
    } else if (survival == 3) {
        survivalXP = 12;
    } else if (survival == 4) {
        survivalXP = 18;
    } else if (survival == 5) {
        survivalXP = 30;
    } else if (survival == 6) {
        survivalXP = 42;
    } else if (survival == 7) {
        survivalXP = 56;
    } else if (survival == 8) {
        survivalXP = 72;
    } else {
        survivalXP = 0;
    }

    if (tech == 1) {
        techXP = 2;
    } else if (tech == 2) {
        techXP = 6;
    } else if (tech == 3) {
        techXP = 12;
    } else if (tech == 4) {
        techXP = 18;
    } else if (tech == 5) {
        techXP = 30;
    } else if (tech == 6) {
        techXP = 42;
    } else if (tech == 7) {
        techXP = 56;
    } else if (tech == 8) {
        techXP = 72;
    } else {
        techXP = 0;
    }

    if (weaponSkill == 1) {
        weaponSkillXP = 2;
    } else if (weaponSkill == 2) {
        weaponSkillXP = 6;
    } else if (weaponSkill == 3) {
        weaponSkillXP = 12;
    } else if (weaponSkill == 4) {
        weaponSkillXP = 18;
    } else if (weaponSkill == 5) {
        weaponSkillXP = 30;
    } else if (weaponSkill == 6) {
        weaponSkillXP = 42;
    } else if (weaponSkill == 7) {
        weaponSkillXP = 56;
    } else if (weaponSkill == 8) {
        weaponSkillXP = 72;
    } else {
        weaponSkillXP = 0;
    }

    //experience from Talents
    if (document.getElementsByName("acuteSense")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("angelOfDeath")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("armourbane")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("augmetic1")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("augmetic2")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("augmetic3")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("augmetic4")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("augmetic5")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("betrayer")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("berzerker")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("binaryChatter")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("blindfighter")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("bloodMustFlow")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("bombardment")[0].checked){
        experience = experience + 40;
    }

    if (document.getElementsByName("brutalist")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("chaosFamiliar")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("conversationalCogitator")[0].checked){
        experience = experience + 10;
    }

    if (document.getElementsByName("counterAttack")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("deadshot")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("deathOrGlory")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("deductive")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("devotees")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("dieHard")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("dirtyFighter")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("disciplineSavant")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("disturbingVoice")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("dualWield")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("dutyUntilDeath")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("eliminator")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("escapeArtist")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("everVigilant")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("favouredByTheWarp")[0].checked){
        experience = experience + 40;
    }

    if (document.getElementsByName("fear")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("fearless")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("feelNoPain")[0].checked){
        experience = experience + 40;
    }

    if (document.getElementsByName("flagellant")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("frenzy")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("furiousCharge")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("gallowsHumour")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("hardy")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("hatred")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("hiveExplorer")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("jargon")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("legacyOfSorrow")[0].checked){
        experience = experience + 20;
    }
    
    if (document.getElementsByName("letTheGalaxyBurn")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("lipReader")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("lobotomisedEfficiency")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("loremaster")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("markOfChaos")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("masteredPaths")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("mimicVoice")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("mobRule")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("moreDakka")[0].checked){
        experience = experience + 35;
    }

    if (document.getElementsByName("noblePeer")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("orthopraxy")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("paranoid")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("primarisPerspective")[0].checked){
        experience = experience + 40;
    }

    if (document.getElementsByName("promethiumProficiency")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("riteOfFear")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("riteOfMagnometrics")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("riteOfPureThought")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("scumSavvy")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("secretIdentity")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("sidestep")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("silent")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("simultaneousStrike")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("smashAttack")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("specialWeaponsTrooper")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("stoic")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("stormOfDeath")[0].checked){
        experience = experience + 30;
    }

    //
    if (document.getElementsByName("supplicant")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("supremePresence")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("tenacious")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("theFleshIsWeak")[0].checked){
        experience = experience + 30;
    }

    if (document.getElementsByName("touchedByFate")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("trademarkWeapon")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("transhuman")[0].checked){
        experience = experience + 60;
    }

    if (document.getElementsByName("twinFocus")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("uncannyTrait")[0].checked){
        experience = experience + 40;
    }

    if (document.getElementsByName("unnaturalSkill")[0].checked){
        experience = experience + 60;
    }

    if (document.getElementsByName("unremarkable")[0].checked){
        experience = experience + 20;
    }

    if (document.getElementsByName("warpedMind")[0].checked){
        experience = experience + 30;
    }

    experience = 
        experience + 
        //attributes    
        strengthXP + 
        toughnessXP +
        agilityXP +
        initiativeXP +
        willpowerXP +
        intellectXP +
        fellowshipXP +
        //skills
        athleticsXP +
        awarenessXP +
        ballisticSkillXP +
        cunningXP +
        deceptionXP +
        insightXP +
        intimidationXP +
        investigationXP +
        leadershipXP +
        medicaeXP +
        persuasionXP +
        pilotXP +
        psychicMasteryXP +
        scholarXP +
        stealthXP +
        survivalXP +
        techXP +
        weaponSkillXP;

    treeOfLearningCheck();

    document.getElementById("experienceUsed").textContent = experience + " experience used";

}

function treeOfLearningCheck(){
    //a character must have experience (any rating) in a number of skills equal to their highest rated skill
    //so if a character's highest rating in a skill is 8, they must have at least 8 skills with a rating >= 1

    var athletics = Number(document.getElementById("athleticsRating").value);
    var awareness = Number(document.getElementById("awarenessRating").value);
    var ballisticSkill = Number(document.getElementById("ballisticSkillRating").value);
    var cunning = Number(document.getElementById("cunningRating").value);
    var deception = Number(document.getElementById("deceptionRating").value);
    var insight = Number(document.getElementById("insightRating").value);
    var intimidation = Number(document.getElementById("intimidationRating").value);
    var investigation = Number(document.getElementById("investigationRating").value);
    var leadership = Number(document.getElementById("leadershipRating").value);
    var medicae = Number(document.getElementById("medicaeRating").value);
    var persuasion = Number(document.getElementById("persuasionRating").value);
    var pilot = Number(document.getElementById("pilotRating").value);
    var psychicMastery = Number(document.getElementById("psychicMasteryRating").value);
    var scholar = Number(document.getElementById("scholarRating").value);
    var stealth = Number(document.getElementById("stealthRating").value);
    var survival = Number(document.getElementById("survivalRating").value);
    var tech = Number(document.getElementById("techRating").value);
    var weaponSkill = Number(document.getElementById("weaponSkillRating").value);
    
    var highestSkill = 0;
    var numberOfSkills = 0;
    
    highestSkill = Math.max(athletics, awareness, ballisticSkill, cunning, deception, insight, intimidation, investigation,
        leadership, medicae, persuasion, pilot, psychicMastery, scholar, stealth, survival, tech, weaponSkill)

    if (athletics > 0) {
        numberOfSkills++;
    }
    if (awareness > 0) {
        numberOfSkills++;
    }
    if (ballisticSkill > 0) {
        numberOfSkills++;
    }
    if (cunning > 0) {
        numberOfSkills++;
    }
    if (deception > 0) {
        numberOfSkills++
    }
    if (insight > 0) {
        numberOfSkills++;
    }
    if (intimidation > 0) {
        numberOfSkills++;
    }
    if (investigation > 0 ) {
        numberOfSkills++;
    }
    if (leadership > 0) {
        numberOfSkills++;
    }
    if (medicae > 0) {
        numberOfSkills++;
    }
    if (persuasion > 0) {
        numberOfSkills++
    }
    if (pilot > 0) {
        numberOfSkills++;
    }
    if (psychicMastery > 0) {
        numberOfSkills++;
    }
    if (scholar > 0) {
        numberOfSkills++;
    }
    if (stealth > 0) {
        numberOfSkills++;
    }
    if (survival > 0) {
        numberOfSkills++;
    }
    if (tech > 0) {
        numberOfSkills++;
    }
    if (weaponSkill > 0) {
        numberOfSkills++;
    }

    if (highestSkill > numberOfSkills) {
        //document.getElementById("treeOfLearning").innerHTML = "INVALID <span class='tooltiptext'>You must have a rating of at least 1 in as many skills as your highest skill rating.</span>";
        document.getElementById("treeOfLearning").textContent = "INVALID - You must have at least rating 1 in as many skills as your highest rating";
        document.getElementById("treeOfLearning").classList.remove("valid");
        document.getElementById("treeOfLearning").classList.add("invalid");
    } else {
        //document.getElementById("treeOfLearning").innerHTML = "VALID <span class='tooltiptext'>You must have a rating of at least 1 in as many skills as your highest skill rating.</span>";
        document.getElementById("treeOfLearning").textContent = "VALID";
        document.getElementById("treeOfLearning").classList.remove("invalid");
        document.getElementById("treeOfLearning").classList.add("valid");
    }

    console.log("Tree of Learning check performed.");

}

function setMaxExperience(tier){
    document.getElementById("maxExperience").textContent = Number(tier)*100 + " maximum experience";
}

//Selecting a species will set the minimum attribute ratings
//It will also calculate the experience cost of selecting the species
function setAttributes(species){
    if (species == "human") {
        strength = document.getElementById("strengthRating").value = 1;
        toughness = document.getElementById("toughnessRating").value = 1;
        agility = document.getElementById("agilityRating").value = 1;
        initiative = document.getElementById("initiativeRating").value = 1;
        willpower = document.getElementById("willpowerRating").value = 1;
        intellect = document.getElementById("intellectRating").value = 1;
        fellowship = document.getElementById("fellowshipRating").value = 1;
    } else if (species == "adeptus") {
        strength = document.getElementById("strengthRating").value = 4;
        toughness = document.getElementById("toughnessRating").value = 4;
        agility = document.getElementById("agilityRating").value = 4;
        initiative = document.getElementById("initiativeRating").value = 4;
        willpower = document.getElementById("willpowerRating").value = 3;
        intellect = document.getElementById("intellectRating").value = 3;
        fellowship = document.getElementById("fellowshipRating").value = 1;
    } else if (species == "primaris") {
        strength = document.getElementById("strengthRating").value = 5;
        toughness = document.getElementById("toughnessRating").value = 5;
        agility = document.getElementById("agilityRating").value = 4;
        initiative = document.getElementById("initiativeRating").value = 4;
        willpower = document.getElementById("willpowerRating").value = 3;
        intellect = document.getElementById("intellectRating").value = 3;
        fellowship = document.getElementById("fellowshipRating").value = 1;
    } else if (species == "aeldari") {
        strength = document.getElementById("strengthRating").value = 1;
        toughness = document.getElementById("toughnessRating").value = 1;
        agility = document.getElementById("agilityRating").value = 3;
        initiative = document.getElementById("initiativeRating").value = 1;
        willpower = document.getElementById("willpowerRating").value = 1;
        intellect = document.getElementById("intellectRating").value = 1;
        fellowship = document.getElementById("fellowshipRating").value = 1;
    } else if (species == "ork") {
        strength = document.getElementById("strengthRating").value = 3;
        toughness = document.getElementById("toughnessRating").value = 3;
        agility = document.getElementById("agilityRating").value = 1;
        initiative = document.getElementById("initiativeRating").value = 1;
        willpower = document.getElementById("willpowerRating").value = 1;
        intellect = document.getElementById("intellectRating").value = 1;
        fellowship = document.getElementById("fellowshipRating").value = 1;
    }

    calculateAttributeTotal('strength');
    calculateAttributeTotal('toughness');
    calculateAttributeTotal('agility');
    calculateAttributeTotal('initiative');
    calculateAttributeTotal('willpower');
    calculateAttributeTotal('intellect');
    calculateAttributeTotal('fellowship');
    setSkillBase();
    calculateExperience();
}

//The base attribute value of a skill comes from the total value of the attribute (rating + bonus of the attribute)
//This should be called whenever attributes are updated
function setSkillBase(){
    document.getElementById("athleticsBase").textContent = document.getElementById("strengthTotal").textContent;
    document.getElementById("awarenessBase").textContent = document.getElementById("intellectTotal").textContent;
    document.getElementById("ballisticSkillBase").textContent = document.getElementById("agilityTotal").textContent;
    document.getElementById("cunningBase").textContent = document.getElementById("fellowshipTotal").textContent;
    document.getElementById("deceptionBase").textContent = document.getElementById("fellowshipTotal").textContent;
    document.getElementById("insightBase").textContent = document.getElementById("fellowshipTotal").textContent;
    document.getElementById("intimidationBase").textContent = document.getElementById("willpowerTotal").textContent;
    document.getElementById("investigationBase").textContent = document.getElementById("intellectTotal").textContent;
    document.getElementById("leadershipBase").textContent = document.getElementById("willpowerTotal").textContent;
    document.getElementById("medicaeBase").textContent = document.getElementById("intellectTotal").textContent;
    document.getElementById("persuasionBase").textContent = document.getElementById("fellowshipTotal").textContent;
    document.getElementById("pilotBase").textContent = document.getElementById("agilityTotal").textContent;
    document.getElementById("psychicMasteryBase").textContent = document.getElementById("willpowerTotal").textContent;
    document.getElementById("scholarBase").textContent = document.getElementById("intellectTotal").textContent;
    document.getElementById("stealthBase").textContent = document.getElementById("agilityTotal").textContent;
    document.getElementById("survivalBase").textContent = document.getElementById("willpowerTotal").textContent;
    document.getElementById("techBase").textContent = document.getElementById("intellectTotal").textContent;
    document.getElementById("weaponSkillBase").textContent = document.getElementById("initiativeTotal").textContent;
    
    calculateSkillTotal('athletics');
    calculateSkillTotal('awareness');
    calculateSkillTotal('ballisticSkill');
    calculateSkillTotal('cunning');
    calculateSkillTotal('deception');
    calculateSkillTotal('insight');
    calculateSkillTotal('intimidation');
    calculateSkillTotal('investigation');
    calculateSkillTotal('leadership');
    calculateSkillTotal('medicae');
    calculateSkillTotal('persuasion');
    calculateSkillTotal('pilot');
    calculateSkillTotal('psychicMastery');
    calculateSkillTotal('scholar');
    calculateSkillTotal('stealth');
    calculateSkillTotal('survival');
    calculateSkillTotal('tech');
    calculateSkillTotal('weaponSkill');
}

document.querySelector('#talents').onclick = function(ev) {
    // if (ev.target.value) {
    //   console.log(ev.target.checked, ev.target.value);
    // }
    console.log("checkbox checked");
    calculateExperience();
}

