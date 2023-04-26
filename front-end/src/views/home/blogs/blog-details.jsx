import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Layout
import Header from "../layout/header/header";
import Footer from "../layout/footer/footer";
import BlogAside from "../element/blog-aside";
import bannerImg from "../../../images/banner/banner2.jpg";
import { userApi } from "../../../api/userApi";
// import ReactHtmlParser from "react-html-parser";
import Comments from "../../element/Comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function BlogDetails(prop) {
  const [post, setPost] = useState(blogDetailsEx);
  const { id } = useParams();
  const [commets, setComments] = useState({ data: [] });
  const { isLogin } = useSelector((state) => state.auth);

  const getPostById = async () => {
    const response = await userApi.getPostById(id);
    setPost(response);
  };

  useEffect(() => {
    getPostById();
    userApi.getCommentBlog({BlogId : id}).then((x) => setComments(x));
    // eslint-disable-next-line
  }, []);

  const handleComment = async (data) => {
    if (isLogin) {
      await userApi
        .createComment({ ...data, blogId: id })
        .then((res) => {
          
          toast.success(res.message);
          userApi.getCommentBlog({BlogId : id}).then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{post?.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Blog Classic Sidebar</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            {" "}
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-xl-3 col-md-5 ">
                  <BlogAside />
                </div>
                <div className="col-lg-9 col-xl-9 col-md-7">
                  <div className="recent-news blog-lg">
                    {/* <div className="action-box blog-lg">
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          "/api/account/downloadFile/" +
                          post?.thumnailUrl
                        }
                        alt=""
                      />
                    </div> */}
                    <div className="info-bx">
                      <ul className="media-post">
                        <li>
                          <i className="fa fa-comments-o"></i>10 Comment
                        </li>
                      </ul>
                      <h3 className="post-title">{post?.title}</h3>
                      {/* <div>{ReactHtmlParser(post?.body)}</div> */}
                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square"></i>
                      </div>
                      {/* <div className="widget_tag_cloud">
                        <h6>TAGS</h6>
                        <div className="tagcloud">
                          <Link to="#">Design</Link>
                          <Link to="#">User interface</Link>
                          <Link to="#">SEO</Link>
                          <Link to="#">WordPress</Link>
                          <Link to="#">Development</Link>
                          <Link to="#">Joomla</Link>
                          <Link to="#">Design</Link>
                          <Link to="#">User interface</Link>
                          <Link to="#">SEO</Link>
                          <Link to="#">WordPress</Link>
                          <Link to="#">Development</Link>
                          <Link to="#">Joomla</Link>
                          <Link to="#">Design</Link>
                          <Link to="#">User interface</Link>
                          <Link to="#">SEO</Link>
                          <Link to="#">WordPress</Link>
                          <Link to="#">Development</Link>
                          <Link to="#">Joomla</Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="clear" id="comment-list">
                    <div className="comments-area" id="comments">
                      <Comments
                        hanleComment={handleComment}
                        comments={commets.data}
                      >
                      </Comments>
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

const blogDetailsEx = {
  id: 1,
  title: "Tìm hiểu về ABP Framework, một framework mã nguồn mở trên .NET",
  body: "",
  author: {
    id: 15,
    username: "hung1008",
    email: "hhung003@gmail.com",
    fullname: "Hùng Nguyễn Văn",
    phoneNumber: "0123123145345",
    avatar: "c34d591a-11fc-4109-99b1-acf25004ea87.jpg",
    role: "ROLE_ADMIN",
    active: true,
  },
  brefInfo: "Tìm hiểu về ABP Framework, một framework mã nguồn mở trên .NET",
  thumnailUrl: "f9b715ce-da5d-4174-8af7-69b90fe3e568.png",
  status: 2,
  categoryId: 16,
};

export default BlogDetails;
