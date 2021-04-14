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
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取个人信息失败')
                }
                renderAvatar(res.data)
            }
        })
    }
})