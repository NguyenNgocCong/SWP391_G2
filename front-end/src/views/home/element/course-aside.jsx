import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import useDebounce from "../../../hooks/useDebounce";
import { combieImg } from "../../../utils/index";

function ProductAside() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [topviews, setListTopViews] = useState([]);
  const [params, setParams] = useState({ keyword: "", category: "" });

  const debouncedSearchTerm = useDebounce(params.keyword, 500);

  const getListCategory = async () => {
    try {
      const response = await userApi.getListAllSubject();
      setListCategory(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      history.push("/products", { keyword: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, history]);

  const handleSearch = (e) => {
    setParams({ ...params, keyword: e.target.value });
    if (!e.target.value) history.push("/products");
  };
  useEffect(() => {
    getListCategory();
    userApi.getListTopViewPackage(4).then((res) => {
      setListTopViews(res);
    });
  }, []);

  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <h5 className="widget-title">Tìm kiếm </h5>
          <div className="search-bx style-1">
            <form role="search">
              <div className="input-group">
                <input
                  name="text"
                  className="form-control"
                  placeholder="Nhập từ khóa..."
                  type="text"
                  onChange={(e) => handleSearch(e)}
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
          <h5 className="widget-title style-1">Chủ đề</h5>
          <ul>
            <li className="active">
              <h6 role={"button"}
                onClick={(e) => {
                  history.push("/products", {
                    category: 0,
                  });
                }} >Tất cả</h6>
            </li>
            {listCategory.map((category) => {
              return (
                <li key={category?.id}>
                  <h6
                    role={"button"}
                    onClick={(e) => {
                      history.push("/products", {
                        category: category.id,
                      });
                    }}
                  >
                    {category.name}
                  </h6>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="widget  widget-courses">
          <h5 className="widget-title style-1">Khóa học nổi bật</h5>
          <div>
            {topviews.map((x) => (
              <div
                style={{ margin: "15px 0px", boxShadow: "0px 5px 20px rgb(0 0 0 / 5%)" }}
                className="d-flex gap-1 round-2 widget-post"
                key={x.id}
              >
                {" "}
                <img
                  src={(x?.image != null && x?.image) ? combieImg(x.image) : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"}
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
                      <Link to={`/courses-details/${x.id}`}> {x.title}</Link>
                    </h6>
                  </div>
                  <div className="ttr-post-meta">
                    <ul>
                      <li className="price">
                        <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x.listPrice)}</del>
                        <h5>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x.salePrice)}</h5>
                      </li>
                      <li className="review">{x.views} Lượt xem</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default ProductAside;
