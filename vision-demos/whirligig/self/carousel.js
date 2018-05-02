;(function($){
    var Carousel = function(poster){
        var self = this;

        // 这里把每个从集合中迭代出来的组件节点对象暂存起来  目的是为了能让原型中调用到
        this.poster = poster;
        this.posterList = poster.find(".poster-list");
        this.btnPrev = poster.find("div.poster-prev-btn");
        this.btnNext = poster.find("div.poster-next-btn");

        // 每一帧的组件要分开取  这里为了处理方便  暂存起来
        this.postItems = this.poster.find("li.poster-item");
        this.posterFirstItem = this.postItems.first();
        this.posterLastItem = this.postItems.last();

        // 为了解决快速点击 bug 我们让点击间隔使按钮失效 在这里定义旋转标识位
        this.rotateFlag = true;

        // 一份默认参数对象是为了用户没有传递每个组件的某些参数着想
        // 高度灵活的使用 jQuery 扩展以便于适应不同的需求
        this.setting = {
            "width": 1000,
            "height": 232,
            "firstImgWidth": 640,
            "firstImgHeight": 232,
            "verticalAlign": "middle",
            "scale": 0.9,
            "speed": 500
        };
        // 下面的转换方法是可取的  因为 eval() 非常快
        // $.extend(this.setting, eval("(" + poster.attr("data-setting") + ")"));

        // 不过我们使用 jQuery 自带的转换方法  并且华丽的封装起来
        $.extend(this.setting, this.getSetting(poster));
        // console.log(this.setting);

        // 进行所有组件层的 css 初始化（包含整体 css 和 剩余帧图的 css）
        this.setSettingCss();
        this.setPostPosition();

        /*
        * 绑定旋转事件
        * */
        this.btnNext.click(function () {
            // 这里不用 this 因为现在的动作的发动者是 btnNext 而不是 Carousel  调用 Carousel 的原型方法自然无用啦
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.carouselRotate("left");
            }
        });
        this.btnPrev.click(function () {
           if(self.rotateFlag){
               self.rotateFlag = false;
               self.carouselRotate("right");
           }
        });
     };

    Carousel.prototype = {
        /*
        * 旋转方法
        * 具体算术就是下一帧拿上一帧的宽度和高度
        * */
        carouselRotate: function (direct) {
            // 下面的 this 指的是 Carousel 自己
            var _this_ = this;
            if(direct === "left"){
                // 这里的 this 指的是每一帧自己哦
                var zIndexArray = [];
                this.postItems.each(function () {
                    var self = $(this),
                        // 迭代到第一帧的时候需要取得上一帧的对象  所以下面要进行判断当前迭代对象的上一个对象是否存在
                        prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                        zIndexArray.push(zIndex);

                    self.animate({
                        width: width,
                        height: height,
                        zIndex: zIndex,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, function(){
                        _this_.rotateFlag = true;
                    });
                });
                /*
                 * 就在下面再迭代一次设置所有的 zIndex 吧
                 * */
                this.postItems.each(function (i) {
                    $(this).css("zIndex", zIndexArray[i]);
                });
            }else if (direct === "right"){
                var zIndexArray = [];
                this.postItems.each(function () {
                    var self = $(this),
                        next = self.next().get(0)?self.next():_this_.posterFirstItem,
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArray.push(zIndex);

                    self.animate({
                        width: width,
                        height: height,
                        // 下面的 zIndex 需要独立开来分析  为了保证旋转的平滑  我们需要额外循环一次进行打印
                        // 不在当前循环直接设置的原因是  如果这样做  会导致所有的 item 的 zIndex 都变为最后一个 item 的 zIndex
//                        zIndex: zIndex,
                        opacity: opacity,
                        left: left,
                        top: top
                    });
                }, function(){
                    _this_.rotateFlag = true;
                });
                this.postItems.each(function (i) {
                    $(this).css("zIndex", zIndexArray[i]);
                })
            }
        },

        // 这就是个从页面组件拿到自定义参数后转化为 json 格式对象的方法
        getSetting: function () {
            var setting = this.poster.attr("data-setting");
            if(setting && setting != ""){
                return $.parseJSON(setting);
            }else{
                return {};
            }
        },

        // 我们需要在拿到参数后将它们设置到对应的组件 css 中
        setSettingCss: function () {
            this.poster.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.posterList.css({
                width: this.setting.width,
                height: this.setting.height
            });
            // 左右按钮的长宽需要动态计算出来
            var w = (this.setting.width - this.setting.firstImgWidth) / 2;
            this.btnPrev.css({
//                width: w,
                // 按钮显示先处理成通过获取帧数的一半设置层数
                zIndex: Math.ceil(this.postItems.size() / 2)
            });
            this.btnNext.css({
//                width: w,
                zIndex: Math.ceil(this.postItems.size() / 2)
            });
            this.posterFirstItem.css({
                width: this.setting.firstImgWidth,
                height: this.setting.firstImgHeight,
                left: w,
                zIndex: Math.floor(this.postItems.size() / 2)
            });
        },

        // 当然咯  我们的难点就在于设置剩余帧的位置  细节方面看图例 >> tech.png  我们会把方法写到下面
        setPostPosition: function () {
            // 因为下面要循环  每一个 this 都会改变  为便于调用我们先暂存起来
            var self = this;

            // 先获取到所有的帧
            var sliceItems = this.postItems.slice(1),
                sliceSize = sliceItems.size() / 2,
                // 再获取分给右边的帧
                rightItems = sliceItems.slice(0, sliceSize),
                level = Math.floor(this.postItems.size() / 2),
                leftItems = sliceItems.slice(sliceSize);

            // 下面我们把宽高也做一次清算吧  先拿到第一帧的初始值
            var rightWidth = this.setting.firstImgWidth,
                rightHeight = this.setting.firstImgHeight;

            // 要清算的小伙伴都来了  间隙也是需要的  具体看图 >> tech.png
            // 就是每一帧之间间隔的距离  层叠起来的样式很好看  像厕纸一样。。
            // 算术也很简单  【（整个旋转木马组件的宽度 - 第一帧宽度） / 2 / （右边帧数）】  就 ok 啦  不记得了就参考图例
            var gap = ((this.setting.width - this.setting.firstImgWidth) / 2) / level;

            // 最重要的位置关系来清算吧  先算术一下第一帧的左边距
            var firstLeft = (this.setting.width - this.setting.firstImgWidth) / 2;
            var fixOffsetLeft = firstLeft + rightWidth;

            /*
            * 开始迭代所有右边的帧层啦  而且这里会设置所有右边帧层的 css 样式哦
            * */
            rightItems.each(function (i) {
                // 这里的算术也很简单  在 each 的时候每迭代一次就自减一次  把所有的右边帧都一一设置好 css
                level--;

                // 每次迭代均要缩小尺寸
                rightWidth = rightWidth * self.setting.scale;
                rightHeight = rightHeight * self.setting.scale;

                // 鉴于下面两次用到 i  但 i 自己的值已经发生变化  所以为了能取得正确的值  我们保存独立的 j
                var j = i;

                $(this).css({
                    zIndex: level,
                    width: rightWidth,
                    height: rightHeight,
                    opacity: 1 / (++j),
                    // 稍微算术下 left 这个最关键的值吧
                    // 其实最终想要的结果就是 （木马组件宽度 - 第一帧宽度）/ 2 + 第一帧宽度 + （迭代的右边第几帧 * 间隙）- 迭代的右边第几帧宽度
                    left: fixOffsetLeft + (++i) * gap - rightWidth,
                    // 下面的值可以修正我们想要的木马呈现方式  只要动态修正即可
//                    top: (self.setting.height - rightHeight) / 2
                    // 上面注释掉的属性会在下面进行封装  并进行更加定制化的配置
                    top: self.setVerticalAlign(rightHeight)
                });
            });

            /*
            * 在设置左边所有样式之前  我们首先明确  左边所有的帧是由小变大的顺序计算的  跟上面右边的由大变小顺序计算不同哦
            * */
            // 设置左边的位置
            var leftWidth = rightItems.last().width(),
                leftHeight = rightItems.last().height(),
                opacityLoop = Math.floor(this.postItems.size() / 2);

            /*
            * 这里会迭代所有左边的帧层  很多算术方法跟上面右边是相同的啦
            * */
            leftItems.each(function (i) {
                $(this).css({
                    zIndex: i,
                    width: leftWidth,
                    height: leftHeight,
                    opacity: 1 / opacityLoop,
                    left: i * gap,
//                    top: (self.setting.height - leftHeight) / 2
                    top: self.setVerticalAlign(leftHeight)
                });
                // 慢慢变大的宽度和高度
                leftWidth = leftWidth / self.setting.scale;
                leftHeight = leftHeight / self.setting.scale;
                // 所以咯  因为左边的渐变是由小变大的  所以要先设置样式再进行迭代改变
                opacityLoop--;
            });
         },

        /*
         * 设置竖直对齐
         * */
        setVerticalAlign: function (height) {
            var verticalType = this.setting.verticalAlign,
                top = 0;
            if(verticalType === "middle"){
                top = (this.setting.height - height) / 2;
            }else if(verticalType === "top") {
                top = 0;
            }else if (verticalType === "bottom"){
                top = this.setting.height - height;
            }else{
                top = (this.setting.height - height) / 2;
            }
            return top;
        }
    };

    // 来个简单工厂模式吧  嘿嘿
    Carousel.init = function (posters) {
        _this_ = this;

        // 注意下面的 this 指的是 each 的每一个对象  上面的 this 指的是 Carousel 自己
        posters.each(function () {
            new _this_($(this));
        });
    };
    window["Carousel"] = Carousel;
})(jQuery);
