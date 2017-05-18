let id = (function () {
    let str = window.location.href;
    var id ;
    str.replace(/\/detail\/([^/]+)/,function () {
        id = arguments[1];
    });
    return id;
})();

$.ajax({
    url:`/vote/all/detail/data?id=${id}`,
    type:'GET',
    dataType:'json',
    success(result){
        if(result.errno == 0){
            console.log(result);
            result = result.data;
            let srtPer = ``;
            let strFriends = ``;
            let $personal = $('.personal');
            let $vflist = $('.vflist');
            srtPer += `<div class="pl">
                            <div class="head">
                                <img src=${result.head_icon} alt="">
                            </div>
                            <div class="p_descr">
                                <p>${result.username}</p>
                                <p>编号#${result.id}</p>
                            </div>
                        </div>
                        <div class="pr">
                            <div class="p_descr pr_descr">
                                <p>${result.rank}名</p>
                                <p>${result.vote}票</p>
                            </div>
                        </div>
                        <div class="motto">
                            ${result.description}
                        </div>`;
            result.vfriend.forEach(function (friend) {
                strFriends += `<li>
                                    <div class="head">
                                        <a href="#"><img src=${friend.head_icon} alt=""></a>
                                    </div>
                                    <div class="up">
                                        <div class="vote">
                                            <span>投了一票</span>
                                        </div>
                                    </div>
                                    <div class="descr">
                                        <h3>${friend.username}</h3>
                                        <p>编号#${friend.id}</p>
                                    </div>
                                </li>`;
            });
            $vflist.html(strFriends);
            $personal.html(srtPer);
        }
    }
});
