// 每次发送ajiax请求的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})