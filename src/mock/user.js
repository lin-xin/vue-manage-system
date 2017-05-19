export const user = [
    {
        path: '/api/user',
        data: {
            'errno|0-1': 1,
            'errmsg': function () {
                if (this.errno == 1) {
                    return '用户名或密码错误';
                }
                return '';
            },
            'user': {
                "id": "@natural",
                "username": "@cname",
                "auth": function () {
                    var base = ["/basetable", "/vuetable", "/baseform", "/vueeditor", "/markdown", "/upload", "/basecharts", "/mixcharts"]
                    var start = Math.floor(Math.random() * (base.length - 1))
                    return ["/", "/login", "/logout", "/readme"].concat(base.slice(-start));
                }
            }
        }
    }
]
