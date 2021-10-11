


function share(elem){
    
    var parent = elem.parentNode;

    for(const child of parent.children) {
        if(child.id === "emailList")
            return;
      }
    
    var emailInput = document.createElement("input");
    emailInput.id = "emailList";
    emailInput.placeholder = "Enter a comma seperated email list.";
    emailInput.style = "width: 230px";
    parent.appendChild(emailInput);
}



function pwMatch() 
{
    //test
    //get the input from text box
    var pw1 = document.getElementById("pw1").value;
    var pw2 = document.getElementById("pw2").value;
    var match = false;
    var pwLength = false;
     
    //if the password match and they arent empty
    match = (pw1 === pw2 && pw1 != "");

    //if the password is longer then 5
    pwLength = (pw1.length > 5);

    if(pwLength)
        document.getElementById("pwMatchText").innerText = "Password Length: Good";
    else
        document.getElementById("pwMatchText").innerText = "Password Length must be more then 5";


    if(match)
        document.getElementById("pwLengthCheck").innerText = "Passwords Match";
    else
        document.getElementById("pwLengthCheck").innerText = "Passwords do not Match";

    return (match && pwLength);
}

//global to keep track of our questions
var questionID = 0;
function addQuestion()
{
    //get clone of html questionTemplate and all its children
    var cloneLi = document.getElementById("questionTemplate").cloneNode(true);
    cloneLi.style.visibility= "visible";
    //make a unique label
    var q = "question" + (questionID);
    cloneLi.id = q;  

    //look through the children of the clone to find answerList so it can be number accoridingly 
    var children = cloneLi.children;
    for (var i = 0; i < children.length; i++) {
        if(children[i].id === "answerList")
            children[i].id = ("answerList" + questionID);
    }    
    //increment questionID so it continues to be unique
    questionID++;

    //append the question clone to the questionlist
    document.getElementById("questionList").appendChild(cloneLi);

}

function subtractQuestion(elem)
{
    //find the question node
    var question = elem.parentNode.parentNode;
    //remove the question node from the questionList
    document.getElementById("questionList").removeChild(question);  
}




function addAnswer(elem) 
{ 
    
    //get children of the grandparent list
    var listChildren = elem.parentNode.parentNode.children;

    //value will be used to hold what is selected in the dropdown
    var value;
    for (var i = 0; i < listChildren.length; i++) {
        //find this nodes form element
        if(listChildren[i].id === "answerForm")
        {
            //look inside the form childrenList
            for(var o = 0; o < listChildren[i].length; o++)
            {
                //if we found the dropdown menu get the value selected
                if(listChildren[i].children[o].id === "drpdn")
                {
                    var select = listChildren[i].children[o];
                    var selectedIndex = select.selectedIndex
                    value = select.options[selectedIndex].value;                    
                }

            }
        }    
    }

    var element;
    //loop through to find answerList and then make it a unique string
    for (var i = 0; i < listChildren.length; i++) {
        if(listChildren[i].id.startsWith("answerList"))
        {
            element = document.getElementById(listChildren[i].id);
        }    
    }

    var createdElement;
    var input;
    if(value === "Multiple Choice")
    {
        //create the elements 
        createdElement = document.createElement("li");
        input = document.createElement("input");
        
        //set the to answer
        input.placeholder = input.id = "answer";

        //put the input in the list and put the element in the list
        createdElement.appendChild(input);
    }
    else if(value === "Likert Scale")
    {

        console.log(value)  
        
        //ul
        createdElement = document.createElement("ul");
        createdElement.class = "likert";


        //input  
        var dots = 5;
        for(var p = 0; p < dots; p++)
        {
            var li = document.createElement("li");
            li.class = "likert";
            
            textInput = document.createElement("input");
            input = document.createElement("input");
            var textArea = document.createElement("a");
            if(p == 0)
            {  
                input.id = "likertStart";
                textArea.innerText = "I love it.";
                
            }
            else if(p == dots-1)
            {
                input.id = "likertEnd";
                textArea.innerText = "I hate it.";

            }
            else if(p == 2)
            {
                input.id = "likertMiddle";
                textArea.innerText = "Don't care"

            }
            else
            {
                input.id = "likertIntermediate";

            }

            input.type  = "radio";
            input.name  = "Likert";
            input.value = p+1;
            li.appendChild(textArea);
            li.appendChild(input);
            if(p == 0 || p == 2 || p == dots-1)
            {  
                textInput.id = "textInput";
                li.appendChild(textInput);    
                li.addEventListener("input", setLikertPhrase); 
            }
            
           
            createdElement.appendChild(li);
            
        }
    }
    else if(value === "Short Answer")
    {
        //add later if(one exists already){dont make another}
        var textArea = document.createElement("textarea");
        createdElement = document.createElement("li");
        
        textArea.placeholder = "answer";
        createdElement.appendChild(textArea);
        //set the to answer

    }
    else if(value === "Picture Choice")
    {
        console.log(value)
    }

    
    element.appendChild(createdElement);

}

function setLikertPhrase()
{
    this.children[0].innerText = this.children[2].value;
}




function subtractAnswer(elem) 
{ 
    //find the grandparents children
    var children = elem.parentNode.parentNode.children;
    var element;

    //find the answer list element
    for (var i = 0; i < children.length; i++) {
        if(children[i].id.startsWith("answerList"))
            element = document.getElementById(children[i].id);
    }

    //remove it
    element.removeChild(element.lastChild);    

}

//elem is the input button
function approveSurvey(elem) 
{ 
    //get the div that the button is in
    var parent = elem.parentNode.parentNode;

    //create and put together the button
    var createdInput = document.createElement("input");
    createdInput.type = "button";
    createdInput.value = "Remove";
    createdInput.onclick = function (){removeSurvey(this)};
    parent.appendChild(createdInput);

    //append the li to the approvedSurveys
    document.getElementsByClassName("approvedSurveys")[0].appendChild(parent);

    elem.parentNode.insertBefore(document.createTextNode("Approved by Rick Astley"), elem);

    //get the list
    var submittedSurveyList = document.getElementById("submittedSurveysID");
    //if there are 0 li put "no more surveys"
    if(submittedSurveyList.getElementsByTagName("li").length == 0)
    {
        //create a div
        const e = document.createElement('div'); 

        //create a textnode
        var textnode = document.createTextNode('No more surveys need approval...'); 
        //put the text node into the div
        e.appendChild(textnode);
        
        //insert right after the UL
        submittedSurveyList.parentNode.insertBefore(textnode, submittedSurveyList.nextSibling);
    }   
    
    //remove the approve button 
    console.log(parent.children[0].removeChild(elem));
}

function removeSurvey(elem) 
{
    //get the ul that this is in 
    var parent = elem.parentNode.parentNode;

    //remove the li that we clicked on
    parent.removeChild(elem.parentNode);
}