console.log("Hello there!");

/* AJAX  不刷新页面的同时，更新页面 */

//用ajax请求style.css
document.getElementById("add-css").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/style.css");
  request.onload = () => {
    const style = document.createElement("style");
    style.innerHTML = request.response;
    document.head.appendChild(style);
  };
  request.onerror = () => {
    console.log("error 404");
  };
  request.send();
};

//用ajax请求2.js
document.getElementById("add-js").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onload = () => {
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.onerror = () => {
    console.log("error 404");
  };
  request.send();
};

//用ajax请求3.html
// document.getElementById("add-html").onclick = () => {
//   const request = new XMLHttpRequest();
//   request.open("GET", "/3.html");
//   request.onload = () => {
//     const div = document.createElement("div");
//     div.innerHTML = request.response;
//     document.body.appendChild(div);
//   };
//   request.onerror = () => {
//     console.log("error 404");
//   };
//   request.send();
// };

//监听http请求响应状态的更好方法 ↓↓↓
document.getElementById("add-html").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert(`加载失败...${request.status}`);
      }
    }
  };
  request.send();
};

//用ajax请求xml
document.getElementById("add-xml").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const xml = request.responseXML;
        console.log(xml.getElementsByTagName("warning")[0].textContent.trim());
      } else {
        alert(`加载失败${request.status}`);
      }
    }
  };
  request.send();
};

//用ajax请求json
document.getElementById("add-json").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const obj = JSON.parse(request.response);
        console.log(obj);
        document.getElementById("json-name").innerText = obj.yyy[0];
      } else {
        alert(`加载失败${request.status}`);
      }
    }
  };
  request.send();
};
/* 解析json常搭配错误处理
   一般情况，解析json文件时不会出问题的，因为在写json文件时就会自动校验并格式化，一般用于以防万一，或将JavaScript数据转换为json格式字符串时使用。 */
// let object;
// try {
//   object = JSON.parse(xxx);
// } catch (error) {
//   console.log("出错了！");
//   console.log(error);
//   object = "保底对象";
// }

//用ajax加载页面的其余部分
let pageIndex = 2;
document.getElementById("add-page").onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${pageIndex}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const array = JSON.parse(request.response);
        const result = array.map((item) => `<li>${item.id}</li>`).join("");
        document.getElementById("new-page").innerHTML += result;
      } else {
        alert(`加载失败${request.status}`);
      }
    }
  };
  request.send();
  pageIndex += 1;
};
