import { ReactNode } from "react";

export type ReturnInfoItem = {
  label: string;
  value: ReactNode;
};

export const returnExchangeInfoData: ReturnInfoItem[] = [
  {
    label: "반품/교환 택배사",
    value: "CJ대한통운",
  },
  {
    label: "반품 배송비 (편도)",
    value: "₩3,000",
  },
  {
    label: "교환 배송비 (왕복)",
    value: "₩6,000",
  },
  {
    label: "반품/교환 주소지",
    value: "경기 김포시 풍무2로 25 (풍무동) 7층 (10113)",
  },
  {
    label: "반품/교환 신청 기준일",
    value: (
      <>
        상품 수령 후 7일 이내
        <br />
        <span className="text-xs text-gray-500">
          (단, 제품이 표시광고 내용과 다르거나 불량 등 계약과 다르게 이행된
          경우는 제품 수령일로부터 3개월이내나 그 사실을 안 날 또는 알 수 있었던
          날부터 30일 이내 교환/반품이 가능)
        </span>
      </>
    ),
  },
  {
    label: "반품/교환 불가능 사유",
    value: (
      <div className="space-y-4 text-sm">
        <div>
          <p className="font-semibold mb-1">교환 / 반품이 불가한 경우</p>
          <ul className="list-none leading-10 text-xs ">
            <li>고객님의 부주의로 제품의 가치가 훼손된 경우</li>
            <li>제품의 택(TAG)이 제거되거나 훼손된 경우</li>
            <li>
              제품 손상 및 사용감이 있을 경우 (세탁, 수선, 오염, 향수냄새 등)
            </li>
            <li>제품 수령 후 7일을 초과한 경우</li>
            <li>사은품을 동봉하지 않은 경우</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-1">교환 / 반품 안내</p>
          <p className="text-xs leading-10">
            반품 조건에 해당하는 경우에만 수령 후 7일 이내 고객센터나 쇼핑몰로
            접수해 주세요.
            <br />
            제품을 받았던 상태 그대로 재포장하여 보내주셔야 합니다.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">교환 / 반품 택배 안내</p>
          <ul className="list-none leading-10 text-xs">
            <li>단순 변심: 왕복 택배비 6,000원 (모니터 색상차이 포함)</li>
            <li>불량/오배송: 당사 부담 (동일 옵션으로만 교환 가능)</li>
            <li>초기 무료배송 상품 반품 시 총 6,000원 발생</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-1">택배비 입금 안내</p>
          <ul className="list-none leading-10 text-xs">
            <li>택배는 CJ대한통운을 이용해주세요</li>
            <li>타 택배 이용 시 반드시 선불 + 아래 계좌로 입금</li>
            <li>
              입금 계좌:{" "}
              <strong>기업은행 061-105081-04-013 (심바컴퍼니)</strong>
            </li>
            <li>주문자 성함으로 입금해주세요</li>
            <li>택배비 동봉 시 분실 책임은 당사가 지지 않습니다</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-1">고객센터</p>
          <ul className="list-none leading-10 text-xs">
            <li>반품 및 배송 문의: 070-8094-0603</li>
            <li>운영 시간: 월~금 10:00~17:00 / 점심시간 13:00~14:00</li>
            <li>주말 및 공휴일 휴무</li>
          </ul>
        </div>
      </div>
    ),
  },
];
