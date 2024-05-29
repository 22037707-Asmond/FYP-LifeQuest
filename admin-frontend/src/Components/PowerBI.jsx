import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'

const PowerBi = () => {
    return (
        <>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                    id: '1c73dc5d-b679-4ef5-ad9e-3a16373e4b28',
                    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=1c73dc5d-b679-4ef5-ad9e-3a16373e4b28&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1DLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjY4OGIwZDAtNzlmMC00MGE0LTg2NDQtMzVmY2RlZTlkMGYzLyIsImlhdCI6MTcxNjk2MzcxNCwibmJmIjoxNzE2OTYzNzE0LCJleHAiOjE3MTY5NjgyNjEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFqcVB2NkJWYjZQaUFTY0F1NXNrTFVrSmZtQ1h2S095VHpwVVdKbjJRWTZyYllIeWhheGJxZkZGVkorQnBoMyt3IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUlAiLCJnaXZlbl9uYW1lIjoiQUJEVUwgQVpJWiBTWUFISVIgQklOIEFCRFVMIEhBTEVFTSIsImlwYWRkciI6IjIwMy4xMjcuNDcuNDgiLCJuYW1lIjoiQUJEVUwgQVpJWiBTWUFISVIgQklOIEFCRFVMIEhBTEVFTSIsIm9pZCI6Ijg4MGEzNjgzLWUwOTUtNDQ4My05M2U3LWJjYTAyYTdkMTI2OCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS04Mzk1MjIxMTUtMTgwMTY3NDUzMS03MjUzNDU1NDMtNTUzNTgwIiwicHVpZCI6IjEwMDMyMDAxREI5NDgyNTQiLCJyaCI6IjAuQVQwQTBMQ0k5dkI1cEVDR1JEWDgzdW5ROHdrQUFBQUFBQUFBd0FBQUFBQUFBQUE5QUE4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayIsImttc2kiXSwic3ViIjoiZThrVlBOSEttV21wN3pQNTg5NWhRUWdPTEdubHB2OG1ZUElKbGUwNXZmayIsInRpZCI6ImY2ODhiMGQwLTc5ZjAtNDBhNC04NjQ0LTM1ZmNkZWU5ZDBmMyIsInVuaXF1ZV9uYW1lIjoiMjIwMTY0NDNAbXlycC5lZHUuc2ciLCJ1cG4iOiIyMjAxNjQ0M0BteXJwLmVkdS5zZyIsInV0aSI6IkNPa1QzQXU2OTBHbXdHRUtaX0VYQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.LznKW96NBDBc5m7qphALGgaoa7ETWB5xUTiJTBRs0EfifiFsJFdzwIi0b30TGnsNTLQTUNGSgSCABBoFCbFFtz47zmdK1afyYNK4atYwI7Kc-odAH0_IozmSVY4f56FDOQesxo5PGynHq8HXKqLpeqEZJ_WtJXHdXUAlDSCEUwY_tAMLtiARKXKW4E5alP3iUVqY3UXPzwoX65NQEyGMJZLBy1Z7h_ILHYlsexfkuQacMfhxA9tE2LNIpQc32pc_-ZCe8df4BpiAnxYNOLMvSup4prwqqzn7tnJcox0FVx21dWAic2qwttSmjDMgsrKKti1e7oEETyQzSSNmNRY07A',
                    tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
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
        </>
    );
};

export default PowerBi;
