$(function() {
    var layer = layui.layer
    var form = layui.form
        // 获取文章分类
    initCate()

    function initCate() {
        // 发起请求
        $.get('/my/article/cates', function(res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类失败')
            }
            var strHtml = template('tpl_cate', res)
            $('[name=cate_id]').html(strHtml)
                // 千万别忘了最后一步
            form.render('select')
        })
    }
    // 初始化富文本编辑器
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btn_choose').on('click', function() {
            $('#btn_file').click()
        })
        // 监测文件选择框的change事件
    $('#btn_file').on('change', function(e) {
        var filelist = e.target.files
        if (filelist.length < 0) {
            return layer.msg('请选择文件')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)

        // 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 发起请求更改文章封面
    // 1.准备数据
    var art_state = '已发布'

    $('#btn_draft').on('click', function() {
        art_state = '草稿'
    })
    $('#form_pub').on('submit', function(e) {
        e.preventDefault()
            // FormData用于原生javascript
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
            // ## 4. 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将裁剪区域追加到FormDate中
                fd.append('cover_img', blob)
                fd.forEach(function(v, k) {
                    console.log(v, k)
                })
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    // 向服务器提交的是formdata格式的数据必须要有以下两个属性
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('发布文章失败')
                        }
                        // 页面跳转到文章列表区
                        location.href = 'art_list.html'
                    }
                })
            })
    })

})