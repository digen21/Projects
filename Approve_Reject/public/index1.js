// if(window.location.pathname == "/"){
//     $onApprove = $(".table tbody td button .approve");
//     $("table .approve").click(console.log("Approve"));
// }

function handleApprove(e)
{
    const id=e.getAttribute("data-id");
    if(!id){
        alert("ID not found")
    }else{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "/approve",
            data: JSON.stringify({
                id:id,
                
            }),
            success: function(res){
                console.log(res);
            },
            error: function(response) {
                console.log(response);
            },
        });
        location.reload();
    }
    
}
function handleReject(e)
{
    const id=e.getAttribute("data-id");
    if(!id){
        alert("ID not found")
    }else{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "/reject",
            data: JSON.stringify({
                id:id,
                
            }),
            success: function(res){
                console.log(res);
            },
            error: function(response) {
                console.log(response);
            },
        });
        location.reload();
    }
    
}