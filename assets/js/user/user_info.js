$(function() {
    // 验证表单
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) return '昵称长度在1-6个字符之间'
        }
    })
    initUserInfo()
        //初始化用户基本信息
    function initUserInfo() {
        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                return layer.msg('获取个人信息失败')
            }
            //    调用form.val()快速为表单赋值
            form.val('userInfo', res.data)
        })

    }
    // 重置用户信息
    $('#btn_reset').on('click', function(e) {
            // 阻止默认的重置事件
            e.preventDefault()
            initUserInfo()

        })
        // 发起更新资料的请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('修改信息失败')
                }
                // 调用父页面的方法
                window.parent.getUserInfo()
            }
        })
        console.log($(this).serialize())

    })

})