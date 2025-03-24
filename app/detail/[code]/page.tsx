interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}
type DetailCodePageProps = {
  params: { code: string };
};
const DetailCodePage = async ({ params }: DetailCodePageProps) => {};

export default DetailCodePage;
