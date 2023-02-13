import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
const Coursel = () => {
  const slides = [
    {
      url: "https://media.istockphoto.com/id/1369269456/photo/data-technology-computer-generated-digital-currency-and-exchange-stock-chart-for-finance-and.jpg?b=1&s=170667a&w=0&k=20&c=tmNEA23imoVX7-uAKgnr-l4LIpA5uyolTTS10sccq0Y=",
    },
    {
      url: "https://www.shutterstock.com/image-vector/astrology-horizontal-background-star-universe-260nw-1323923270.jpg",
    },
    {
      url: "https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-advanced-gold-foil-horizontal-line-advertising-comparison-backgroundadvancedgoldgold-foilgolden-lightblack-image_69695.jpg",
    },
    {
      url: "https://cdn.pixabay.com/photo/2018/05/01/07/52/tuscany-3364921__340.jpg",
    },
    {
      url: "https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {};
  return (
    <>
      <div className="max-w-[1400px] h-[780px] w-full py-16 px-4 relative group">
        <div
          style={{ background: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center">
          {slides.map((slide, slideIndex) => {
            <div
              key={slideIndex}
              onClick={() => {
                goToSlide;
              }}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />;
            </div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Coursel;
