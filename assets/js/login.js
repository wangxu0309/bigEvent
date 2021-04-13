$(function() {
    //  登录和注册页面的切换
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show()
    })
    $('#link_login').on('click', function() {
            $('.reg_box').hide();
            $('.login_box').show()
        })
        // 为表单添加验证规则
        // 从layui中获取form对象
    var form = layui.form
    form.verify({
        repwd: function(value) { //value：表单的值、item：表单的DOM对象
            var pwd = $('.reg_box [name=password]').val()
            if (value !== pwd) return '两次密码不一致'
        },
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
    // 从layui中获取layer对象
    var layer = layui.layer
        // 监测注册表单提交事件，发起ajax请求
    $('#form_reg').on('submit', function(e) {
            // 一定要阻止表单的默认提交行为
            e.preventDefault()
            var data = $(this).serialize()
                //    密码框和确认密码框name属性值一致会请求失败
            $.post('/api/reguser', data, function(res) {
                    if (res.status !== 0) {
                        // 记得return
                        return layer.msg('注册失败')
                    }
                    layer.msg('注册成功，请登录')
                })
                // 注册成功之后页面自动跳转到登录页面通过模拟点击事件来完成
            $('#link_login').click()

        })
        // 监测登录表单的提交事件，发起ajax请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登录成功')
                    // 把token值存到本地存储中
                localStorage.setItem('token', res.token)
                    // 自动跳转到后台主页
                location.href = 'index/html'
            }
        })
    })

})