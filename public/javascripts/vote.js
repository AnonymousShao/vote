var $coming = $('.coming').eq(0);
var offset = 0, limit = 10;

function requset() {
    $.ajax({
        url: `/vote/index/data?limit=${limit}&offset=${offset}`,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            offset += limit;
            var users = result.data.objects;
            var str = ``;
            users.map(function (item, index) {
                str += `<li>
                             <div class="head">
                             <a href='/vote/detail/${item.id}'>
                             <img src=${item.head_icon} alt="">
                             </a>
                             </div>
                             <div class="up">
                             <div class="vote">
                             <span>${item.vote}票</span>
                             </div>
                             <div class="btn">
                             投TA一票
                             </div>
                             </div>
                             <div class="descr">
                             <a href='/vote/detail/${item.id}'>
                             <div>
                             <span>${item.username}</span>
                             <span>|</span>
                             <span class="id">编号#${item.id}</span>
                             </div>
                             <p>${item.description}</p>
                             </a>
                             </div>
                             </li>`;
            });

            $coming.append(str);
        }
    });
}
requset();

$(function () {
    loadObj={
        callback(load){
            $.ajax({
                url: `/vote/index/data?limit=${limit}&offset=${offset}`,
                type: 'GET',
                dataType: 'json',
                success(result){
                    let total = result.data.total;
                    if(offset > total){
                        console.log(total);
                        load.complete();
                        setTimeout(function () {
                            load.reset();
                        },1000);
                    }else{
                        setTimeout(function () {
                            requset();
                            load.reset();
                        },1000);
                    }
                }
            });
        }
    };
    loadMore(loadObj);
});

if(localStorage.getItem('user')){
    var user = JSON.parse(localStorage.getItem('user'));
    $('.sign_in .logname').text(user.username);
    $('.signed .username').text(user.username);
    $('.register a').text('个人主页').attr('href',`/vote/detail/${user.id}`);

}else{
    $('.sign_in .logname').text('用户登录');
    $('.register a').text('我要报名').attr('href',`/vote/register`);
}

$('.sign_in').click(function () {
    $('.mask').show();
    if(localStorage.getItem('user')){
        $('.signed').show();
        $('.no_signed').hide();
        $('.signed .username').text(JSON.parse(localStorage.getItem('user')).username);
    }else{
        $('.signed').hide();
        $('.no_signed').show();
    }
});

$('.mask').click(function (e) {
    if($(e.target).hasClass('mask')){
        $('.mask').hide();
    }else{
        $('.subbtn').click(function () {
            $.ajax({
                url:`/vote/index/info`,
                type:'POST',
                dataType:'json',
                data:{
                    id:$('.usernum').val(),
                    password:$('.user_password').val()
                },
                success(result){
                    if(result.errno == 0){
                        $('.mask').hide();
                        $('.sign_in .logname').text(result.user.username);
                        localStorage.setItem('user',JSON.stringify(result.user));
                        $('.register a').text('个人主页').attr('href',`/vote/detail/${result.user.id}`);
                        location.reload();
                  }
                }
            });
        });
        $('.dropout').click(function () {
            localStorage.removeItem('user');
            $('.sign_in .logname').text('用户登录');
            $('.mask').hide();
            $('.register a').text('我要报名').attr('href',`/vote/register`);
            location.reload();
        })
    }
});

$('.coming').click(function (event) {
   if($(event.target).hasClass('btn')){
       var id = $(event.target.parentNode.parentNode).find('.descr .id').text().split('#')[1];
       var user = JSON.parse(localStorage.getItem('user'));
       $.ajax({
           url:`/vote/index/poll?id=${id}&voterId=${user.id}`,
           type:'GET',
           dataType:'json',
           success(result){
                if(result.errno == 0){
                    let sp = $(event.target.parentNode).find('.vote span')
                    sp.text(parseInt(sp.text())+1+'票');
                   /* location.reload();*/
                }else{
                    console.log(result.msg);
                }
           }
       });

   }
   else if($(event.target).hasClass('descr') || $(event.target).hasClass('head') ){
       var id = $(event.target.parentNode).find('.descr .id').text().split('#')[1];
       location.href = `/vote/detail/${id}`;
   }
});

$('.btn-search').click(function () {
    var val = $('.search input').val();
    localStorage.setItem('val',val);
    location.href = '/vote/search';
});


/*$(window).on('scroll', function () {
    var cur = $(window).height() + document.body.scrollTop;
    if (cur >= $(document).height()) {
        requset();
    }
});*/

