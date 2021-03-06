/* entryComponent.js - This module is responsible for taking data,
building out journal entry HTML DOM components and returning those
components. */
// pattern="[A-Za-z(){}}:;0-9"
const entryComponent = {
    name: "Dom Builder Component",

    vdate (style, label, title, type, name, id) {
        return `<fieldset class="${style}">
                    <label for "${label}">${title}</label>
                    <input type="${type}" name="${name}" id ="${id}" required>
                </fieldset>`
    },

     vconcepts (style, label, title, type, name, id, jvalue) {
        return `<fieldset class="${style}">
                    <label for "${label}">${title}</label>
                    <input type="${type}" name="${name}" id ="${id}" required value="${jvalue}" pattern="[A-Z][a-z](){}}:;0-9">
                </fieldset>`
    },

    ventry (style, title, name, id, jvalue) {
        return `<fieldset class="${style}">           
                <label for "entry">${title}</label>
                <textarea name="${name}" id="${id}" required value="${jvalue}">
                </textarea>
            </fieldset>`
    },

    vmood (style, title, name, id, jvalue) {
        return `<fieldset class="${style}">
         <label for "mood">${title}</label>
         <select name="${name}" id="${id}" required value="${jvalue}">
             <option value=""></option> 
             <option value="One">One</option>
             <option value="Two">Two</option>
             <option value="Three">Three</option>
             <option value="Four">Four</option>
             <option value="Five">Five</option>
         </select>
         </fieldset>`
    },
    
    makeJournalEntryComponent () {
        return `
            <h1>Daily Journal</h1>
            ${entryComponent.vdate("journalDateStyling containerFieldset", "journalDate", "Date of Entry", "date", "journalDate", "journal__date", )}
            ${entryComponent.vconcepts("conceptsStyling containerFieldset", "concepts", "Concepts Covered", "text", "concepts", "journal__concepts", "mm/dd/yyyy")}
            ${entryComponent.ventry("entryStyling containerFieldset", "Journal Entry", "entry", "journal__entry", "")}
            ${entryComponent.vmood("moodStyling containerFieldset","Scale of 1 to 5", "mood", "journal__mood", "")}
        `
    },

    entryList (concepts, entry, jdate) {
        return `
        <article>
            <p>${jconcepts}</p><br>
            <p>${jentry}</p><br>
            <p>${jdate}<p><br><br>
        </article>
        `
    },

    appendInputForm () {
        addForm = entryComponent.makeJournalEntryComponent();
        const container = document.querySelector("#journalForm");
        container.innerHTML = addForm;
        console.log(addForm);

        addRadio = entryComponent.addRadioButton ();
        const containerRadio = document.querySelector("#entry__filter");
        containerRadio.innerHTML = addRadio;
        console.log(addRadio);
    },
    
    addEventListener () {
        let entryBtn = document.querySelector("#entry__save");
        console.log(entryBtn.innerHTML)
        entryBtn.addEventListener("click", function() {
            entriesDOM.handleFormSubmission();
        });
    },

    radioLabelInput (id, value, labelFor, title) {
        return `
        <input type="radio" id="${id}" name="filterMood" class="input" value="${value}">
        <label for="${labelFor}" class="label">${title}</label>`
    },

    addRadioButton () {
        return `
        <fieldset class="radioStyling">
        <legend>Filter Journal Entries by Number</legend>
        ${entryComponent.radioLabelInput("choice1", "One", "choice1", "One")}
        ${entryComponent.radioLabelInput("choice2", "Two", "choice2", "Two")}
        ${entryComponent.radioLabelInput("choice3", "Three", "choice3", "Three")}
        ${entryComponent.radioLabelInput("choice4", "Four", "choice4", "Four")}
        ${entryComponent.radioLabelInput("choice5", "Five", "choice5", "Five")}
        </fieldset>`
    },

    addRadioListener () {
        const radioButtonArray = document.getElementsByName("filterMood");
        console.log(radioButtonArray);
        radioButtonArray.forEach(function (addRadio) {
            console.log(addRadio)            
            addRadio.addEventListener("click", event => {
                let vmood = event.target.value;
                console.log(vmood);
                entriesDOM.handleRadioSubmission(vmood);      
            });
          })
        }
    }    

// ORIGINAL HTML
// const entryComponent = {
//     name: "Dom Builder Component", 
//     vdate () {
//     return `<fieldset class="journalDateStyling containerFieldset">
//                 <label for "journalDate">Date of Entry</label>
//                 <input type="date" name="journalDate" id = "journal__date" value = "">
//             </fieldset>`
//         },    
//     vconcepts () {
//         return `<fieldset class="conceptsStyling containerFieldset">
//                 <label for "concepts">Concepts Covered</label>
//                 <input type="text" name="concepts" id="journal__concepts">
//             </fieldset>`
//         },    
//     ventry () {
//         return `<fieldset class="entryStyling containerFieldset">           
//                 <label for "entry">Journal Entry</label>
//                 <textarea name="entry" id="journal__entry" 
//                 rows="5" columns="40" wrap="hard">
//                 </textarea>
//             </fieldset>`
//         },
//     vmood () {
//            return `<fieldset class="moodStyling containerFieldset">
//             <label for "mood">Scale of 1 to 10</label>
//             <select name="mood" id="journal__mood">
//                 <option value="One">One</option>
//                 <option value="Two">Two</option>
//                 <option value="Three">Three</option>
//                 <option value="Four">Four</option>
//                 <option value="Five">Five</option>
//                 <option value="Six">Six</option>
//                 <option value="Seven">Seven</option>
//                 <option value="Eight">Eight</option>
//                 <option value="Nine">Nine</option>
//                 <option value="Ten">Ten</option>
//               </select>
//             </fieldset>`
//     },
//     appendInputForm () {
//         let jdate = entryComponent.vdate();
//         let jconcepts = entryComponent.vconcepts();
//         let jentry = entryComponent.ventry();
//         let jmood = entryComponent.vmood();
//         let journalComponent = `${jdate} ${jconcepts} ${jentry} ${jmood}`;
//         console.log(journalComponent);
//         let container = document.querySelector("#container");
//         container.innerHTML = journalComponent;
//     }
// }