import Paragraph from '@/app/cv/components/Paragraph';

import Article from './Article';

const Content = () => {
  return (
    <div
      id='cv-content'
      className='mx-0 w-full overflow-y-auto rounded bg-slate-800 px-4 pt-2 md:px-4'
    >
      <section className='mb-2 flex flex-col'>
        <h1 className='relative flex items-center justify-between text-3xl'>
          Profile
        </h1>
        <Paragraph>
          擁有五年網頁開發經驗，專長於 React
          生態系的系統開發、重構，具備打造卓越產品的自信；在團隊中常做為承上啟下的角色，能夠有效的在開發團隊間溝通；工作之餘經常閱讀技術文章，並於團隊合作中提出觀點，致力於提升自己或是團隊的工作效率。
        </Paragraph>
      </section>

      <section className='mb-4'>
        <h1 className='relative flex items-center justify-between text-3xl'>
          Employment History
        </h1>
        <Article
          title='Noodoe 拓連科技- 資深前端工程師'
          date='Oct 2022 ~ Current'
          paragraph='擔任資深前端工程師，進行產品開發迭代，並與五名前端工程師進行 code review。'
          ulContents={[
            {
              title: '產品迭代',
              content: [
                '實作 charger load management 功能，提供使用者介面以動態調整充電量分配，使客戶能夠配合電價政策達到降低成本之目的。',
                '實作 log management 功能，提供使用者回顧系統操作記錄之功能，減少公司內部營運之成本。',
                '以 TypeScript, react-hook-form, Zod, GraphQL 重構系統功能，透過型別保護，減少不必要的出錯情境。',
                '開發公司自用 UI component library，確保設計一致性。',
                '利用 Jotai 和 custom hook 重整資料流程式碼，提升可維護性。',
              ],
            },
            {
              title: '團隊協作',
              content: [
                '負責團隊 code review。',
                '主動與夥伴們共同討論、制定程式碼風格。',
                '獨立與各職能設計師, PM, 後端工程師和 QA 銜接，確保功能符合需求，時程符合預期。 ',
                '作為面試官，共同參與前端面試。',
              ],
            },
          ]}
        />
        <Article
          title='HTC DeepQ AI Healthcare - 資深前端工程師'
          date='Oct 2021 ~ Oct 2022'
          paragraph='擔任資深前端工程師，參與產品釋出，與另外兩名前端工程師互相 code review。'
          ulContents={[
            {
              title: '產品迭代',
              content: [
                '利用 React, Redux Observable 與團隊成員重構公司產品，增進網頁效能，提升程式碼可讀性、可維護性。',
                '分類、重整可複用 React 元件及專案函式庫。',
                '實作 file 上傳檢查功能，用以幫助使用者快速整理供給給 AI 訓練用的資料集，亦利用 Jest 補上單元測試，確保實作成果。',
                '維護、開發以 Vue, Vuetify, TypeScript, gRPC 為基底的系統網站，具備快速接手不同 tech stack 之能力。',
                '工作之餘，透過開發個人部落格學習 TypeScript',
              ],
            },
          ]}
        />
        <Article
          title='資拓宏宇氣象部門- 軟體工程師'
          date='Apr 2019 ~ Oct 2021'
          paragraph='擔任全端工程師，獨立作業為主，開發能夠提供實時資料查詢、各式不同氣象參數整合的地圖互動網站。'
          ulContents={[
            {
              title: '專案開發',
              content: [
                '與客戶定期開會討論，剖析需求問題可行性，提供解決方案。',
                '使用 Vue 生態系 Vuetify 作為主要工具，開發、維護、重構共計 6 個專案網頁。',
                '配合設計師，以 Scss BEM 實作具備 RWD 的網站，提供各式裝置也能觀看得宜的介面。',
                '使用 Leaflet 搭配 OpenstreetMap 開發用以展示台灣地圖氣象資訊的網頁功能，供給各政府部門單位實時防災監控。',
                '使用 D3.js 繪製各式氣象資訊圖表，給予使用者更佳的資料視覺化體驗。',
                '除了前端工作，亦使用 Node.js 維護氣象局 Open Data 前台網站，並擴充網站新年度功能。',
              ],
            },
            {
              title: '技術導入',
              content: [
                '導入 Vue I18n 提供網站多國語言功能，友善他國使用者不受語言隔閡。',
                '調整 webpack 參數，自主導入 vite, ESlint, Stylelint, Jest，確保程式碼支援度、開發速度、品質。',
              ],
            },
            {
              title: '自主學習',
              content: [
                '自發學習 functional programming ，目的是讓程式碼更簡潔更易讀更優美。',
                '工作兩年半間，於組內分享超過十篇技術討論，涵蓋語言深度細節、框架的語法糖、撰寫的 Best Practice、單元測試、瀏覽器渲染、functional programming。',
                '寫過 Python, Django，能操作 Docker，了解 Compose 與 Swarm：與後端工程師的溝通相對快速、有效。',
              ],
            },
          ]}
        />
        <Article
          title='治略資訊整合股份有限公司 - 後端實習生'
          date='Jan 2018 ~ Jul 2018'
          paragraph='於大四上學期提早修畢學分，後於大四下尋找實習機會，學習職場生活，提早培養工作能力。'
          ulContents={[
            {
              title: '經驗積累',
              content: [
                '利用 Requests, pandas, SQLAlchemy 處理網頁爬蟲、資料處理、 db 備份。',
                '與兩位前端實習生合作，使用 Flask 開發 API，學習 Docker 套用網站部屬。',
                '居家學習 Django，確保不會被框架所局限。',
              ],
            },
          ]}
        />
      </section>
    </div>
  );
};
export default Content;
