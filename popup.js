// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
$(document).ready(function() {
loadevent();
    $("#btnAdd").bind("click", function () {
                   addNotes()
                });

function addNotes(title,content){
    var notes = $("#notes");
    notes.append("<li><div  class='color1'>" +
        "<textarea class='note-title' placeholder='Untitled' maxlength='10'></textarea>" +
        "<textarea class='note-content' placeholder='Your content here'></textarea>" +
        "<img class='hide' src='images/close.png'/>" +
        "</div></li>");

    var newNote = notes.find("li:last");
    addNoteEvent(newNote);
    if (title) {
        // get the title textarea element and set its value
        newNote.find("textarea.note-title").val(title);
    }

    // if a content is provided then set the content of the new note
    if (content) {
        // get the content textarea element and set its value
        newNote.find("textarea.note-content").val(content);
    }
    newNote.find("img").click(function () {
        newNote.remove();
        saveNotes();

    })
}
   function loadevent() {
       var notes = localStorage.getItem("notes");
       var notesArray = JSON.parse(notes);

       if(notesArray!=null) {
           notesArray.forEach((e) => {
               addNotes(e.Title, e.Content);

           });

       }

   }

   function saveNotes() {
       var notes=[];

       let note= $("ul").find("li>div");


       note.each((i,e)=>{
           let title = $(e).find("textarea.note-title");
           let content = $(e).find("textarea.note-content");
           if(title.val()!=""|| content.val()!="")
           notes.push({Index:i,Title:title.val(),Content:content.val()});
       })

        var jsonStr = JSON.stringify(notes);
            localStorage.setItem("notes", jsonStr);


    };


function addNoteEvent(noteElement) {
    var div = noteElement.children("div");
    var closeImg = div.find("img");

    div.focus(function () {
        closeImg.removeClass("hide");
    });

    div.children().focus(function () {
        closeImg.removeClass("hide");
    });

    div.hover(function () {
        closeImg.removeClass("hide");
    }, function () {
        saveNotes();
        closeImg.addClass("hide");

    });

    div.children().hover(function () {
        closeImg.removeClass("hide");
    }, function () {
        saveNotes();
        closeImg.addClass("hide");
    });
}
});