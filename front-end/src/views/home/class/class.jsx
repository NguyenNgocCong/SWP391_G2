import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// Layout
import Footer from "../layout/footer/footer";
import Header from "../layout/header/header";
// Images
import bannerImg from "../../../images/banner/banner3.jpg";
import Paging from "../../Paging/Paging";
import { classApi } from "../../../api/classApi";
import { combieImg } from "../../../utils/index";
import ProductAside from "../element/course-aside";
import { ToastContainer } from "react-bootstrap";
import { TYPE_CHECKOUT_CLASS } from "../../../constants";
function Class() {
  const [res, setRes] = useState(classEx);
  const history = useHistory();

  const [page, setPage] = useState(1);


  useEffect(() => {
    // eslint-disable-next-line
    classApi.getAllClass(page - 1).then((res) => {
      setRes(res);
    });
  }, [page]);

  const { data, totalItems, totalPages, currentPage } = res;


  return (
    <>
      <Header />
      <ToastContainer />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Danh sách lớp học</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Danh sách lớp học</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <ProductAside></ProductAside>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    {data.length > 0 ? data.map((item, index) => (
                      <div
                        className="col-md-6 col-lg-4 col-sm-6 m-b30"
                        key={index}
                      >
                        <div className="cours-bx">
                          <div className="action-box">
                            <img
                              src={
                                item?.packages?.image != null &&
                                  item?.packages?.image
                                  ? combieImg(item?.packages?.image)
                                  : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                              }
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <Link
                              to={`/class/${item.id}`}
                              className="btn m-3 btn-warning"
                            >
                              Xem thêm
                            </Link>
                          </div>
                          <div className="info-bx">
                            <h5>{item.packages.title}</h5>
                            <div>
                              <i className="fa fa-calendar"></i>{" "}
                              {item?.schedule}&emsp;
                              <i className="fa fa-clock-o"></i>{" "}
                              {item?.time}
                            </div>
                            <div>
                              <i className="fa fa-calculator"></i>{" "}
                              {new Date(item?.dateFrom).toLocaleDateString()} -{" "}
                              {new Date(item?.dateTo).toLocaleDateString()}
                            </div>
                            <div>
                              <i className="fa fa-location-arrow"></i>{" "}
                              {item?.branch?.setting_title
                                ? item?.branch?.setting_title
                                : "Online"}
                            </div>
                            <div>
                              <i className="fa fa-user"></i>{" "}
                              {item?.trainer?.user?.fullname}
                            </div>
                          </div>
                          <div className="cours-more-info">
                            <div className="price">
                              <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.packages?.listPrice)}</del>
                              <h5>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.packages?.salePrice)}</h5>
                            </div>
                            <div className="review">
                              <div
                                className="btn btn-warning"
                                onClick={() => {
                                  history.push("/checkout", {
                                    type: TYPE_CHECKOUT_CLASS,
                                    class: item,
                                  });
                                }}
                              >
                                <i className="fa fa-phone"></i> Liên hệ
                              </div>
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              {/* <div>{item.status}</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : <h6>Không có lớp học nào</h6>}
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        {/* <ul className="pagination">
													<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to="#">1</Link></li>
													<li><Link to="#">2</Link></li>
													<li><Link to="#">3</Link></li>
													<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
												</ul> */}
                        <Paging
                          currentPage={currentPage}
                          totalPage={totalPages}
                          totalItem={totalItems}
                          onChange={(e) => {
                            setPage(e);
                          }}
                        ></Paging>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


const classEx = {
  totalItems: 2,
  data: [
    {
      id: 1,
      code: "IS202211242023",
      dateFrom: "2022-11-25T00:00:00.000+00:00",
      dateTo: "2022-11-22T00:00:00.000+00:00",
      dateStart: "2022-11-24T00:00:00.000+00:00",
      status: true,
      branch: {
        setting_id: 26,
        type: { type_id: 7, title: "Training Branch" },
        setting_title: "Cầu giấy",
        setting_value: "branch_cau_giay",
        display_order: "qưd",
        status: true,
        desciption: "qưd",
      },
      packages: {
        id: 1,
        title: "khóa học spring MVC cơ bản",
        excerpt:
          "Khóa học này được soạn theo hướng làm dự án hoàn chỉnh từ đầu đến cuối. Khi học xong khóa học, học viên có thể xây dựng một ứng dụng hoàn chỉnh bằng công nghệ Java Spring MVC",
        duration: "60",
        description:
          '<h4><strong>Giới thiệu</strong></h4><h2>Giới thiệu</h2><p>Khóa học Xây dựng ứng dụng quản lý kho hàng sử dụng Java Spring MVC và hệ quản trị cơ sở dữ liệu MySQL nhằm giúp các bạn có nhu cầu muốn học Java nói chung và Java Web nói riêng. Khóa học này được thiết kế theo hướng làm dự án hoàn chỉnh từ đầu đến cuối. Khi học xong khóa học, học viên có thể xây dựng một ứng dụng hoàn chỉnh bằng công nghệ Java Spring và MySQL.</p><p>Khóa học này cũng trang bị các kiến thức về mô hình MVC, Java Web và MySQL đồng thời trang bị các kỹ năng giải quyết vấn đề khi gặp phải trong khi xây dựng ứng dụng với Java Spring. Khóa học được xây dựng bởi giảng viên Nguyễn Việt Hùng có nhiều năm phát triển ứng dụng với Java Spring MVC.</p><p>Khi tham gia khóa học các bạn sẽ được tham gia vào nhóm riêng để cùng nhau giao lưu và học hỏi lẫn nhau cũng như được sự hỗ trợ trực tiếp bởi giảng viên.</p><h2>Công nghệ sử dụng</h2><ul><li>Java Spring MVC + Hibernate + Spring MVC</li><li>MySQL</li><li>Java 8</li><li>IDE: Eclipse</li><li>Web Server</li></ul><h2>Đối tượng khóa học</h2><ol><li>Những bạn muốn học phát triển ứng dụng web bằng Java</li><li>Các bạn đang học hay sử dụng công nghệ khác muốn chuyển đổi</li><li>Các bạn muốn nâng cao kỹ năng phát triển web bằng Java</li></ol><h2>Điều kiện học</h2><ol><li>Học viên tham gia khóa học cần có kiến thức cơ bản về Java và HTML/CSS</li><li>Học viên nếu chưa biết về Java có thể tham khảo <a href="https://tedu.com.vn/khoa-hoc/lap-trinh-java-can-ban-22.html">https://tedu.com.vn/khoa-hoc/lap-trinh-java-can-ban-22.html</a></li></ol><h2>Dự kiến thời gian ra mắt và học phí</h2><ul><li>Dự kiến thời gian ra mắt: 1/1/2019</li><li>Học phí dự kiến: 1.600.000  ₫</li></ul><h2>Nội dung khóa học</h2><ol><li>Giới thiệu khóa học và công nghệ sử dụng</li><li>Giới thiệu về JDBC</li><li>Giới thiệu về Hibernate&nbsp; Phần 1</li><li>Giới thiệu về Hibernate Phần 2</li><li>Giới thiệu về Spring Core – Phần 1</li><li>Giới thiệu về Spring Core – Phần 2</li><li>Giới thiệu về Spring core-Phần 3</li><li>Giới thiệu về mô hình MVC, luồng hoạt động của Spring MVC</li><li>Phân tích nghiệp vụ cho project</li><li>Thiết kế Database, mô tả chức năng của từng bảng</li><li>Triển khai tạo database lên MySQL</li><li>Khởi tạo project, thiết lập cấu hình cho dự án .</li><li>Giới thiệu tổ chức cấu trúc dự án, khởi tạo các file mapping cho Hibernate, dựng mockup cho ứng dụng</li><li>Ghép giao diện HTML vào ứng dụng</li><li>Áp dụng template engine Apache tiles vào dự án</li><li>Xây dựng kết nối tới database</li><li>Xây dựng login module: login service &amp; login validate</li><li>Xây dựng login module: login controller &amp; form login</li><li>Tạo menu động dựa theo phân quyền</li><li>Xây dựng bộ lọc kiểm tra quyền và kiểm tra đăng nhập.</li><li>Xây dựng Category module: Category service &amp; Category validate</li><li>Xây dựng Category module: Category Controller</li><li>Xây dựng Category module: Tạo màn hình add, edit, view cho category</li><li>Xây dựng Category module: Tạo màn hình&nbsp; category list và các chức năng thao tác trên list</li><li>Xây dựng Category module: Tạo form tìm kiếm dữ liệu</li><li>Tạo chức năng phân trang cho hệ thống</li><li>Xây dựng Product Info module: Product Info service &amp; Product Info validate</li><li>Xây dựng Product Info module: Cấu hình file upload cho hệ thống, tạo Product Info Controller</li><li>Xây dựng Product Info module: Tạo form upload file cho màn hình, tạo màn hình add, edit, view</li><li>Xây dựng Product Info module: Hiển thị product info list, các thao tác trên list</li><li>Xây dựng chức năng hiển thị danh sách sản phẩm trong kho, tìm kiếm dữ liệu</li><li>Xây dựng chức năng hiển thị lịch sử kho, tìm kiếm dữ liệu.</li><li>Xây dung chức năng nhập hàng: service &amp; validate .</li><li>Xây dựng chức năng nhập hàng:controller &nbsp;Phần 2</li><li>Xây dựng chức năng nhập hàng: giao diện list, add, edit, view</li><li>Xây dựng chức năng nhập hàng: Xuất báo cáo</li><li>Hướng dẫn xây dựng chức năng xuất hàng</li><li>Hướng dẫn xây dựng module User&nbsp;.</li><li>Hướng dẫn xây dựng module Role</li><li>Xây dựng màn hình danh sách menu</li><li>Xây dựng chức năng cấp quyền</li><li>Hướng dẫn deploy ứng dụng lên web server</li></ol>',
        status: true,
        listPrice: 300.0,
        salePrice: 180.0,
        sucjectCode: {
          id: 1,
          code: "Java0001",
          name: "Lập trình java spring",
          status: true,
          note: "khóa học lập trình java spring",
          manager: {
            id: 3,
            username: "NgVinh",
            email: "manage1@gmail.com",
            fullname: "Nguyễn Văn Vinh",
            phoneNumber: "0358283749",
            avatar: null,
            role: "ROLE_MANAGER",
            active: true,
          },
          expert: {
            id: 10,
            username: "Hungnv",
            email: "expert4@gmail.com",
            fullname: "Nguyễn Việt Hùng",
            phoneNumber: "01238423753",
            avatar: "a0222275-f295-4552-8690-8f182ff20bf5.jpg",
            role: "ROLE_EXPERT",
            active: true,
          },
          image: null,
          categoryId: 12,
        },
      },
      trainer: {
        id: 3,
        createdDate: "2022-11-18 20:51:38.262",
        updatedDate: "2022-11-18 20:51:38.263",
        company: "FPT software",
        jobTitle: ".NET Project Techlead - Project Manager",
        status: true,
        description:
          "<p>Kỹ năng: Có hơn 8 năm làm dự án về ASP.NET MVC, WebForm, Web Service, Web API, ASP.NET Core, Angular&nbsp;SQL Server, JQuery, SOLID, Design Pattern, DevOps.</p><p>Kinh nghiệm giảng dạy: Đã có 5 năm kinh nghiệm giảng dạy online qua kênh đào tạo</p>",
        user: {
          id: 8,
          createdDate: "2022-10-25 11:07:01.252",
          updatedDate: "2022-11-19 13:38:22.102",
          email: "expert2@gmail.com",
          username: "Toanbn",
          password:
            "$2a$10$5hB.S1F2mmY1a19omdGGiebwWXanOJXfLceeL6OlyHSEwg2znEaU2",
          fullname: "Bạch Ngọc Toàn",
          phoneNumber: "09836342323",
          avatar: "1131cab7-2257-4bb5-a07b-d1e78a88316a.jpg",
          note: null,
          active: true,
          registerToken: "teNmBZM4k1lhaengvFGKFX6oVRvUkI",
          timeRegisterToken: "2022-10-25T11:07:01",
          resetPasswordToken: null,
          type_account: null,
          role: {
            setting_id: 8,
            type: { type_id: 1, title: "User Role" },
            setting_title: "Expert",
            setting_value: "ROLE_EXPERT",
            display_order: "role of expert",
            status: true,
            desciption: "role of expert",
          },
        },
      },
      supporter: {
        id: 23,
        username: "Hungnh",
        email: "Trainee@gmail.com",
        fullname: "Nguyễn Huy Hùng",
        phoneNumber: "0987354637",
        avatar: "539a5b19-a0b4-4755-8eff-be6c1df53026.jpg",
        role: "ROLE_SUPPORTER",
        active: true,
      },
    },
    {
      id: 2,
      code: "IS202211241953",
      dateFrom: "2022-11-19T00:00:00.000+00:00",
      dateTo: "2022-11-26T00:00:00.000+00:00",
      dateStart: "2022-11-26T00:00:00.000+00:00",
      status: true,
      branch: null,
      packages: {
        id: 1,
        title: "khóa học spring MVC cơ bản",
        excerpt:
          "Khóa học này được soạn theo hướng làm dự án hoàn chỉnh từ đầu đến cuối. Khi học xong khóa học, học viên có thể xây dựng một ứng dụng hoàn chỉnh bằng công nghệ Java Spring MVC",
        duration: "60",
        description:
          '<h4><strong>Giới thiệu</strong></h4><h2>Giới thiệu</h2><p>Khóa học Xây dựng ứng dụng quản lý kho hàng sử dụng Java Spring MVC và hệ quản trị cơ sở dữ liệu MySQL nhằm giúp các bạn có nhu cầu muốn học Java nói chung và Java Web nói riêng. Khóa học này được thiết kế theo hướng làm dự án hoàn chỉnh từ đầu đến cuối. Khi học xong khóa học, học viên có thể xây dựng một ứng dụng hoàn chỉnh bằng công nghệ Java Spring và MySQL.</p><p>Khóa học này cũng trang bị các kiến thức về mô hình MVC, Java Web và MySQL đồng thời trang bị các kỹ năng giải quyết vấn đề khi gặp phải trong khi xây dựng ứng dụng với Java Spring. Khóa học được xây dựng bởi giảng viên Nguyễn Việt Hùng có nhiều năm phát triển ứng dụng với Java Spring MVC.</p><p>Khi tham gia khóa học các bạn sẽ được tham gia vào nhóm riêng để cùng nhau giao lưu và học hỏi lẫn nhau cũng như được sự hỗ trợ trực tiếp bởi giảng viên.</p><h2>Công nghệ sử dụng</h2><ul><li>Java Spring MVC + Hibernate + Spring MVC</li><li>MySQL</li><li>Java 8</li><li>IDE: Eclipse</li><li>Web Server</li></ul><h2>Đối tượng khóa học</h2><ol><li>Những bạn muốn học phát triển ứng dụng web bằng Java</li><li>Các bạn đang học hay sử dụng công nghệ khác muốn chuyển đổi</li><li>Các bạn muốn nâng cao kỹ năng phát triển web bằng Java</li></ol><h2>Điều kiện học</h2><ol><li>Học viên tham gia khóa học cần có kiến thức cơ bản về Java và HTML/CSS</li><li>Học viên nếu chưa biết về Java có thể tham khảo <a href="https://tedu.com.vn/khoa-hoc/lap-trinh-java-can-ban-22.html">https://tedu.com.vn/khoa-hoc/lap-trinh-java-can-ban-22.html</a></li></ol><h2>Dự kiến thời gian ra mắt và học phí</h2><ul><li>Dự kiến thời gian ra mắt: 1/1/2019</li><li>Học phí dự kiến: 1.600.000  ₫</li></ul><h2>Nội dung khóa học</h2><ol><li>Giới thiệu khóa học và công nghệ sử dụng</li><li>Giới thiệu về JDBC</li><li>Giới thiệu về Hibernate&nbsp; Phần 1</li><li>Giới thiệu về Hibernate Phần 2</li><li>Giới thiệu về Spring Core – Phần 1</li><li>Giới thiệu về Spring Core – Phần 2</li><li>Giới thiệu về Spring core-Phần 3</li><li>Giới thiệu về mô hình MVC, luồng hoạt động của Spring MVC</li><li>Phân tích nghiệp vụ cho project</li><li>Thiết kế Database, mô tả chức năng của từng bảng</li><li>Triển khai tạo database lên MySQL</li><li>Khởi tạo project, thiết lập cấu hình cho dự án .</li><li>Giới thiệu tổ chức cấu trúc dự án, khởi tạo các file mapping cho Hibernate, dựng mockup cho ứng dụng</li><li>Ghép giao diện HTML vào ứng dụng</li><li>Áp dụng template engine Apache tiles vào dự án</li><li>Xây dựng kết nối tới database</li><li>Xây dựng login module: login service &amp; login validate</li><li>Xây dựng login module: login controller &amp; form login</li><li>Tạo menu động dựa theo phân quyền</li><li>Xây dựng bộ lọc kiểm tra quyền và kiểm tra đăng nhập.</li><li>Xây dựng Category module: Category service &amp; Category validate</li><li>Xây dựng Category module: Category Controller</li><li>Xây dựng Category module: Tạo màn hình add, edit, view cho category</li><li>Xây dựng Category module: Tạo màn hình&nbsp; category list và các chức năng thao tác trên list</li><li>Xây dựng Category module: Tạo form tìm kiếm dữ liệu</li><li>Tạo chức năng phân trang cho hệ thống</li><li>Xây dựng Product Info module: Product Info service &amp; Product Info validate</li><li>Xây dựng Product Info module: Cấu hình file upload cho hệ thống, tạo Product Info Controller</li><li>Xây dựng Product Info module: Tạo form upload file cho màn hình, tạo màn hình add, edit, view</li><li>Xây dựng Product Info module: Hiển thị product info list, các thao tác trên list</li><li>Xây dựng chức năng hiển thị danh sách sản phẩm trong kho, tìm kiếm dữ liệu</li><li>Xây dựng chức năng hiển thị lịch sử kho, tìm kiếm dữ liệu.</li><li>Xây dung chức năng nhập hàng: service &amp; validate .</li><li>Xây dựng chức năng nhập hàng:controller &nbsp;Phần 2</li><li>Xây dựng chức năng nhập hàng: giao diện list, add, edit, view</li><li>Xây dựng chức năng nhập hàng: Xuất báo cáo</li><li>Hướng dẫn xây dựng chức năng xuất hàng</li><li>Hướng dẫn xây dựng module User&nbsp;.</li><li>Hướng dẫn xây dựng module Role</li><li>Xây dựng màn hình danh sách menu</li><li>Xây dựng chức năng cấp quyền</li><li>Hướng dẫn deploy ứng dụng lên web server</li></ol>',
        status: true,
        listPrice: 300.0,
        salePrice: 180.0,
        sucjectCode: {
          id: 1,
          code: "Java0001",
          name: "Lập trình java spring",
          status: true,
          note: "khóa học lập trình java spring",
          manager: {
            id: 3,
            username: "NgVinh",
            email: "manage1@gmail.com",
            fullname: "Nguyễn Văn Vinh",
            phoneNumber: "0358283749",
            avatar: null,
            role: "ROLE_MANAGER",
            active: true,
          },
          expert: {
            id: 10,
            username: "Hungnv",
            email: "expert4@gmail.com",
            fullname: "Nguyễn Việt Hùng",
            phoneNumber: "01238423753",
            avatar: "a0222275-f295-4552-8690-8f182ff20bf5.jpg",
            role: "ROLE_EXPERT",
            active: true,
          },
          image: null,
          categoryId: 12,
        },
      },
      trainer: {
        id: 2,
        createdDate: "2022-11-18 17:41:16.834",
        updatedDate: "2022-11-18 17:41:16.834",
        company: "Fpt",
        jobTitle: "Techincal Architect",
        status: true,
        description:
          "<p>Với những kiến thức và kinh nghiệm của mình, anh luôn mong muốn chia sẻ những gì mình có được để góp phần phát triển nguồn nhân lực chất lượng cao tại Việt Nam và vì sự phát triển chung của cộng đồng IT Việt Nam</p>",
        user: {
          id: 7,
          createdDate: "2022-10-25 11:06:52.17",
          updatedDate: "2022-11-19 13:51:33.66",
          email: "expert1@gmail.com",
          username: "Thanhlt",
          password:
            "$2a$10$pgLrPMPC3m5QYUJ81ECQbeFCZAOFVCJquv5g8n8RN92iy.hPwN.Gq",
          fullname: "Lê Tiến Thành",
          phoneNumber: "098673456",
          avatar: "9c8c4dcd-d72b-4329-8389-2d1dc1d86394.jpg",
          note: null,
          active: true,
          registerToken: "QmxuJQILYsJKgXyPKXGJO0aAvdHS98",
          timeRegisterToken: "2022-10-25T11:06:52",
          resetPasswordToken: null,
          type_account: null,
          role: {
            setting_id: 8,
            type: { type_id: 1, title: "User Role" },
            setting_title: "Expert",
            setting_value: "ROLE_EXPERT",
            display_order: "role of expert",
            status: true,
            desciption: "role of expert",
          },
        },
      },
      supporter: {
        id: 21,
        username: "Supporter",
        email: "Supporter@gmail.com",
        fullname: "Supporter",
        phoneNumber: "",
        avatar: "24659c6a-2ab5-4e7c-ad7b-e8f99733ac44.jpg",
        role: "ROLE_SUPPORTER",
        active: true,
      },
    },
  ],
  totalPages: 1,
  currentPage: 0,
};

export default Class;
