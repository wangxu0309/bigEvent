$(function() {
    var layer = layui.layer
        // 渲染头像
    function renderAvatar(user) {
        var username = user.nickname || user.username
        $('.welcom').html('欢迎' + username)
        if (user.user_pic !== null) {
            // 渲染图头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.ava_text').hide()
        } else {
            $('.layui-nav-img').hide()
            var frist = username[0].toUpperCase()
            $('.ava_text').html(frist).show()

        }

    }
    getUserInfo()
        // 发起ajax请求获取用户个人信息,最好就是封装一个函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取个人信息失败')
                }
                renderAvatar(res.data)
            },
            // 不管请求成功还是失败都会调用complete回调
            complete: function(res) {
                console.log(res)
                if (res.responseJSON.status !== 0) {
                    localStorage.removeItem('token')
                    location.href = 'login.html'

                }
            }
        })
    }
    // 退出功能
    $('#btnOut').on('click', function() {
        // layui的询问框
        layer.confirm('确定退出', {
            icon: 3,
            title: '提示'
        }, function(index) {
            // 清除本地存储中的token
            localStorage.removeItem('token')
                // 跳转页面
            location.href = 'login.html'

            layer.close(index);
        })
    })
})