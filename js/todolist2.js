$(function(){

    // [{title:'任务名称',done:false}] 

    // 取数据
    function getData(){
        var data = localStorage.getItem('abc')
        var list;
        if(data != null){//第二次取数据
            list = JSON.parse(data);//从本地存储中取出来的数据是字符串
        }else{//第一次数据
            list = [];//如果不这样做，将来第一次的时候会报错， null.push(11)
        }
        return list;
    }

    //把最新的数据及时存到本地存储当中 同步到本地存储当中
    function saveData(data){
        localStorage.setItem('abc',JSON.stringify(data));
    }

    //把本地存储中的数据取出来，渲染到页面当中
    function load(){
        var local = getData();
        // for
        // local.forEach 
        //遍历数组，把每一项拼成一个li,添加到ol当中   
        $.each(local,function(index,item){
            console.log(item.title)
            var li = "<li><input type='checkbox'> <p>" + item.title + "</p> <a href='javascript:;'></a></li>"
            $('#todolist').prepend(li)
        })
    }

    load()//页面一打开就要执行一次这个函数

    //keyup或keydown都可以
    $('#title').on('keyup',function(e){
        console.log(e.keyCode)
        if(e.keyCode == 13){
            // 存数据一定取数据
            console.log('按的是回车键')
            //存新添加的数据之前，先取以前的旧数据（第一次玩旧数据是空数组 ）
            var local = getData();
            var obj = {title:$(this).val(),done:false};
            local.push(obj);//obj是最新的任务 local以前的任务
            saveData(local);
        }
    })


})




// $(function() {
//     // alert(11);
//     // 1. 按下回车 把完整数据 存储到本地存储里面
//     // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
//     load();
//     $("#title").on("keydown", function(event) {
//         if (event.keyCode === 13) {
//             if ($(this).val() === "") {
//                 alert("请输入您要的操作");
//             } else {
//                 // 先读取本地存储原来的数据
//                 var local = getDate();
//                 // console.log(local);
//                 // 把local数组进行更新数据 把最新的数据追加给local数组
//                 local.push({ title: $(this).val(), done: false });
//                 // 把这个数组local 存储给本地存储
//                 saveDate(local);
//                 // 2. toDoList 本地存储数据渲染加载到页面
//                 load();
//                 $(this).val("");
//             }
//         }
//     });
//     // 3. toDoList 删除操作
//     $("ol, ul").on("click", "a", function() {
//         // alert(11);
//         // 先获取本地存储
//         var data = getDate();
//         console.log(data);
//         // 修改数据
//         var index = $(this).attr("id");
//         console.log(index);
//         data.splice(index, 1);
//         // 保存到本地存储
//         saveDate(data);
//         // 重新渲染页面
//         load();
//     });
//     // 4. toDoList 正在进行和已完成选项操作
//     $("ol, ul").on("click", "input", function() {
//         // alert(11);
//         // 先获取本地存储的数据
//         var data = getDate();
//         // 修改数据
//         var index = $(this).siblings("a").attr("id");
//         console.log(index);
//         // data[?].done = ?
//         data[index].done = $(this).prop("checked");
//         console.log(data);

//         // 保存到本地存储
//         saveDate(data);
//         // 重新渲染页面
//         load();
//     });
//     // 读取本地存储的数据 
//     function getDate() {
//         var data = localStorage.getItem("todolist");
//         if (data !== null) {
//             // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
//             return JSON.parse(data);
//         } else {
//             return [];
//         }
//     }
//     // 保存本地存储数据
//     function saveDate(data) {
//         localStorage.setItem("todolist", JSON.stringify(data));
//     }
//     // 渲染加载数据
//     function load() {
//         // 读取本地存储的数据
//         var data = getDate();
//         console.log(data);
//         // 遍历之前先要清空ol里面的元素内容
//         $("ol, ul").empty();
//         var todoCount = 0; // 正在进行的个数
//         var doneCount = 0; // 已经完成的个数
//         // 遍历这个数据
//         $.each(data, function(i, n) {
//             // console.log(n);
//             if (n.done) {
//                 $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
//                 doneCount++;
//             } else {
//                 $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
//                 todoCount++;
//             }

//         });
//         $("#todocount").text(todoCount);
//         $("#donecount").text(doneCount);

//     }

// })