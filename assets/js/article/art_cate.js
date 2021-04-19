$(function() {
    var layer = layui.layer
    var form = layui.form
        // 获取文章分类列表
    getArtCate()

    function getArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                var strhtml = template('artCate', res)
                $('.layui-table tbody').html(strhtml)
            }
        })
    }
    var indexAdd = null
        // 点击添加分类按钮实现弹出层效果
    $('#btn_add').on('click', function() {
            // 调用弹出层后返回的是一个index值
            indexAdd = layer.open({
                // type值为1就可以去掉小面的确定按钮
                type: 1,
                title: '添加文章分类',
                // 渲染表单结构
                content: $('#dialog_add').html(),
                // 设置弹出层的宽高（基础参数里）
                area: ['500px', '250px']
            })
        })
        // 点击弹出层确定添加按钮，添加图书分类
        // 由于表单是后来添加的，所以要用事件代理(监测的还是表单的提交事件)
    $('body').on('submit', '#form_add', function(e) {
            e.preventDefault()
                // 发起ajax请求
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $('.layui-form').serialize(),
                success: function(res) {
                    if (res.status !== 0) return layer.msg('添加分类失败')
                    getArtCate()
                    layer.msg('添加分类成功')
                        // 关闭弹出层
                    layer.close(indexAdd)
                }
            })
        })
        // 根据id删除文章分类
        // 1.给删除按钮绑定点击事件
    $('tbody').on('click', '.btn_del', function() {
            var id = $(this).attr('data-id')
            layer.confirm('是否要删除?', function(index) {
                //do something
                $.get('/my/article/deletecate/' + id, function(res) {
                    if (res.status !== 0) return layer.msg('删除分类失败')
                })
                layer.msg('删除分类成功')
                layer.close(index);
                getArtCate()
            })

        })
        // 根据id更新文章分类
        // 给编辑按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn_edit', function() {
        indexEdit = layer.open({
                // type值为1就可以去掉小面的确定按钮
                type: 1,
                title: '修改文章分类',
                // 渲染表单结构
                content: $('#dialog_edit').html(),
                // 设置弹出层的宽高（基础参数里）
                area: ['500px', '250px']
            })
            // 获得文章分类的id
        var id = $(this).attr('data-id')
            // 根据id发起ajax请求获取文章分类数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败')
                }
                console.log(res)
                    // 快速给表单赋值
                form.val('form_edit', res.data)
            }
        })

    })
    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('修改分类失败')
                layer.msg('修改分类成功')
                getArtCate()
                    // 关闭弹出层
                layer.close(indexEdit)
            }
        })
    })
})