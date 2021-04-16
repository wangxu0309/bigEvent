$(function() {
    // 密码框验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {
            if (value === $('#form_pwd [name=oldPwd]').val()) {
                return '不能和原密码相同'
            }

        },
        repwd: function(value) {
            if (value !== $('#newPwd').val()) {
                return '两次密码不一致'
            }

        }
    })

    // 修改密码发起ajax 请求
    // 监测表单提交行为
    $('#form_pwd').on('submit', function(e) {
        e.preventDefault()
        updatePwd()
    })

    function updatePwd() {
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('#form_pwd').serialize(),
            success: function(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('请求失败')
            }
        })
    }
})