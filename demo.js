searchBtn.onclick = function() {
    const keySearch = document.getElementById("inputSearch").value;
    for (let i = 0; i < listArticles.length; i++) {
        if (listArticles[i].innerText.includes(keySearch)) {
            listArticles[i].style.display = "block";
        } else {
            listArticles[i].style.display = "none";

        }
    }
}