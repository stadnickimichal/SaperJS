$(document).ready(function(){
    createBoard();
});

var score = 0;

function createBoard(){
    for(var i=0; i<20; i++){
        $(".boardTable").append(createRow(i));
        for(var j=0; j<20; j++){
            $("tr[row="+ i +"]").append(createData(j, i));
        }
    }
}

function createRow(index){
    return '<tr row='+ (index+1) +'></tr>';
}

function createData(index, row){
    var td = document.createElement('td');
    $(td).attr("col", index+1);
    $(td).attr("row", row+1);
    $(td).attr("reviled", false);
    $(td).on("click", tdOnClick);
    if(Math.random()<0.2)
        $(td).attr("mine", true);
    else
        $(td).attr("mine", false);
    return td;
}

function tdOnClick(){
    if($(this).attr("mine")=="false")
        revileFieldAndCalculate(this);
    else
        endGame(this);
}

function revileFieldAndCalculate( td ){
    if($(td).attr("reviled")=="true")
        return;
    $(td).css("background-color", "white");
    $(td).attr("reviled", true);
    score +=1;
    
    var sourondingFields = $("td[row="+ (parseInt($(td).attr("row"))-1)
            +"],td[row="+ $(td).attr("row") +"],td[row="
            + (parseInt($(td).attr("row"))+1) +"]");
    
    sourondingFields = sourondingFields.filter("[col="+parseInt($(td).attr("col"))
            +"],[col="+(parseInt($(td).attr("col"))+1)
            +"],[col="+(parseInt($(td).attr("col"))-1)+"]");
    
    sourondingFields.splice(4,1);
    
    var mineAround = sourondingFields.filter("[mine=true]").length;
    if(mineAround==0){
        var sourondingNotRevieledFields = sourondingFields.filter("[reviled=false]");
        sourondingNotRevieledFields.each(function(index){
            revileFieldAndCalculate(this);
        });
    }
    else{
        $(td).text(mineAround);
    }
}

function endGame(td){
    $(td).css("background-color", "red");
    var tdColection = $("td");
    tdColection.each(function (index){
        $(this).off();
    });
    $(".scoreNumber").text(score);
    $(".score").css("visibility", "visible");
    schowAllMines();
}

function schowAllMines(){
    $("td").each(function(x, td){
        if($(td).attr("mine")=="true")
            $(td).css("background-color", "red");
    });
}