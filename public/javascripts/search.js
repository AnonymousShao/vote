var val = localStorage.getItem('val');
$.ajax({
    url:`/vote/index/search?content=${val}`,
    dataType:'json',
    type:'GET',
    success(result){
        console.log(result);
        if(result.errno == 0){
            var str = ``;
            result.data.forEach(function (user) {
                str += `<li>
                            <div class="head">
                                <a href="#"><img src=${user.head_icon} alt=""></a>
                            </div>
                            <div class="up">
                                <div class="vote">
                                    <span>${user.vote}票</span>
                                </div>
                                <div class="btn">
                                    投TA一票
                                </div>
                            </div>
                            <div class="descr">
                                <h3>${user.username}</h3>
                                <p>${user.descr}</p>
                            </div>
                        </li>`;
            });
            $('.coming').html(str);
        }else{
            console.log(result.msg);
        }
    }
});
