import React from "react";

// Layout
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import LandingPage from "./element/landing-page";
import TopCourses from "./element/top-courses";
import JoinBx from "./element/join-bx";
import NewBlogPage from "./element/recent-blog";
import TopBlogPage from "./element/top-blog";
import Comment from "./element/comment";

function Index() {
    return (
        <div>
            <Header />
            <div className="page-content" >
                <div className="content-block bg-gray" id="content-area">
                    <LandingPage />
                    <JoinBx />
                    <TopCourses />
                    <NewBlogPage />
                    <TopBlogPage />
                    <Comment />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
