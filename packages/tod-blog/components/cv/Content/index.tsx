import Article from '@/components/cv/Article';

const Content = () => {
  return (
    <div
      id='cv-content'
      className='cv-content scrollbar-thin scrollbar-thumb-gray-900 mx-0 w-full overflow-y-auto rounded bg-slate-800 px-4 pt-2 md:px-4'
    >
      <section className='cv-content__section article mb-2 flex flex-col'>
        <h1 className='cv-content__title relative flex items-center justify-between text-3xl'>
          Profile
        </h1>
        <p className='profile__content indent-8 leading-8'>
          三年的網頁開發經驗，目前主要工作以 React
          生態系處理系統重構、重建相關工作，曾利用 Vue 建置包含 I18n
          的地圖互動網站，亦有快速迭代提供專業人員操作的數個小系統經驗。除了基本的開發系統，樂於與團隊成員互助討論問題，能夠與夥伴討論如何優化開發流程並且協助面試新夥伴，工作之餘經常閱讀技術文章，對技術富有熱忱，具備有效解決問題的自信。
        </p>
      </section>

      <section className='cv-content__section article mb-4'>
        <h1 className='cv-content__title relative flex items-center justify-between text-3xl'>
          Employment History
        </h1>
        <Article
          title='HTC DeepQ AI Healthcare - 資深前端工程師'
          date='Oct 2021 ~ Current'
          paragraph='擔任資深前端工程師，參與產品釋出，與另外兩名前端開發人員互相 code review。'
          ulContents={[
            {
              title: '系統重構',
              content: [
                '與團隊成員重構公司產品，增進網頁效能，提升程式碼可讀性、可維護性。',
                '分類、重整可複用 React 元件及專案函式庫。',
                '實作產品新功能，用以幫助使用者能快速清理、整理供給 AI 訓練用資料集，並利用 Jest 替該功能加上單元測試。',
                '維護、開發以 Vue，Vuetify，TypeScript，gRPC 為基底的系統網站。',
                '工作之餘，透過開發個人部落格學習 TypeScript 以及 NextJs。',
              ],
            },
          ]}
        />
        <Article
          title='資拓宏宇氣象部門 - 軟體工程師'
          date='Apr 2019 ~ Oct 2021'
          paragraph='擔任全端工程師，負責氣象局專案業務，解決客戶需求議題、設計網頁架構、實作系統程式、串接即時資料，提供實時資料查詢、各式不同氣象參數整合的地圖互動網站。'
          ulContents={[
            {
              title: '系統開發',
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
                '調整 webpack 參數，自主導入 vite，ESlint，Stylelint，Jest ，確保程式碼支援度、開發速度、品質。',
              ],
            },
            {
              title: '自主學習、協同合作',
              content: [
                '自發學習 functional programming ，目的是讓程式碼更簡潔更易讀更優美。',
                '工作兩年半間，於組內分享超過十篇技術討論，涵蓋語言深度細節、框架的語法糖、撰寫的 Best Practice、單元測試、瀏覽器渲染、functional programming。',
                '寫過 Python，Django，能操作 Docker，了解 Compose 與 Swarm：與後端工程師的溝通相對快速、有效。',
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
                '利用 Requests，pandas，SQLAlchemy 處理網頁爬蟲、資料處理、 db 備份。',
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
