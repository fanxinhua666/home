$(function () {
    //封装获取数据
    function getData() {
        var data = localStorage.getItem('abc')
        var list;
        if (data != null) {
            list = JSON.parse(data);
        } else {
            list = [];
        }
        return list;
    }
     //保存新数据到本地存储
    function saveData(data) {
        localStorage.setItem('abc', JSON.stringify(data));
    }
    //local
    function load(){
        var local = getData();
        console.log(local)
        $('#todolist,#donelist').empty()
        var num = 0;
        var num2 = 0;
        $.each(local,function(index,item){
            
            if(item.done==true) {
                var li = "<li><input type='checkbox' checked><p>"+ item.title +"</p><a href='javascript:;'id="+ index +"></a></li>"
            $('#donelist').prepend(li)
            num2++;
            } else {
                var li = "<li><input type='checkbox'><p>"+ item.title +"</p><a href='javascript:;'id="+ index +"></a></li>"
            $('#todolist').prepend(li)
            num++;
            }
        })
        $('#todocount').text(num);
        $('#donecount').text(num2);
    }
    load()
    $('#title').on('keyup', function (e) {
        console.log(e.keyCode)
        if (e.keyCode == 13) {
            console.log('按的是回车键')
            //存之前先取数据
            var local = getData();
            var obj = { title: $(this).val(), done: false };
            local.push(obj);
            saveData(local);
            //重新渲染页面
            load();
            $(this).val('')
        }
    })
    //实现删除功能 事件委托
    $('#todolist').on('click','a',function(){
        var index = $(this).attr('id');
        console.log(index)
        var local = getData();
        local.splice(index,1);
        saveData(local);
        load();
    })
    //切换任务状态 完成、未完成
    $('#todolist,#donelist').on('click','input[type="checkbox"]',function(){
        var index = $(this).siblings('a').attr('id');
        var bool = $(this).prop('checked');
        console.log(index,bool)
        var local = getData();
        local[index].done = bool;
        saveData(local);
        load();
    })
})