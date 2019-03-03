var $addList = $("addList");
        var $unfinish = $("#unfinish");
        var $finish = $("#finish");
        var $allItem = $("#allItem");
        var $ol = $("ol");
        var $span = $("span");
        var num = 0;
        var num1 = 0;
        /* var num2=num-num1; */

        //数据更新
        function count() {
            var $complete = $(".state")
            num1 = $complete.length;
            var $li = $("li");
            num = $li.length;

            $span.eq(0).text(num - num1);
            $span.eq(1).text(num1);
            $span.eq(2).text(num);
        }
        
        //增加待办事项
        function Add() {
            var $input = $("input").val();
            if ($input !== "") {
                $ol.append("<li>" + "<label>" + "<input  type='checkbox' class='beauty' value='待办事项'></input>" + $input +
                    "</label>" + "<a href='#'>X</a>" + "</li>");
            }
            count(); /* 每增加一个待办更新一次数据 */
            $("input[type=text]").val(""); /* 清空输入的待办事项 */
            var $state = $("input[type=checkbox]:last");
            $state.click(function () {
                $(this).parent().parent().toggleClass("state", "switch");
                count();
            }) /* 完成与否的不同样式切换 &更新数据*/
            Del();
            Apart();
            AllDone();
        }
        //键盘直接enter输入，形成待办事项
        $("input[type=text]").keypress(function (e) {
            if (e.keyCode == 13) {
                Add();
            }
        });


        //删除事项
        function Del() {
            var $delete = $("a");
            $delete.click(function () {
                $(this).parent().remove();
                count();
            })
        }



        //分类展示（未完成/已完成/全部）
        function Apart() {
            var $li = $("li");
            $allItem.click(function () {
                $li.css("display", "list-item");
            })
            $unfinish.click(function () {
                for (var i = 0; i < $li.length; i++) {
                    if ($li.eq(i).hasClass("state")) {
                        $li.eq(i).css("display", "none");
                    } else {
                        $li.eq(i).css("display", "list-item");
                    }
                }
            })
            $finish.click(function () {
                for (var i = 0; i < $li.length; i++) {
                    if ($li.eq(i).hasClass("state")) {
                        $li.eq(i).css("display", "list-item");
                    } else {
                        $li.eq(i).css("display", "none");
                    }
                }
            })
        }

        //一键完成/一键取消
        function AllDone() {
            var $img = $("#edit div");
            $img.unbind('click').click(function () {
                /*执行时click执行了多次，及时解绑再加click，保证只有一次事件 */
                if ($img.hasClass("allDone")) {
                    for (var i = 0; i < $("li").length; i++) {
                        $("li").eq(i).addClass("state");
                        $("input[type=checkbox]").eq(i).prop('checked', true);
                    }
                    $img.removeClass("allDone");
                    $img.addClass("allClear");
                    //$img.attr("src","../../pic/wrong.jpg");
                    count();

                } else {
                    for (var i = 0; i < $("li").length; i++) {
                        $("li").eq(i).removeClass("state");
                        $("input[type=checkbox]").eq(i).prop('checked', false);
                    }
                    $img.addClass("allDone");
                    $img.removeClass("allClear");
                    //$img.attr("src","../../pic/right.jpg");
                    count();
                }
            })
        }