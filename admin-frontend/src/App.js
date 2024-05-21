import './App.css';
import SignIn from './pages/SignIn';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function App() {
  return (
    <>
      <SignIn />
      <div className="App">
        <header className="App-header">
          <PowerBIEmbed
            embedConfig={{
              type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: '<Report Id>',
              embedUrl: '<Embed Url>',
              accessToken: '<Access Token>',
              tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false
                  }
                },
                background: models.BackgroundType.Transparent,
              }
            }}

            eventHandlers={
              new Map([
                ['loaded', function () { console.log('Report loaded'); }],
                ['rendered', function () { console.log('Report rendered'); }],
                ['error', function (event) { console.log(event.detail); }],
                ['visualClicked', () => console.log('visual clicked')],
                ['pageChanged', (event) => console.log(event)],
              ])
            }

            cssClassName={"reportClass"}

            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </header>
      </div>  
    </>

  );
}

export default App;
