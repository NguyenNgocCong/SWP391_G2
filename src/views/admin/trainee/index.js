import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import TraineeOnline from "./online/trainee";
import { Toaster } from "react-hot-toast";

function Trainee(props) {

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
                          Học viên offline
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2" onClick={() => setActive(1)}>
                          học viên online
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="tab-content">
                    <Tab.Pane eventKey="2">
                      <TraineeOnline activeTab={active} />
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

export default Trainee;

