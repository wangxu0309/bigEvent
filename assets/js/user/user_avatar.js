$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        // 模拟文件选择框点击事件
        $('#file').click()
    })

    // 文件选择框的change事件
    $('#file').on('change', function(e) {
        var filelist = e.target.files
        if (filelist.length < 0) {
            return layer.msg('请选择文件')
        }
        // 更换裁剪区的文件
        // 拿到用户选择的文件
        var file = e.target.files[0]
            // 根据选择的文件创建一个url地址
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#btnsure').on('click', function() {
        // 将剪裁后的照片输出为base64格式的字符串,拿到用户裁剪后的照片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})