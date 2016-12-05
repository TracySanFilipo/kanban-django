function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}


var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function taskPost(){
    var title = document.getElementById("addTask").value
    var priority = document.getElementById("priority").value
    var status = document.getElementById("status").value
    var description = document.getElementById("addDesc").value
    var person = document.getElementById("person").value
  var postdata = {'title': title, 'status': status, 'priority': priority, 'description': description, 'person': person}
  jQuery.ajax({url:'http://127.0.0.1:8000/api/task/', data:postdata, datatype: 'jsonp', type:'POST'
    }).done(function(results){
    location.reload();
    })
}


function taskDelete(input_url){
   task_url = "" + input_url
 jQuery.ajax({url:input_url, type:'DELETE'
   }).done(function(){})
   }


function reply_click(clicked_id){
      taskDelete(clicked_id)
   }


function taskPatch(){
    var j = document.getElementById("getID").value
    var title = document.getElementById("title").value
    var priority = document.getElementById("priority1").value
    var status = document.getElementById("status1").value
    var description = document.getElementById("addDesc1").value
    var person = document.getElementById("person").value
    var patchData = {'title': title, 'status': status, 'priority': priority, 'description': description, 'person': person}
    jQuery.ajax({url:'http://127.0.0.1:8000/api/task/' +  j + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
}).done(function(results){})
}


function taskList(){
    console.log("getting stuff")
    var $orderedlist = $("<tr>")
        $.ajax("http://127.0.0.1:8000/api/task/").done(function(results){
            var tasks = results.results
            for(var i = 0; i < tasks.length; i++){
                if (tasks[i]['person'] == 'J'){
                    $orderedlist.html($orderedlist.html()+ tasks[i]['id'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['title'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['status'] + "  "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['priority'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['description']),
                    $orderedlist.html($orderedlist.html()+ '<button class="deleteButton" onClick="reply_click(this.id)" content="X" id=' + '"' + tasks[i]['url'] + '"' + '>' + "X" + '</button>' + "<br>"),
                    console.log(tasks[i]['person'])
                    $("#task1list").append($orderedlist);
                    }
                else if (tasks[i]['person'] == 'T'){
                    $orderedlist.html($orderedlist.html()+ tasks[i]['id'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['title'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['status'] + "  "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['priority'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['description']),
                    $orderedlist.html($orderedlist.html()+ '<button class="deleteButton" onClick="reply_click(this.id)" content="X" id=' + '"' + tasks[i]['url'] + '"' + '>' + "X" + '</button>' + "<br>"),
                    $("#task2list").append($orderedlist);
                    }
                else {
                    $orderedlist.html($orderedlist.html()+ tasks[i]['id'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['title'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['status'] + "  "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['priority'] + " "),
                    $orderedlist.html($orderedlist.html()+ tasks[i]['description']),
                    $orderedlist.html($orderedlist.html()+ '<button class="deleteButton" onClick="reply_click(this.id)" content="X" id=' + '"' + tasks[i]['url'] + '"' + '>' + "X" + '</button>' + "<br>"),
                    console.log(tasks[i]['person'])
                    $("#task3list").append($orderedlist);
                    }
            }
        })
}

function delOne(){
    var dropdown = $("#getID")
    jQuery.ajax('http://127.0.0.1:8000/api/task/').done(function(results){
        var task = results.results
        dropdown.html("")
        for (var i = 0; i < task.length; ++i){
            dropdown.append('<option>' + task[i]['id'] + '</option>')
        }    }) }

taskList()
delOne()
$("#add").click(taskPost)
$("#getButton").click(taskList)
$("#try_patch").click(taskPatch)
