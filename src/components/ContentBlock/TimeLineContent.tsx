import * as React from "react";

type TimeLineContentBlockProps = {
  blockNrAndTime: string;
  title: string;
  text: string;
  children?: React.ReactNode;
  styles?: string;
  lineHeight?: string;
  id?: string;
};
const TimeLineContentBlock: React.FC<TimeLineContentBlockProps> = ({
  blockNrAndTime,
  title,
  text,
  children,
  styles,
  lineHeight,
  id,
}) => {
  const getClassName =
    styles != undefined || styles != null
      ? `flex flex-col justify-center w-full md:w-6/12 md:mx-auto pt-56 px-4 md:px-0 ${styles}`
      : `flex flex-col justify-center w-full md:w-6/12 md:mx-auto pt-56 px-4 md:px-0`;
  const getLineHeight =
    lineHeight != undefined || lineHeight != null
      ? `eclips-bottom eclips-bottom__left-0 ${styles}`
      : `eclips-bottom eclips-bottom__left-0`;
  return (
    <>
      <section
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="300"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        id={id}
      >
        <div className={getClassName}>
          <p className="text-blue-shipcove font-light text-sm text-center mb-6 font-inter">
            {blockNrAndTime}
          </p>
          <h1 className="text-white font-light text-base md:text-3xl leading-normal text-center mb-6 leading-title font-inter">
            {title}
          </h1>
          <p
            className="text-blue-shipcove font-light text-sm text-center mb-10 font-inter"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </div>
        {children}
        <div className="flex flex-wrap justify-center w-full md:w-7/12 pb-24 md:mx-auto mb-8">
          <div className={getLineHeight}>
            <div className="eclips-bottom-line" />
          </div>
        </div>
      </section>
    </>
  );
};

export default TimeLineContentBlock;