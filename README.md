# BÀI THỰC HÀNH 01: XÂY DỰNG TRANG WEB GIỚI THIỆU BẢN THÂN

> **Môn học:** Lập trình Web / Ứng dụng Web  
> **Cơ sở đào tạo:** Học viện Công nghệ Bưu chính Viễn thông (PTIT)  
> **Sinh viên thực hiện:** Phạm Xuân Kỳ  
> **Mã sinh viên:** B23DCCC092  
> **Lớp / Khóa:** D23 - Công nghệ Thông tin  
> **Repository GitHub:** [https://github.com/kydeptrai1209/B23DCCC092-BaiTH01](https://github.com/kydeptrai1209/B23DCCC092-BaiTH01)

---

## 📌 1. Giới Thiệu Dự Án

Trang web cá nhân (Portfolio) được xây dựng với mục tiêu giới thiệu lý lịch học tập, năng lực chuyên môn, các dự án tiêu biểu và thông tin liên hệ của sinh viên **Phạm Xuân Kỳ (MSV: B23DCCC092)**. Trang web được thiết kế theo phong cách hiện đại (Modern Clean UI), tối ưu trải nghiệm người dùng, tải trang nhanh và tương thích hoàn toàn trên mọi loại thiết bị.

---

## 🛠️ 2. Công Nghệ Sử Dụng

- **HTML5:** Cấu trúc ngữ nghĩa chuẩn SEO (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:**
  - Bố cục linh hoạt kết hợp **Flexbox** và **CSS Grid**.
  - Hệ thống biến màu sắc **CSS Custom Properties (Variables)** cho Dark/Light mode.
  - Hiệu ứng chuyển động mượt mà (Transitions, Keyframe Animations, Hover effects).
  - Thiết kế thích ứng **Responsive Design** với đầy đủ các điểm ngắt (Mobile, Tablet, Desktop).
- **JavaScript (Vanilla JS - ES6+):** Xử lý tương tác logic không phụ thuộc thư viện ngoài, tối ưu hiệu năng và độ mượt.
- **Tài nguyên hỗ trợ:**
  - Font chữ: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Fira Code](https://fonts.google.com/specimen/Fira+Code) từ Google Fonts.
  - Bộ icon: Font Awesome 6 CDN.
  - Đồ hoạ: Vector SVG vẽ tay trực tiếp cho Avatar và ảnh minh hoạ dự án (độ phân giải vô hạn, dung lượng siêu nhẹ).

---

## 📋 3. Báo Cáo Chi Tiết Yêu Cầu & Tính Năng Đã Thực Hiện

### 3.1. Cấu Trúc HTML
- [x] **Header / Navbar:** Logo cá nhân (`<PXK/> Xuân Kỳ`), menu điều hướng các mục (Trang chủ, Giới thiệu, Kỹ năng, Dự án, Liên hệ), nút chuyển đổi Theme Sáng/Tối, nút Hamburger cho Mobile.
- [x] **Phần Giới Thiệu (Hero & About):** Lời chào, ảnh đại diện Avatar, họ tên, MSV **B23DCCC092**, trường PTIT, nút CTA xem dự án / liên hệ / tải CV, liên kết mạng xã hội (GitHub, Email, LinkedIn, Facebook). Mục "Về bản thân" có bảng thông tin cá nhân và định hướng nghề nghiệp.
- [x] **Danh Sách Kỹ Năng (Skills):** Phân chia thành 3 nhóm lớn:
  1. *Frontend Development:* HTML5, CSS3, JavaScript ES6+, React.js, Responsive Design.
  2. *Backend & Database:* Python, Node.js / Express, MySQL, Socket & Network Protocols, RESTful API.
  3. *Công cụ & Môi trường:* Git / GitHub, Linux WSL, Docker, Wireshark, Figma.
- [x] **Danh Sách Dự Án (Projects - 5 dự án, vượt yêu cầu ≥ 3):**
  1. *Website Portfolio Cá Nhân (BaiTH01):* HTML5, CSS3, JavaScript ES6+, Responsive.
  2. *Truyền Thông Multicast & Giám Sát Wireshark:* Python Socket, UDP Multicast, IGMP.
  3. *Mô Hình Khai Phá & Dự Đoán Sống Sót Titanic:* Python, Scikit-Learn, Pandas, Decision Tree.
  4. *Hệ Thống Data Pipeline ETL Tự Động Hoá:* Python, PostgreSQL, Docker, Cron.
  5. *TaskFlow Pro - Quản Lý Tiến Độ Kanban:* Vanilla JS, CSS Grid, LocalStorage.
- [x] **Form Liên Hệ (Contact):** Ô nhập Họ và tên, Địa chỉ Email, Số điện thoại, Tiêu đề, Nội dung tin nhắn kèm bộ đếm ký tự, Nút Gửi tin nhắn và Nút Làm lại.
- [x] **Footer:** Thông tin bản quyền, hiển thị năm hiện tại tự động bằng JS, các liên kết nhanh và liên kết mạng xã hội.

---

### 3.2. Thiết Kế & Bố Cục CSS
- [x] **Bố cục Flexbox & Grid:**
  - *Flexbox:* Được áp dụng cho Header/Navbar, Hero CTA buttons, Badges, Footer layout, Filter tabs.
  - *CSS Grid:* Được áp dụng cho Lưới kỹ năng (Skills Grid 3 cột), Lưới dự án (Projects Grid `repeat(auto-fill, minmax(350px, 1fr))`), Bố cục phần giới thiệu (About Grid) và Form liên hệ (Contact Grid).
- [x] **Hiệu ứng Hover:**
  - Nút bấm (Button) nổi lên và có hiệu ứng phát sáng nhẹ (`box-shadow: var(--shadow-glow)`).
  - Thẻ dự án (Project Cards) có hiệu ứng phóng to ảnh, nổi khối đổ bóng mềm mại (`translateY(-7px)`).
  - Thẻ kỹ năng và thẻ thông tin có hiệu ứng chuyển màu viền sang tông màu chủ đạo.
  - Link điều hướng có hiệu ứng đổi nền và chuyển động mượt mà.
- [x] **Responsive đầy đủ (Hơn 2 breakpoint):**
  - **Desktop (> 1024px):** Giao diện đầy đủ nhiều cột, thanh menu ngang, ảnh avatar bên phải hero.
  - **Tablet (768px - 1024px):** Bố cục co giãn 2 cột hoặc chuyển sang 1 cột tinh gọn, cân đối khoảng cách lề.
  - **Mobile (< 768px):** Menu chuyển thành ngăn kéo trượt (Navigation Drawer) kích hoạt bằng nút Hamburger, bố cục chuyển sang 1 cột duy nhất, form và nút bấm mở rộng toàn màn hình giúp thao tác chạm dễ dàng.
  - **Small Mobile (< 480px):** Tối ưu font chữ và khoảng cách lề cho các màn hình kích thước nhỏ.

---

### 3.3. Các Tính Năng Tương Tác JavaScript (12 Tính năng - Vượt yêu cầu ≥ 5)

| STT | Tính Năng JavaScript | Mô Tả Chi Tiết Hoạt Động |
|:---:|:---|:---|
| **1** | **Menu Hamburger Mobile** | Mở/đóng menu ngăn kéo trượt trên màn hình điện thoại, biến đổi icon sang dấu X, có backdrop mờ và tự động đóng khi chọn menu item hoặc ấn phím `Escape`. |
| **2** | **Dark / Light Mode Toggle** | Chuyển đổi giao diện Sáng / Tối, đổi icon Mặt trăng/Mặt trời, tự động lưu tuỳ chọn vào `localStorage` và tự động nhận diện chế độ ban đêm của hệ điều hành. |
| **3** | **Validate Form Đa Điều Kiện** | Kiểm tra realtime (khi gõ và rời ô input) cùng khi bấm Submit: <br>• Họ tên ≥ 2 ký tự, không chứa số/ký tự lạ.<br>• Email đúng regex chuẩn email RFC.<br>• SĐT đúng 10 số đầu mạng VN (03, 05, 07, 08, 09).<br>• Tiêu đề ≥ 3 ký tự.<br>• Tin nhắn ≥ 10 ký tự.<br>Hiển thị thông báo lỗi màu đỏ trực tiếp dưới từng ô. |
| **4** | **Đếm Số Ký Tự (Character Counter)** | Đếm trực tiếp số lượng ký tự nhập vào ô tin nhắn (`0 / 500 ký tự`), chuyển sang màu vàng cảnh báo khi sắp hết và màu đỏ khi đạt giới hạn tối đa. |
| **5** | **Bộ Lọc Danh Mục Dự Án** | Lọc danh sách dự án tức thì theo các tab: Tất cả, Frontend, Mạng & Phân tán, AI & Dữ liệu. |
| **6** | **Tìm Kiếm Dự Án Trực Tiếp (Live Search)** | Ô tìm kiếm lọc dự án theo thời gian thực dựa trên tiêu đề, mô tả và từ khoá công nghệ (hỗ trợ tiếng Việt không dấu). Hiển thị số lượng dự án tìm thấy và giao diện rỗng khi không có kết quả. |
| **7** | **ScrollSpy & Active Navigation Link** | Theo dõi vị trí cuộn trang để tự động đánh dấu (active) mục menu tương ứng trên thanh điều hướng. |
| **8** | **Hiệu Ứng Xuất Hiện Khi Cuộn (Scroll Reveal)** | Sử dụng `IntersectionObserver` API để tạo hiệu ứng mượt mà xuất hiện từ dưới lên, từ trái qua và từ phải sang khi người dùng cuộn đến nội dung. |
| **9** | **Thanh Tiến Độ Kỹ Năng Tự Động Chạy** | Các thanh tiến độ (Progress bar) tự động tăng từ 0% lên mức kỹ năng tương ứng khi cuộn tới mục Kỹ năng. |
| **10** | **Hiển Thị Năm Hiện Tại Ở Footer** | Sử dụng `new Date().getFullYear()` để cập nhật năm bản quyền tự động, không bị lỗi thời theo thời gian. |
| **11** | **Nút Cuộn Lên Đầu Trang (Back to Top)** | Nút tròn nổi ở góc màn hình, tự động xuất hiện khi cuộn trang xuống quá 350px và cuộn mượt (smooth scroll) lên đỉnh trang khi nhấn. |
| **12** | **Cửa Sổ Modal Chi Tiết Dự Án & Toast Alert** | Nhấp nút "Chi tiết" để mở popup hiển thị kiến trúc dự án, công nghệ và bài học kinh nghiệm; Hệ thống Toast thông báo trạng thái nổi góc màn hình. |

---

## 📁 4. Cấu Trúc Thư Mục Dự Án

```
B23DCCC092-BaiTH01/
│
├── index.html                  # Trang chủ HTML ngữ nghĩa hoàn chỉnh
├── README.md                   # Báo cáo chi tiết bài thực hành
│
├── css/
│   └── style.css               # Toàn bộ CSS (Flexbox, Grid, Variables, Responsive, Animations)
│
├── js/
│   └── script.js               # Xử lý toàn bộ logic tương tác JavaScript thuần
│
└── assets/
    └── images/                 # Tài nguyên hình ảnh Vector SVG tự thiết kế
        ├── avatar.svg          # Ảnh đại diện cá nhân của Phạm Xuân Kỳ
        ├── project-portfolio.svg# Ảnh đại diện dự án Portfolio
        ├── project-network.svg # Ảnh đại diện dự án Multicast UDP & Wireshark
        ├── project-titanic.svg # Ảnh đại diện dự án Titanic Machine Learning
        ├── project-pipeline.svg# Ảnh đại diện dự án Data Pipeline ETL
        └── project-taskflow.svg# Ảnh đại diện dự án TaskFlow Kanban
```

---

## 🚀 5. Hướng Dẫn Cài Đặt & Chạy Thử

1. **Cách 1: Mở trực tiếp trên trình duyệt**
   - Tải về hoặc clone repository về máy tính:
     ```bash
     git clone https://github.com/kydeptrai1209/B23DCCC092-BaiTH01.git
     ```
   - Nhấp đúp chuột vào file `index.html` để mở trực tiếp trên Google Chrome, Microsoft Edge, Firefox,...

2. **Cách 2: Sử dụng Live Server trong VS Code (Khuyên dùng)**
   - Mở thư mục dự án trong Visual Studio Code.
   - Nhấp chuột phải vào file `index.html` và chọn **Open with Live Server** (phím tắt `Alt + L, Alt + O`).
   - Truy cập vào địa chỉ `http://127.0.0.1:5500`.

---

## 👤 6. Thông Tin Tác Giả

- **Sinh viên:** Phạm Xuân Kỳ
- **Mã sinh viên:** B23DCCC092
- **Email:** [phamky136@gmail.com](mailto:phamky136@gmail.com)
- **GitHub:** [https://github.com/kydeptrai1209](https://github.com/kydeptrai1209)
- **Đơn vị:** Khoa Công nghệ Thông tin - Học viện Công nghệ Bưu chính Viễn thông (PTIT)
