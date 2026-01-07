import classes from './page.module.css';

export default function HomePage() {
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>대시보드 메인</h1>
        <p>어드민 페이지의 본문 내용이 여기에 들어갑니다.</p>
        
        {/* 테스트용 카드 섹션 */}
        <section className={classes.testCard}>
          <h2>테스트 섹션</h2>
          <p>MainLayout.module.css에서 설정한 여백 안에 안전하게 배치됩니다.</p>
        </section>
      </div>
    </>
  );
}