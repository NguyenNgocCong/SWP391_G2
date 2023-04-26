import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import OrderCancel from "./order-cancel/order-cancel";
import OrderDone from "./order-done/order-done";
import OrderOnline from "./order-online/orders";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import Registration from "./registration/registration";
import { Toaster } from "react-hot-toast";

function Orders(props) {

  const [active, setActive] = useState(1);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <Toaster></Toaster>
        <div className="body flex-grow px-2">
          <div
            style={{
              backgroundColor: "white",
              padding: "5px 0px",
              margin: "0px 0px 15px 0px",
            }}
          >
            <Tab.Container defaultActiveKey={active}>
              <Tab.Content>
                <div className="row">
                  <div className="profile-tabnav-sub">
                    <Nav className="nav-tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="1" onClick={() => setActive(1)}>
                          Đăng ký lớp học
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2" onClick={() => setActive(2)}>
                          Đăng ký khóa học
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3" onClick={() => setActive(3)}>
                          Đơn hàng đã thanh toán
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="4" onClick={() => setActive(4)}>
                          Đơn hàng đã hủy
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="tab-content">
                    <Tab.Pane eventKey="1">
                      <Registration activeTab={active} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                      <OrderOnline activeTab={active} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="3">
                      <OrderDone activeTab={active} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <OrderCancel activeTab={active} />
                    </Tab.Pane>
                  </div>
                </div>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Orders;

