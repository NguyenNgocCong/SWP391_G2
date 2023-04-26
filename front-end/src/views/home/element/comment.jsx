import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { userApi } from "../../../api/userApi";

// Images
import bg1 from '../../../images/background/bg1.jpg';
import { combieImg } from "../../../utils";

const Testimonial2 = () => {
	const [commets, setComments] = useState([]);
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	useEffect(() => {
		userApi.getCommentWeb().then((x) => {
			setComments(x.data)
		});
	}, []);

	return (
		<>
			<div className="section-area section-sp1 bg-fix ovbl-dark" style={{paddingBottom:"55px", backgroundImage: "url(" + bg1 + ")" }}>
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-white heading-bx left">
							<h2 className="title-head">Ý kiến <span>học viên</span></h2>
						</div>
					</div>
					<Slider {...settings} className="testimonial-carousel slick-slider owl-btn-1">
						{commets.map((item) => {
							return (
								<div key={item?.body} className="slider-item" >
									<div className="testimonial-bx">
										<div className="testimonial-head">
											<div className="testimonial-thumb" style={{borderRadius:"35px" }}>
												<img style={{ height: "70px", width: "100%", borderRadius:"35px" }} src={combieImg(item.user.avatar)} alt={item?.user?.username} />
											</div>
											<div className="testimonial-info">
												<h5 className="name">{item?.user?.fullname}</h5>
												<p>-{item?.user?.username}</p>
											</div>
										</div>
										<div>
											<p>{item.body}</p>
										</div>
									</div>
								</div>
							)
						})}
					</Slider>
				</div>
			</div>
		</>
	);
}

export default Testimonial2;