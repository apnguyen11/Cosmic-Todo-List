
const btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    // var item = 1;
    console.log("clicked")
    const todoString = document.getElementById('input-txt').value;
    const promise = postData('/api/todos', {todo: todoString});
    // const promiseDel = apiDelete('/api/todos/', item )
    document.getElementById('input-txt'). value = "";
    promise.then(function(res){
       
        renderTodos(res)
       
    })

  globalControl()
});


var globalControl = function( UICtrl){
    $(document).ready(function() {
        $("#todos").click(function(event) {
            
            var target = event.target

            var isDelete = target.classList.contains('dbtn');


            var deleteID = event.target.id;
            var divID = event.target.parentNode.id;
            var el = event.target.parentNode
                console.log(divID, 'div')
            
            if(isDelete){
                
                el.parentNode.removeChild(el);
                
                apiDelete(`/api/todos/${divID}`);
                
                
            } 
        });
    });
};

        function apiDelete(url){
            return fetch(url, {
                method: 'DELETE'
            }).then(response => {
                return response.json();
            })
        }
 




function renderTodos(todos) {
    console.log('~~~~');
    console.log('in func', todos);
    console.log('~~~~');
    let div = document.getElementById("todos");
   
    const todoDom = todos.map((data) => {
        console.log(data, '***')
        return `<div id='${data.id}' class='todos todo'> ${data.todo}
           
                <button id='d${data.id}' class='deletebtn dbtn'>
                    delete
                </button>
           
        </div>`
    })
    div.innerHTML = todoDom.join("");

    
    
}


function postData(url, data){
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
}