import Typography from '@/components/Typography';

import Article from './Article';

const Content = () => {
  return (
    <div
      id='cv-content'
      className='mx-0 w-full gap-4 overflow-y-auto rounded bg-slate-800 px-4 pt-2 md:px-4'
    >
      <section className='mb-2 flex flex-col'>
        <Typography variant='h3'>Profile</Typography>
        <Typography>
          擁有五年網頁開發經驗，專長於 React
          生態系的系統開發、重構，具備打造卓越產品的自信；在團隊中承上啟下擔任溝通的橋樑，能夠有效協調團隊的需求；積極學習新技術，並於團隊合作中提出觀點，致力於提升自己或是團隊的工作效率。
        </Typography>
      </section>
      <section className='mb-4'>
        <Typography variant='h3'>Employment History</Typography>
        <Article
          title='Noodoe 拓連科技 - 資深前端工程師'
          date='Oct 2022 ~ Jun 2024'
          items={[
            '擔任資深前端工程師，進行產品開發迭代，亦負責 code review 確保程式碼品質。',
            '獨立與各職能: designer, PM, backend, QA 銜接，確保功能需求與時程符合預期。',
            '實作 charger load management 功能，提供動態調整充電量分配介面，協助客戶降低營運成本。',
            '實作 log management 功能，幫助使用者回顧系統操作記錄，減少公司內部營運之成本。',
            '以 TypeScript, react-hook-form, Zod, GraphQL 重構系統功能，透過型別保護，減少不必要的出錯情境。',
            '開發公司自用 UI component library，確保設計一致性。',
            '利用 Jotai 和 custom hook 重整資料流程式碼，提升可維護性。',
            '主動與夥伴們共同討論、制定程式碼風格。',
          ]}
        />
        <Article
          title='HTC DeepQ AI Healthcare - 資深前端工程師'
          date='Oct 2021 ~ Oct 2022'
          items={[
            '擔任資深前端工程師，參與產品釋出，與另外兩名前端工程師互相 code review。',
            '利用 React, Redux Observable 與團隊成員重構公司產品，增進網頁效能，提升程式碼可讀性、可維護性。',
            '分類、重整可複用 React 元件及專案函式庫。',
            '實作 file 上傳檢查功能，幫助使用者加速 AI 訓練資料集整理流程，並運用 Jest 編寫單元測試，確保實作成果。',
            '維護、開發基於 Vue, Vuetify, TypeScript, gRPC 的系統網站，具備快速接手不同 tech stack 的適應能力。',
          ]}
        />
        <Article
          title='資拓宏宇氣象部門 - 軟體工程師'
          date='Apr 2019 ~ Oct 2021'
          items={[
            '擔任全端工程師，與客戶面對面討論需求、獨立設計實時氣象參數資料查詢的互動系統。',
            '使用 Vue 生態系、 Vuetify 作為主要工具，開發、維護多個專案網頁。',
            '配合設計師，以 SCSS BEM 實作具備 RWD 的網站，提供各式裝置也能觀看得宜的介面。',
            '使用 Leaflet 搭配 OpenStreetMap 開發台灣地圖氣象資訊展示功能，為政府單位提供即時監控。',
            '使用 D3.js 繪製各式氣象資訊圖表，提升資料視覺化效果。',
            '除了前端工作，亦使用 Node.js 維護氣象局 Open Data 前台網站，並擴充功能。',
            '導入 Vue I18n 提供網站多國語言功能，友善他國使用者體驗。',
            '調整 webpack 參數，自主導入 Vite, ESlint, Stylelint, Jest，確保程式碼支援度、開發速度和品質。',
            '工作兩年半間，於組內分享超過十篇技術討論，涵蓋語言深度細節、框架的語法糖、最佳實踐、單元測試、瀏覽器渲染、functional programming。',
            '輔以 Python, Django，能操作 Docker，了解 Compose 與 Swarm：與後端工程師的溝通相對快速、有效。',
          ]}
        />
        <Article
          title='治略資訊整合股份有限公司 - 後端實習生'
          date='Jan 2018 ~ Jul 2018'
          items={[
            '利用 Requests, pandas, SQLAlchemy 處理網頁爬蟲、資料處理、 db 備份。',
            '與兩位前端實習生合作，使用 Flask 開發 API，學習 Docker 套用網站部屬。',
          ]}
        />
      </section>
    </div>
  );
};

export default Content;
