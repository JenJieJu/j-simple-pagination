<!DOCTYPE html>
<html lang="en">

<head>
    <!-- 禁止 Chrome 浏览器中自动提示翻译 -->
    <meta name="google" value="notranslate">
    <!-- 禁止百度转码 -->
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <!-- 取消缓存 -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <!-- 手机屏幕适配 -->
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <style type="text/css">
    html,
    body {
        width: 100%;
        padding: 0px;
        margin: 0px;
        text-align: center;
        font-size: 14px;
        height: 100%;
    }

    .box {
        line-height: 32px;
        padding: 20px;

    }
    </style>
</head>

<body>
    <div class="box">
        <div id="time" class="aa"></div>
        <div id="log"></div>
    </div>
    <script type="text/javascript">
    (function() {

        var log = document.getElementById('log');

        var pageIndex = 7;
        var pageSize = 10;
        var dataTotal = 601;
        var showCount = 10;

        var Pagination = new window.jSimplePagination('#time', {
            pageSize: pageSize,
            dataTotal: dataTotal,
            pageIndex: pageIndex,
            showCount: showCount,
            onChange: function(data) {
                console.log(data);
                log.innerHTML = '<div>' + JSON.stringify(data) + '</div>';
            }
        });


        log.innerHTML = '<div>' + JSON.stringify({
            pageSize: pageSize,
            dataTotal: dataTotal,
            pageIndex: pageIndex,
            showCount: showCount,
        }) + '</div>'


        console.log(Pagination)

    })();
    </script>
</body>

</html>