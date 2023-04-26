import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from "../layout/header/header";
import Footer from "../layout/footer/footer";
import bannerImg from '../../../images/banner/banner3.jpg';

class About2 extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="page-content">
          <div
            className="page-banner ovbl-dark"
            style={{
              height: "200px",
              backgroundImage: "url(" + bannerImg + ")",
            }}
          >
            <div className="container">
              <div className="page-banner-entry">
                <h1 className="text-white">Giới thiệu</h1>
              </div>
            </div>
          </div>
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>Giới thiệu về LRS</li>
              </ul>
            </div>
          </div>

          <div className="content-block">
            <div className="section-area section-sp1">
              <div className="container">
                <div className="row align-items-center">
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Nguồn gốc</h2>
                    <div>
                      LRS là từ viết tắt của Learning Register System, là một thương hiệu được xây dựng bắt đầu từ khác sinh viên đại học FPT muốn được tìm tòi và phát triển 1 dự án buôn bán khóa học đến tay các bạn sinh viên 1 cách an toàn và thuận tiện nhất.
                    </div>
                    <div>
                      Được thành lập và bắt đầu dự án từ cuối tháng 8 với ý nghĩa và tầm nhìn mới nhằm xây dựng một cộng đồng chia sẻ kiến thức và kỹ năng lập trình cho tất cả mọi người.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Mục tiêu</h2>
                    <div>
                      Mục tiêu của LRS là đưa đến cho các bạn có niềm đam mê học lập trình một nơi để học tập,
                      và trao đổi về các chủ đề công nghệ. Giúp xây dựng một cộng đồng LRS lớn mạnh mang
                      lại thật nhiều giá trị cho xã hội. Giúp các bạn lập trình viên mới vào nghề rút ngắn thời gian tiếp
                      cận với công việc thực tế tạo ra giá trị cho doanh nghiệp và cho đất nước.
                    </div>
                    <div>
                      Để phát triển được một nền CNTT cái quan trọng nhất là con người.
                      Vậy chúng tôi tập trung vào con người vì mục tiêu 1 triệu lập trình viên cho Việt Nam vào năm 2022.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Giá trị cốt lõi</h2>
                    <div>
                      Giá trị cốt lõi của LRS chính là giá trị kiến thức và kỹ năng mang lại cho mỗi
                      thành viên của mình làm điều kiện tiên quyết trong tất cả các hoạt động của LRS.
                      LRS sẽ luôn lao động không ngừng nghỉ để nâng cao giá trị đó.
                    </div>
                  </div>
                  <div className="heading-bx left">
                    <h2 className="title-head m-b0">Chiến lược phát triển</h2>
                    <div>
                      Định hướng phát triển là trở thành một kênh đào tạo trực tuyến có uy tín là cầu nối cho doanh nghiệp và các bạn làm nghề.
                      Giúp tăng khả năng cạnh tranh cho các bạn lập trình viên và điều cuối cùng là
                      hỗ trợ xây dựng một nền CNTT phát triển tốt cho Việt Nam.
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
}

export default About2;
