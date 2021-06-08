window.app = {
  getMenuFromCategories: () => {
    fetch("http://localhost:3000/categories")
      .then((data) => data.json())
      .then((data) => {
        const elements = data
          .map((e) => {
            return `<a class="nav-link" href="/danh-muc.html?id=${e.id}">${e.name}</a>`;
          })
          .join("");
        document.getElementById("list_categories").innerHTML = elements;
      });
  },
  getProducts: () => {
    fetch("http://localhost:3000/products")
      .then((data) => data.json())
      .then((data) => {
        const elements = data
          .map((e) => {
            return ` <tr>
                        <th scope="row">${e.id}</th>
                        <td><img src="${e.image}" alt="" width="150px"></td>
                        <td>${e.name}</td>
                        <td>${e.detail}</td>
                        <td><a href="/chi-tiet.html?id=${e.id}" class="btn btn-primary">Chi tiết</a></td>
                    </tr>`;
          })
          .join("");
        document.getElementById("products_list").innerHTML = elements;
      });
  },

  getProductsByCategory: () => {
    //   Lấy ID từ URL
    var url = new URL(location.href);
    var categoryId = url.searchParams.get("id");

    fetch(`http://localhost:3000/products?categoryId=${categoryId}`)
      .then((data) => data.json())
      .then((data) => {
        const elements = data
          .map((e) => {
            return ` <tr>
                        <th scope="row">${e.id}</th>
                        <td><img src="${e.image}" alt="" width="150px"></td>
                        <td>${e.name}</td>
                        <td>${e.detail}</td>
                        <td><a href="/chi-tiet.html?id=${e.id}" class="btn btn-primary">Chi tiết</a></td>
                    </tr>`;
          })
          .join("");
        document.getElementById("products_list").innerHTML = elements;
      });

    fetch(`http://localhost:3000/categories/${categoryId}`)
      .then((data) => data.json())
      .then((data) => {
        document.getElementById("category_name").textContent = `Danh mục: ${data.name}`;
      });
  },
  getProductDetail: () => {
    //   Lấy ID từ URL
    var url = new URL(location.href);
    var productId = url.searchParams.get("id");

    // Gọi API lấy thông tin chi tiết sản phẩm
    fetch(`http://localhost:3000/products/${productId}`)
      .then((data) => data.json())
      .then((data) => {
        //   Tạo HTML (node) chi tiết sản phẩm
        const element = `<div class="col-6">
                            <img src=${data.image} width="300px" />
                        </div>
                        <div class="col-6">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Tên: <strong>${data.name}</strong></li>
                                <li class="list-group-item">Giá: <strong>${data.price}</strong></li>
                                <li class="list-group-item">Chi chiết: <strong>${data.detail}</strong></li>
                            </ul>
                        </div>`;

        // Chèn HTML vào giao diện
        document.getElementById("product_detail").innerHTML = element;
      });
  },
};
