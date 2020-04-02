// TODOS PAGE

showTodos();
$("#todoAdd").on('click', addTodo);
$("#deleteAll").on('click', deleteAllTodos);

function showTodos() {
    $("#all").empty();
    let todo_tmp = new Todo;
    todo_tmp.getAll().then(function (todos) {
        todos.forEach(function (todo) {
            if (todo.status === 2) {
                var checked = true;
            } else {
                var checked = false;
            }
            if (todo.coworker) {
                let coworkerTmp = new Coworker;
                coworkerTmp.getOne(todo.coworker).then(function (coworker) {
                    var coworkerName = coworker.firstname + ' ' + coworker.lastname;
                    $("#all").append(createItem(todo.name, todo.id, checked, coworkerName));
                })
            } else {
                $("#all").append(createItem(todo.name, todo.id, checked));
            }
        });
        $(".deleteTodo").on('click', deleteTodo);
        $(".status").on('click', toggleTodo);
    });
}

function addTodo() {
    var input = $("#todoInput");
    if(input.val()) {
        let todo = new Todo(input.val(), "", 0);
        todo.add();
    }
    input.val("");
    showTodos()
}

function deleteTodo() {
    let todo = new Todo();
    todo.delete(this.parentElement.id);
    showTodos();
}

function deleteAllTodos(){
    var sureDelete = confirm("Êtes-vous sûr de vouloir supprimer toute la liste ?");
    if(sureDelete){
        let todo_tmp = new Todo;
        todo_tmp.getAll().then(function (todos) {
            todos.forEach(function (todo) {
                todo.delete(todo.id);
            })
        })
    }
    showTodos()
}

function createItem(text, id, checked, coworker){
    let innerHtml = '<li id=' +  id + (checked ? ' class="done"' : "") + '>'
        + '<input type="checkbox" class="status"' + (checked? 'checked': '' )+ '/>'
        + '<span>' + text + '</span>'
        + '<span class="assigned">' + coworker + '</span>'
        + '<button class="deleteTodo">delete</button>'
        + '</li>';
    return innerHtml;
}

function toggleTodo(){
    let todo = new Todo;
    if(this.checked) {
        todo.updateStatus(this.parentElement.id, 2);
    } else {
        todo.updateStatus(this.parentElement.id, 0);
    }
    showTodos();
}

var refreshBrowser = function(){
    location = location;
};

$(".todoList").on('click', "li", toggleTodo)
$(".todoList").on('click', ".delete", function(){
   $(this).closest('li').remove();
   updateStats();
})

// Add list
$("#todoAdd").on('click',function(){
    var $input = $("#todoInput");
    if ($input.val()){
        $(".todoList").append(todoItem(
            $input.val(), false //checked
        ));
        $input.val("");
    };
    updateStats();
})

// Delete All List
$("#deleteAll").on('click',function(){
    //var sureDelete = true;
    var sureDelete = confirm("Etes-vous sûr de vouloir supprimer toute la liste?");
    if(sureDelete){
        $('.todoList li').remove();
        updateStats();
    }
// CO-WORKERS PAGE
$("#addCoworker").on('click', function () {
    console.log("click");
});

/*function showCoworkers() {
    $("#all").empty();
    let coworker_tmp = new userClass;
    coworker_tmp.getAll().then(function (users) {
        users.forEach(function (user) {
            $("#all").append(createItem(user.firstname, user.lastname, user.todos))
        });
        $("#addCoworker").on('click', addUser);
        $("#deleteCoworker").on('click', deleteUser);
    });
}*/

function addUser() {
    /* $("#addCoworker").click( function () {
         console.log("click");*/
    let firstnameInput = $("#firstname").val();
    let lastnameInput = $("#lastname").val();
    let user = new userClass(firstnameInput, lastnameInput, []);
    user.add();
    //});
    showCoworkers();
}

function deleteUser() {
    let user = new userClass();
    user.delete(this.parentElement.id);
    showCoworkers();
}

// Go to co-workers page
$("#coworkers").on('click', function () {
    $("#todoContainer").addClass("hidden");
    $("#coworkersContainer").removeClass("hidden");
});

// Show coworkers
var coworkers = [
    { id: 1, firstname: "Noémie", lastname: "Foulon" },
    { id: 2, firstname: "Denis", lastname: "Lemoine" },
    { id: 3, firstname: "Caroline", lastname: "Fouquet" }
];

let coworkerItem = function (firstname, lastname, id) {
    let innerHTML = "<li>" + firstname + ' ' + lastname + "<button class='deleteCoworker' id=" + id + ">Supprimer</button></li>";
    return innerHTML;
};

/*function showCoworkers() {
    $("#coworkersList").empty();
    coworkers.forEach(function (coworker) {
        $("#coworkersList").append(coworkerItem(coworker.firstname, coworker.lastname, coworker.todos));
    });
}*/

/*showCoworkers();*/

// Add coworker
$("#addCoworker").on('click', function () {
    console.log("click");
});

// Delete coworker
$(".deleteCoworker").on('click', function () {
    for (let i = 0; i < coworkers.length; i++) {
        if (coworkers[i].id === Number($(this).attr('id'))) {
            console.log('test2');
            coworkers.splice(i, 1);
        }
    }
    showCoworkers();
});

// Modified Background

$(document).ready(function(){ 
    $("a.one").click( function(){ 
        $ ("body").removeClass('bg2 , bg3').addClass("bg1"); 
    }); 
    $("a.two").click( function(){ 
        $ ("body").removeClass("bg1 , bg3").addClass("bg2");
     }); 
     $("a.three").click( function(){ 
         $ ("body").removeClass("bg1 , bg2").addClass("bg3"); 
        }); 
});

// dropdown menu
$('li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(300).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });


  
