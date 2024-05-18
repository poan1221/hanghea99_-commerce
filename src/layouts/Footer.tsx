import shopLogo from "../assets/logo.svg";
export const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-[#BDC0C5] pt-12 pb-16">
      <div className="flex flex-col items-center text-center font-bold text-sm">
        <img src={shopLogo} alt="logo" />
        <div className="py-10 flex flex-col items-center">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <div className="text-[#898F97]">상호명</div>
              <div>(주)로운컴퍼니씨앤씨</div>
            </div>
            <div className="flex gap-1">
              <div className="text-[#898F97]">대표자명</div>
              <div>최윤석</div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="text-[#898F97]">사업장 주소</div>
            <div>
              03926 서울특별시 마포구 상암산로 76 (상암동) YTN 뉴스퀘어 13층
              로운컴퍼니씨앤씨
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1">
              <div className="text-[#898F97]">사업자 등록번호</div>
              <div>128-87-049266</div>
            </div>
            <div className="flex gap-1">
              <div className="text-[#898F97]">통신판매업 신고번호</div>
              <div>제 2022-서울마포-1985호</div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="text-[#898F97]">개인정보보호책임자</div>
            <div>최윤석</div>
          </div>
        </div>
        <div>
          Copyright (C) VLAST Co., Ltd. WARNING : All Rights Reserved.
          Unauthorized Duplication & Rent is Prohibited.
        </div>
      </div>
    </footer>
  );
};
