# j-simple-pagination

### <a href="//jenjieju.github.io/pc/">DEMO</a>

### Installing

```
    npm i j-simple-pagination --save
```


## Running the demo

```
    npm install
    npm run dev
```

## Enjoy it
```
<div id="time"></div>
<script type="text/javascript">
    var Pagination = new window.jSimplePagination('#time', {
        pageSize: pageSize,
        pageTotal: pageTotal,
        pageIndex: pageIndex,
        pageCount: pageCount,
        onChange: function(data) {
            console.log(data);
            log.innerHTML = '<div>' + JSON.stringify(data) + '</div>';
        }
    });
</script>
```

## Updata
```
0.0.1 add
```
