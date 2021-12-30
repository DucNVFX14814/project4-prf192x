//bài làm có tham khảo trên youtube, gr discord, mentor

//khai báo các biến với các element có id tương ứng
var listArticle = document.getElementById("listArticle");
var searchBtn = document.getElementById("searchBtn");

searchModal();
//tạo hàm khi click vào iconSearch sẽ hiện ra modal có input và button để tìm kiếm, lọc thông tin
function searchModal() {
    //tạo các biến theo các id và class tương ứng
    var modal = document.getElementById("myModal");
    var iconSearch = document.getElementsByClassName("iconSearch")[0];
    var spanX = document.getElementsByClassName("close")[0];

    //khi click vào iconSeach sẽ mở ra modal
    iconSearch.onclick = function() {
            modal.style.display = "block";
        }
        //khi click vào spanX sẽ đóng modal
    spanX.onclick = function() {
            modal.style.display = "none";
        }
        //khi click ở ngoài modal cũng có thể đóng modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

getDataFromAPI();
//hàm lấy data từ API Gnews, có thêm &lang=en và &topic=sports
function getDataFromAPI() {
    fetch('https://gnews.io/api/v4/top-headlines?token=d972f12e521225081a3344bb16524d13&lang=en&topic=sports')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            //thêm vào #listArticle 1 đoạn HTML khi trang đang được tải
            listArticle.innerHTML = `<div class="loading">Loading...<div>`;
            //setTimeout, ban đầu trang sẽ hiện Loading... như ở trên, sau 1200ms thì thêm vào #listArticle 1 đoạn HTML như kia, đó sẽ là danh sách các Article mà ta muốn hiển thị
            setTimeout(function() {
                //clear #listArticle
                listArticle.innerHTML = "";
                //khởi tạo biến myArticle là phần articles trong data lấy được từ API
                const myArticle = data.articles;
                //lặp qua các phần tử của myArticle
                for (let i = 0; i < myArticle.length; i++) {
                    //tạo <article> và gán vào biến divArticle
                    const divArticle = document.createElement("article");
                    //thêm vào divArticle đoạn HTML với img h3 time decription tương ứng, lấy được từ API
                    divArticle.innerHTML = `
                       <img src="${myArticle[i].image}" alt="${myArticle[i].source}" class="img">
                       <div class="content">
                           <div>
                               <a href="${myArticle[i].url}" target="_blank">
                                   <h3>${myArticle[i].title}</h3>
                               </a>
                           </div>
                           <div class="time">${myArticle[i].publishedAt}</div>
                           <p class="decription">${myArticle[i].description}</p>
                       </div>
                    <hr>
                    `;
                    //thêm mỗi divArticle vào #listArticle tạo thành danh sách các Article
                    listArticle.appendChild(divArticle);
                    //ban đầu đã ẩn footer, sau timeout thì mới hiện footer cùng với nội dung trang
                    document.getElementById("footer").style.display = "block";
                };
            }, 1200);

        });
}

//hàm khi click vào button#searchBtn sẽ lọc kết quả theo keywords, time
searchBtn.onclick = function() {
    //khai báo các biến bằng giá trị được nhập vào input
    const keywords = document.getElementById("inputKeywordsSearch").value;
    const dateFrom = document.getElementById("inputDateFromSearch").value;
    const dateTo = document.getElementById("inputDateToSearch").value;

    //khai báo biến url để đưa vào fetch()
    let url = `https://gnews.io/api/v4/search?`;
    const tokenAPI = `&token=d972f12e521225081a3344bb16524d13&lang=en&topic=sports`;
    //kiểm tra điều kiện, nếu keywords có giá trị thì sẽ thêm q tương ứng vào url, còn không sẽ trả về q mặc định là sports
    if (keywords == "") {
        url += `q=sports`;
    } else {
        url += `q=${keywords}`;

    }
    //tương tự, nếu dateFrom hay dateTo có giá trị thì sẽ thêm từ khóa tương ứng vào url
    if (dateFrom != "") {
        //chuyển sang chuẩn định dạng ISO 8601
        const keyDateFrom = dateFrom + "T00:00:00Z";
        url += `&from=${keyDateFrom}`;
    }
    if (dateTo != "") {
        //chuyển sang chuẩn định dạng ISO 8601
        const keyDateTo = dateTo + "T00:00:00Z";
        url += `&to=${keyDateTo}`;
    }

    //lấy dữ liệu từ API Gnews với các từ khóa thông tin tìm kiếm, các bước tương tự như ở trên đã giải thích
    fetch(url + tokenAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            //ẩn footer
            document.getElementById("footer").style.display = "none";
            listArticle.innerHTML = `<div class="loading">Loading...<div>`;
            setTimeout(function() {
                listArticle.innerHTML = "";
                const myArticle = data.articles;
                for (let i = 0; i < myArticle.length; i++) {
                    const divArticle = document.createElement("article");
                    divArticle.innerHTML = `
                       <img src="${myArticle[i].image}" alt="${myArticle[i].source}" class="img" width="200" height="150">
                       <div class="content">
                           <div>
                               <a href="${myArticle[i].url}" target="_blank">
                                   <h3>${myArticle[i].title}</h3>
                               </a>
                           </div>
                           <div class="time">${myArticle[i].publishedAt}</div>
                           <p class="decription">${myArticle[i].description}</p>
                       </div>
                    <hr>
                    `;
                    listArticle.appendChild(divArticle);
                    document.getElementById("footer").style.display = "block";
                };
            }, 1200);
        });
    //đóng modal
    document.getElementById("myModal").style.display = "none";
}