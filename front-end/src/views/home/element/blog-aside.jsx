import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import useDebounce from "../../../hooks/useDebounce";
import { combieImg } from "../../../utils";

function BlogAside() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);
  const [topviews, setListTopViews] = useState([]);
  const [params, setParams] = useState({ keyword: "", category: "" });

  const debouncedSearchTerm = useDebounce(params.keyword, 500);

  const getListCategory = async () => {
    try {
      const response = await userApi.getListCategoryPost();
      setListCategory(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getListRecentPost = async () => {
    try {
      const response = await userApi.getListRecentPost(4);
      setRecentBlog(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getListCategory();
    getListRecentPost();
    userApi.getListTopViewPost(4).then((res) => {
      setListTopViews(res);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      history.push("/blog", { keyword: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, history]);

  const handleSearch = (e) => {
    setParams({ ...params, keyword: e.target.value });
    if (!e.target.value) history.push("/blog");
  };
  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <h5 className="widget-title">Tìm kiếm</h5>
          <div className="search-bx style-1">
            <form role="search">
              <div className="input-group">
                <input
                  name="text"
                  className="form-control"
                  placeholder="Nhập từ khóa..."
                  type="text"
                  value={params.keyword}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn">
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="widget widget_archive">
          <h5 className="widget-title">Chủ đề</h5>
          <ul>
            <li className="active">
              <h6 role={"button"}
                onClick={() => {
                  history.push("/blog", { category: 0 });
                }} to="#">Tất cả</h6>
            </li>
            {listCategory.map((category) => {
              return (
                <li key={category?.setting_id}>
                  <h6
                    role={"button"}
                    onClick={() => {
                      history.push("/blog", { category: category.setting_id });
                    }}
                  >
                    {category.setting_title}
                  </h6>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="widget">
          <h5 className="widget-title">Blog nổi bật</h5>
          <div className="widget-post-bx">
            {topviews.map((blog) => {
              return (
                <div
                  style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                  className="p-1 d-flex gap-1 round-2 widget-post"
                  key={blog?.id}
                >
                  <img
                    src={(blog.thumnailUrl != null && blog.thumnailUrl) ? combieImg(blog.thumnailUrl) : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"}
                    alt=""
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                    width={100}
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />{" "}
                  <div className="ttr-post-info" style={{ marginLeft: "5px" }}>
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link to={`/blog/${blog?.id}`}>{blog?.title}</Link>
                      </h6>
                    </div>
                    <ul className="media-post" style={{ marginBottom: "10px" }}>
                      <li>
                        <Link to={`/blog/${blog?.id}`}>
                          <i className="fa fa-eye"></i>
                          {blog?.views}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="widget">
          <h5 className="widget-title">Blog mới nhất</h5>
          <div className="widget-post-bx">
            {recentBlog.map((blog) => {
              return (
                <div
                  style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                  className="p-1 d-flex gap-1 round-2 widget-post"
                  key={blog?.id}
                >
                  <img
                    src={(blog.thumnailUrl != null && blog.thumnailUrl) ? combieImg(blog.thumnailUrl) : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"}
                    alt=""
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                    width={100}
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />{" "}
                  <div className="ttr-post-info" style={{ marginLeft: "5px" }}>
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link to={`/blog/${blog?.id}`}>{blog?.title}</Link>
                      </h6>
                    </div>
                    <ul className="media-post" style={{ marginBottom: "10px" }}>
                      <li>
                        <Link to={`/blog/${blog?.id}`}>
                          <i className="fa fa-calendar"></i>
                          {new Date(blog?.createDate).toLocaleDateString()}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="widget widget_tag_cloud">
          <h5 className="widget-title">Tags</h5>
          <div className="tagcloud">
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "net" })}
            >
              Asp.Net core
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "python" })}
            >
              Python PIP
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "nodejs" })}
            >
              NodeJs
            </Link>
            <Link
              to={"#"}
              role="button"
              onClick={() => setParams({ keyword: "react" })}
            >
              ReactJs
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default BlogAside;
