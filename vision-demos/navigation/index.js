window.onload = function() {
  const aA = document.getElementsByTagName("a");
  for (let i = 0; i < aA.length; i++) {
    aA[i].onmouseover = function() {
      let This = this;
      clearInterval(This.time); //初始化
      This.time = setInterval(function() {
        This.style.width = This.offsetWidth + 8 + "px";
        if (This.offsetWidth >= 150) {
          clearInterval(This.time)
        }
      }, 30);
    }

    aA[i].onmouseout = function() {
      var This = this;
      clearInterval(This.time); //初始化  
      This.time = setInterval(function() {
        This.style.width = This.offsetWidth - 8 + "px";
        if (This.offsetWidth <= 100) {
          clearInterval(This.time);
        }
      }, 30);
    }
  }

}
