// app/layout.js
import "./globals.css";
import Nav from "@/components/nav";
import Header from "@/components/header";
import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="admin-layout">
          <Nav /> {/* Nav 내부 css에서 width: 240px, position: fixed 설정 필요 */}
          <div className="admin-wrapper">
            <Header />
            <main className="admin-main">
              {children}
            </main>
            <Footer />
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}