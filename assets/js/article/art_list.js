// 获取文章列表
// 先准备数据
$(function() {
    var layer = layui.layer
    var form = layui.form
    var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            var dt = new Date(date)
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        // 补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    initTable()
        // 发起获取文章列表的请求
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章失败')
                }
                var strHtml = template('artList', res)
                $('tbody').html(strHtml)
                    // 渲染分页
                console.log(res)
                renderPage(res.total)
            }
        })
    }
    // 渲染文章分类列表
    renderArtCate()

    function renderArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                var strHtml = template('artCate', res)
                $('[name=cate_Id]').html(strHtml)
                form.render()
            }
        })
    }
    // 监测筛选区域表单的提交事件
    $('#form_file').on('submit', function(e) {
            e.preventDefault()
            var cate_Id = $('[name=cate_Id]').val()
            var state = $([name = state]).val()
            q.cate_id = cate_Id
            q.state = state
            initTable()

        })
        //渲染 分页
    function renderPage(total) {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号    
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum, //当前的页码值
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 7],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // 点击分页会触发jump回调
                q.pagenum = obj.curr
                console.log(obj.limit); //得到每页显示的条数
                q.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    initTable()
                }
            }
        });
    }
    // 根据id删除文章
    $('tbody').on('click', '#btn_del', function() {
            var id = $('#btn_del').attr('data-set')
            layer.confirm('确定删除?', function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        console.log(res)
                        initTable()
                    }

                })

                layer.close(index);
            })
        })
        // 根据id获取文章信息详情

})