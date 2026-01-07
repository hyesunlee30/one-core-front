# 🚀 ONE-CORE HR System (Frontend)

ONECORE HR 시스템 Frontend 프로젝트입니다. **Next.js 15**와 **React 19**를 기반으로 구축되었습니다.

## 🛠 Tech Stack

* **Framework**: Next.js 15.0.0 (App Router)
* **Library**: React 19 (RC), Axios
* **Styling**: CSS Modules
* **Language**: JavaScript

---

## 📂 Project Structure

사용자 관리에 최적화된 도메인 중심 구조를 채택하고 있습니다.

```text
src/
├── app/
│   └── users/
│       ├── page.js           # 사용자 목록 페이지
│       └── page.module.css   # 페이지 전용 스타일
├── components/
│   └── user/
│       ├── user-add-modal.js # 사원 등록 모달 컴포넌트
│       └── user-add-modal.module.css
└── lib/
    └── api-handler.js        # Axios 기반 API 핸들러

```

---

## ⚙️ Getting Started

### Installation

```bash
npm install
# or
yarn install

```

### Development

```bash
npm run dev

```

### Build & Production

```bash
npm run build
npm run start

```

