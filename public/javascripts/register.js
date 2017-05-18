
$('.rebtn').on('click',function () {
    var dataInfo = {
        username:$('username').val(),
        mobile:$('#mobile').val(),
        description:$('#description').val(),
        gender:$('.gender input:checked').next().text()== '男'?'boy':'girl',
        password:$('#password').val()
    };
    console.log(dataInfo);
    $.ajax({
        url:`/vote/register/data`,
        type:'POST',
        dataType:'json',
        data:dataInfo,
        success(result){
            if(result.errno == 0){
                console.log(result);
                window.location.href=`/vote/index`;
            }
        }
    });
});

