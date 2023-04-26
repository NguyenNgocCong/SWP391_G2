import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import { combieImg } from "../../utils/index";

const Comments = ({ hanleComment, comments }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [vote, setVote] = useState(5);
  return (
    <div className="clear border p-4 my-4" id="comment-list">
      <div className="comments-area " id="comments">
        <h4 className="comments-title">{comments.length} Đánh giá và bình luận</h4>
        <div className="clearfix m-b20">
          <ol className="comment-list">
            {comments?.map((x, i) => (
              <li className="comment" key={i}>
                <div className="comment-body">
                  <div className="comment-author vcard">
                    <img
                      className="avatar photo"
                      src={combieImg(x.user.avatar)}
                      onError={({ currentTarget }) => {
                        currentTarget.src = testiPic1;
                      }}
                      alt=""
                    />
                    <cite className="fn">{x.user?.fullname} </cite>
                    <span className="comment-meta">
                      &nbsp;lúc {moment(x.created_date).format('DD/mm/yyyy hh:MM:ss A')}
                    </span>
                    <span className="comment-meta">
                      <ul className="cours-star">
                        {[1, 2, 3, 4, 5].map((star) => {
                          return (
                            <li
                              className={star <= x.vote && "active"}
                            >
                              <i className="fa fa-star fs-6"></i>
                            </li>
                          );
                        })}
                      </ul>
                    </span>
                  </div>
                  <p>{x.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {isLogin ? <div className="comment-respond" id="respond">
            <div className="d-flex justify-content-between">
              <h4 className="comment-reply-title" id="reply-title">
                Viết bình luận
              </h4>
              <ul className="cours-star">
                {[1, 2, 3, 4, 5].map((x) => {
                  return (
                    <li
                      className={x <= vote && "active"}
                      key={x}
                      onClick={() => setVote(x)}
                    >
                      <i className="fa fa-star fs-3"></i>
                    </li>
                  );
                })}
              </ul>
            </div>
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                hanleComment({
                  body: text,
                  vote: vote,
                });
                setText("");
              }}
            >
              <p className="comment-form-comment">
                <textarea
                  rows="8"
                  name="comment"
                  placeholder="Comment"
                  id="comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </p>
              <p className="form-submit">
                <input
                  type="submit"
                  value="Gửi phản hổi"
                  className="submit"
                  name="submit"
                  style={{ color: "black" }}
                />
              </p>
            </form>
          </div> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Comments;
